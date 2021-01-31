//
//  Blob.js
//  porespy-frontend
//

import React, { useState, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import { integerOnlyField, floatOnlyBetweenOneAndZeroField } from '../../../utils/inputFieldValidators';
import './Blobs.css';

const Blobs = () => {
    // Data should be entered like this (Object of objects)
    // const fieldsInfo = {
    //     "xDimension": {
    //         helperText: "Integer values only.",
    //         id: "xDimensionInput",
    //         label: "Voxels in x-direction",

    //         default: "500",
    //         type: "int",
    //         required: true
    //     }, "yDimension": {
    //         helperText: "Integer values only.",
    //         id: "yDimensionInput",
    //         label: "Voxels in y-direction",
    //         default: "500",
    //         type: "int",
    //         required: true
    //     }, "zDimension": {
    //         helperText: "Integer values only.",
    //         id: "zDimensionInput",
    //         label: "Voxels in z-direction",
    //         default: "0",
    //         type: "int",
    //         required: false
    //     }, "porosity": {
    //         helperText: "Float value between 0 and 1",
    //         id: "porosityInput",
    //         label: "Porosity",
    //         default: "0.5",
    //         type: "float",
    //         required: true
    //     }, "blobiness": {
    //         helperText: "Integer values only.",
    //         id: "blobinessInput",
    //         label: "Blobiness",
    //         default: "1",
    //         type: "int",
    //         required: true
    //     }
    // };

    const funcs = useSelector((state) => (state));
    const fieldsInfo = funcs.porespyFuncs.hasOwnProperty('generators') ? funcs.porespyFuncs.generators.blobs : {};

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

        fieldsInfo[entry].required = fieldsInfo[entry].value === "" ? false : true;
        fieldsInfo[entry]["label"] = entry;
        fieldsInfo[entry]["id"] = entry + "input";
    }

    const [params, setParams] = useState(fieldsInfo);
    const [validatedParams, setValidatedParams] = useState(false);
    const [blob, setBlob] = useState('');
    const [loading, setLoading] = useState(false);

    const backendEndpoint = useSelector((state) => state.backend);

    const generateBlob = () => {
        setLoading(true);
        setBlob("");

        // currently image loading is very quick. setTimeout adds 1 sec of loading to show user that the image is loading.
        setTimeout(() => {
            axios.put(`${backendEndpoint}generators/blobs/1/`, {
                    porosity: params["porosity"].value,
                    blobiness: params["blobiness"].value,
                    dimension_x: params["shape[0]"].value,
                    dimension_y: params["shape[1]"].value,
                    dimension_z: params["shape[2]"].value === "" ? 0 : params["shape[2]"].value
                }
            ).then(({ data: { generated_image } }) => {
                setBlob(generated_image);
                setLoading(false);

            }).catch((e) => {
                // TODO: find a better error catching method?
                console.log(e);
                setLoading(false);
            });
        }, 1000);
    }

    const validateParams = () => {
        const requiredBlobParameters = [];

        for (const p in params) {
            if (params[p].required) {
                requiredBlobParameters.push(params[p].value);
            }
        }

        return requiredBlobParameters.includes("") ? true : false;
    }

    const parseEnteredValues = (e, property) => {
        const tempParams = params;

        switch (tempParams[property].type) {
            case "int":
                tempParams[property].value = integerOnlyField(e);
                break;
            case "float":
                tempParams[property].value =  floatOnlyBetweenOneAndZeroField(e);
                break;
            default:
                break;
        }

        setValidatedParams(validateParams());
        setParams(tempParams);
    }

    return (
        <div>
            <div className="blobDescription">
                Generates an image containing amorphous blobs.
            </div>

            <div className="blobTextFields">
                {
                    // Dynamically creates <TextFields /> based on entries in the params object.
                    Object.keys(params).map((p) => (
                        p &&
                        <div className="blobTextField">
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

            <div className="blobButton">
                <Button 
                    variant="contained" 
                    color="primary"
                    onClick={() => generateBlob()}
                    disabled={validatedParams}
                >
                    Generate Image
                </Button>
            </div>

            {
                blob !== ""
                ?
                <div className="blobImageWrapper">
                    <img 
                        className="blobImage" 
                        src={`data:image/png;base64,${blob}`} 
                    />
                </div>
                :
                (
                    loading
                    && 
                    <div className="spinner">
                        <div>
                            <CircularProgress />
                        </div>
                        <div>
                            Generating your image...
                        </div>
                    </div>  
                )                              
            }
        </div>
    )
}

export default connect(undefined, undefined)(Blobs);
