//
//  Blob.js
//  porespy-frontend
//

import React, { useState, createRef, useCallback, useRef } from 'react';
import { connect, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import Dropzone, { useDropzone } from 'react-dropzone';
import RenderImage from '../../RenderImage/RenderImage';
import { integerOnlyField, floatOnlyBetweenOneAndZeroField, validateParams } from '../../../utils/fieldValidators';
import { startSetImages } from '../../../actions/Generators/GeneratedImages';
import './Blobs.css';

let genImagesRedux = {};

const Blobs = (props) => {
    // Variables that pull variables from the Redux store, like backendEndpoint and the input fields for the chosen porespy function
    const backendEndpoint = useSelector((state) => state.backend);
    const funcs = useSelector((state) => (state));
    const fieldsInfo = funcs.porespyFuncs.hasOwnProperty('generators') ? funcs.porespyFuncs.generators.blobs : {};

    // Filter out if the function requires "kwargs", and implement them manually.
    // This was done since javascript doesn't understand kwargs like Python.
    // But if someone in the future finds a better way of doing this, feel free to implement it.
    if (fieldsInfo.hasOwnProperty('kwargs')) {
        delete fieldsInfo['kwargs'];
    }

    // Set labels, helperText and other necessary props for the <TextField /> Material UI component
    for (const entry in fieldsInfo) {
        if (fieldsInfo[entry].type === "int") {
            fieldsInfo[entry]["helperText"] = "Integer Values only";
        } else if (fieldsInfo[entry].type === "float") {
            fieldsInfo[entry]["helperText"] = "Float value between 0 and 1";
        }

        fieldsInfo[entry]["id"] = entry + "input";

        switch (entry) {
            case "shape[0]":
                fieldsInfo[entry]["label"] = "X Direction Voxels";
                break;
            case "shape[1]":
                fieldsInfo[entry]["label"] = "Y Direction Voxels";
                break;
            case "shape[2]":
                fieldsInfo[entry]["label"] = "Z Direction Voxels";
                break;
            case "blobiness":
                fieldsInfo[entry]["label"] = "Blobiness";
                break;
            case "porosity":
                fieldsInfo[entry]["label"] = "Porosity";
                break;
            default:
                break;
        }
    }

    const [params, setParams] = useState(fieldsInfo);
    const [validatedParams, setValidatedParams] = useState(false);
    const [blob, setBlob] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const imageRef = useRef(null);

    const generateBlob = () => {
        setLoading(true);
        setBlob("");
        // currently image loading is very fast. setTimeout adds 1s of loading to show user that the image is loading.
        setTimeout(() => {
            axios.put(`${backendEndpoint}generators/blobs/1/`, {
                porosity: params["porosity"].value,
                blobiness: params["blobiness"].value,
                dimension_x: params["shape[0]"].value,
                dimension_y: params["shape[1]"].value,
                dimension_z: params["shape[2]"].value === "" ? 0 : params["shape[2]"].value
            }).then(({ data: { generated_image } }) => {
                setBlob(generated_image["base_64"]);
                genImagesRedux = {
                    img: generated_image["base_64"],
                    img_array: generated_image["np_array"],
                    genType: "Blob"
                };
                props.startSetImages(genImagesRedux);
                setLoading(false);
            }).catch((e) => {
                setBlob("");
                setLoading(false);
                setError(true);
                setErrorMessage(`Something is wrong... ${e.message}`);
            }).finally(() => {
                imageRef.current.scrollIntoView();
            });
        }, 500);
    }

    // parse entered values and determine whether the data is valid to be sent to the backend.
    const parseEnteredValues = (e, property) => {
        const tempParams = params;

        switch (tempParams[property].type) {
            case "int":
                tempParams[property].value = integerOnlyField(e);
                break;
            case "float":
                tempParams[property].value = floatOnlyBetweenOneAndZeroField(e);
                break;
            default:
                break;
        }

        setParams(tempParams);
        setValidatedParams(validateParams(params));
    }
    
    // TODO: move this image uploading to the UploadImage component in ../UploadImage
    const dropzoneRef = createRef();    
    const loadBlob = () => {
        if (dropzoneRef.current) {
            dropzoneRef.current.open();
        }
    }

    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.forEach((file) => {
            const reader = new FileReader();
            reader.onabort = () => console.log("File reading was aborted");
            reader.onerror = () => console.log("File reading has failed");
            reader.onload = () => {
                const binaryStr = reader.result;
                console.log(binaryStr);
            }

            reader.readAsArrayBuffer(file);
        })
    }, []);

    const {getRootProps, getInputProps} = useDropzone({onDrop});
    // TODO: move this image uploading to the UploadImage component in ../UploadImage

    return (
        <div>
            <div className="blobTitle">
                Blobs
            </div>
            <div className="blobDescription">
                Generates an image containing amorphous blobs.
            </div>
            <div className="blobTextFields" ref={imageRef}>
                {
                    Object.keys(params).map((p) => (
                        p
                        &&
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
            <div className="blobButtons">
                <div className="blobButton">
                    <Dropzone ref={dropzoneRef} noClick noKeyboard>
                        {() => (
                            <div {...getRootProps({className: 'dropzone'})}>
                                <input {...getInputProps()} />
                                <Button
                                    variant="contained" 
                                    color="primary"
                                    style={{ minWidth: '170px', minHeight: '16px'}}
                                    onClick={() => loadBlob()}
                                >
                                    Load Image
                                </Button>
                            </div>
                            )
                        }
                    </Dropzone>
                </div>
                <div className="blobButton">
                    <Button 
                        variant="contained" 
                        color="primary"
                        onClick={() => generateBlob()}
                        disabled={validatedParams}
                        style={{ minWidth: '170px', minHeight: '16px'}}
                    >
                        Generate Image
                    </Button>
                </div>
            </div>

            <div>
                <RenderImage 
                    imgString={blob}
                    loading={loading}
                    error={error}
                    errorMessage={errorMessage}
                />
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    startSetImages: () => dispatch(startSetImages(genImagesRedux))
})

export default connect(undefined, mapDispatchToProps)(Blobs);
