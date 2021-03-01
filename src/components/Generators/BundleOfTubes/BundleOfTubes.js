//
//  BundleOfTubes.js
//  porespy-frontend
//

import React, { useState, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import { integerOnlyField, floatOnlyBetweenOneAndZeroField, validateParams } from '../../../utils/fieldValidators';
import { startSetImages } from '../../../actions/Generators/GeneratedImages';
import './BundleOfTubes.css';

let genImagesRedux = {};

const BundleOfTubes = (props) => {    
    const backendEndpoint = useSelector((state) => state.backend);
    const funcs = useSelector((state) => (state));
    const fieldsInfo = funcs.porespyFuncs.hasOwnProperty('generators') ? funcs.porespyFuncs.generators.bundle_of_tubes : {};
    
    if (fieldsInfo.hasOwnProperty('kwargs')) {
        // remove kwargs from this function. As a result, no kwargs entry in the component will be generated.
        delete fieldsInfo['kwargs'];
    }

    for (const entry in fieldsInfo) {
        if (fieldsInfo[entry].type === "int") {
            fieldsInfo[entry]["helperText"] = "Integer Values only";
        } else if (fieldsInfo[entry].type === "float") {
            fieldsInfo[entry]["helperText"] = "Float value between 0 and 1";
        }

        fieldsInfo[entry]["id"] = entry + "input";

        switch (entry) {
            case "shape[0]":
                fieldsInfo[entry]["label"] = "Voxels in x Dimension";
                break;
            case "shape[1]":
                fieldsInfo[entry]["label"] = "Voxels in y Dimension";
                break;
            case "shape[2]":
                fieldsInfo[entry]["label"] = "Voxels in z Dimension";
                break;
            case "spacing":
                fieldsInfo[entry]["label"] = "Spacing";
                // NOTE: In Porespy documentation, there is no mention that the spacing parameter must be specified. In the code it is required as it is used in calculations.
                fieldsInfo[entry]["required"] = true
                break;
            default:
                break;
        }
    }

    const [params, setParams] = useState(fieldsInfo);
    const [validatedParams, setValidatedParams] = useState(true);
    const [bundleOfTubes, setBundleOfTubes] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const generateBundleOfTubes = () => {
        setLoading(true);
        setBundleOfTubes("");
        setTimeout(() => {
            axios.put(`${backendEndpoint}generators/bundleoftubes/1/`, {
                dimension_x: params["shape[0]"].value,
                dimension_y: params["shape[1]"].value,
                dimension_z: params["shape[2]"].value !== "" ? params["shape[2]"].value : 0,
                spacing: parseInt(params["spacing"].value, 10)
            }).then(({ data: { generated_image } }) => {
                setBundleOfTubes(generated_image);
                genImagesRedux = {
                    img: generated_image,
                    genType: "Bundle_of_Tubes"
                }
                // props.startSetImages(generated_image);
                props.startSetImages(genImagesRedux);
                setLoading(false);
            }).catch((e) => {
                setBundleOfTubes("");
                setLoading(false);
                setError(true);
                setErrorMessage(`Something is wrong... ${e.message}`);
            })
        }, 1000);
    }

    const parseEnteredValues = (e, property) => {
        const tempParams = params;

        switch (tempParams[property].type) {
            case "int":

                // TODO: to integerOnlyField(), maybe add min/max parameters?

                tempParams[property].value = integerOnlyField(e);
                break;
            case "float":
                tempParams[property].value =  floatOnlyBetweenOneAndZeroField(e);
                break;
            default:
                break;
        }

        // TODO: maybe split this function to make it more scalable? ^^^
        setParams(tempParams);
        setValidatedParams(validateParams(params));
    }

    return (
        <div>
            <div className="bundleOfTubesTitle">
                Bundle of Tubes
            </div>
            <div className="bundleOfTubesDescription">
                Creates a 3D image of a bundle of tubes, in the form of a rectangular plate with randomly sized holes through it.
            </div>

            <div className="bundleOfTubesTextFields">
                {
                    // Dynamically creates <TextFields /> based on entries in the params object
                    Object.keys(params).map((p) => (
                        <div className="bundleOfTubesTextField">
                            <TextField 
                                required={params[p].required}
                                id={params[p].id}
                                label={params[p].label}
                                defaultValue={params[p].value}
                                helperText={params[p].helperText}
                                variant={"outlined"}
                                onInput={(e) => parseEnteredValues(e, p)}
                            />
                        </div>                        
                    ))
                }
            </div>
            <div className="bundleOfTubesButton">
                <Button 
                    variant="contained" 
                    color="primary"
                    onClick={() => generateBundleOfTubes()}
                    disabled={validatedParams}
                    style={{ minWidth: '170px', minHeight: '16px'}}
                >
                    Generate Image
                </Button>
            </div>

            {
                // TODO: maybe abstract this? This is similar in Blobs.js component

                bundleOfTubes !== ""
                ?
                <div className="bundleOfTubesImageWrapper">
                    <img
                        className="bundleOfTubesImage"
                        src={`data:image/png;base64,${bundleOfTubes}`}
                    />
                </div>
                :
                (
                    loading
                    ?
                    <div className="spinner">
                        <CircularProgress />
                        <div>
                            Generating your image...
                        </div>
                    </div>
                    :
                    <div>
                        {
                            error
                            &&
                            <div className="bundleOfTubesImageWrapper">
                                {errorMessage}
                            </div>
                        }
                    </div>
                )
            }
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    startSetImages: () => dispatch(startSetImages(genImagesRedux))
})

export default connect(undefined, mapDispatchToProps)(BundleOfTubes);
