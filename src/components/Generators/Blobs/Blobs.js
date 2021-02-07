//
//  Blob.js
//  porespy-frontend
//

import React, { useState, useEffect, createRef } from 'react';
import { connect, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import moment from 'moment';
import Dropzone from 'react-dropzone';
import { integerOnlyField, floatOnlyBetweenOneAndZeroField } from '../../../utils/inputFieldValidators';
import './Blobs.css';
import { BluetoothDisabled } from '@material-ui/icons';

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
    //     }
    // };

    const backendEndpoint = useSelector((state) => state.backend);
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
    const [blob, setBlob] = useState('');
    const [loading, setLoading] = useState(false);
    const [loadedBlob, setLoadedBlob] = useState();
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        console.log("loadedFile is:");
        // check somehow if loadedBlob is undefined, then continue on.
        console.log(loadedBlob);
    }, [loadedBlob])

    const dropzoneRef = createRef();
    const loadBlob = () => {
        if (dropzoneRef.current) {
            dropzoneRef.current.open();
        }
    }

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
                setBlob("");
                setLoading(false);
                setError(true);
                setErrorMessage(`Something is wrong... ${e.message}`);
            });
        }, 1000);
    }

    const downloadBlob = () => {
        if (blob === "") {
            setError(true);
            setErrorMessage("You need to generate a Blob before downloading it!");
            return;
        }

        // find a way to abstract this part of the function so that 
        // it is reusable for other components

        const byteCharacters = atob(blob);
        const byteNumbers = new Array(byteCharacters.length);
        const currentTime = moment().format("Y-MM-DD_HH-mm-ss");

        for (let i=0; i < blob.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        const url = window.URL.createObjectURL(new Blob([byteArray, { type: 'image/tif' }]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `myBlob_${currentTime}.tif`);
        document.body.appendChild(link);
        link.click();
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
            <div className="blobTitle">
                Blobs
            </div>
            <div className="blobDescription">
                Generates an image containing amorphous blobs.
            </div>

            <div className="blobTextFields">
                {
                    // Dynamically creates <TextFields /> based on entries in the params object.
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
                        {({getRootProps, getInputProps, acceptedFiles}) => {
                            const selectedFile = acceptedFiles.slice(-1)[0];
                            if (selectedFile) {
                                setLoadedBlob(selectedFile);
                            }

                            return (
                            <div className="container">
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
                            </div>
                            );
                        }}
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
                <div className="blobButton">
                    <Button 
                        variant="contained" 
                        color="primary"
                        onClick={() => downloadBlob()}
                        disabled={validatedParams}
                        style={{ minWidth: '170px', minHeight: '16px'}}
                    >
                        Download Image
                    </Button>
                </div>
            </div>

            {
                // Conditional rendering:
                // If blob is not an empty string, the blob has been generated and will be displayed in the <img /> tag.
                // If blob is an empty string, check whether generateBlob() has been called which will change whether loading is true or false.
                // If loading, display the spinner to the user. If not and there is an error, display error message to the user.
                // Upon loading, nothing will appear in this <div></div> as no conditions are satisfied.
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
                    ?
                    <div className="spinner">
                        <div>
                            <CircularProgress />
                        </div>
                        <div>
                            Generating your image...
                        </div>
                    </div>
                    :
                    <div>
                        {
                            error 
                            && 
                            <div className="blobImageWrapper">
                                {errorMessage}
                            </div>
                        }
                    </div>
                )                              
            }
        </div>
    )
}

export default connect(undefined, undefined)(Blobs);
