//
//  Blob.js
//  porespy-frontend
//

import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { integerOnlyField, floatOnlyBetweenOneAndZeroField } from '../../../utils/inputFieldValidators';
import './Blobs.css';

const Blobs = () => {
    // Data should be entered like this (Object of objects)
    const fieldsInfo = {
        "xDimension": {
            helperText: "Integer values only.",
            id: "xDimensionInput",
            label: "Voxels in x-direction",
            value: "500",
            type: "int",
            required: true
        }, "yDimension": {
            helperText: "Integer values only.",
            id: "yDimensionInput",
            label: "Voxels in y-direction",
            value: "500",
            type: "int",
            required: true
        }, "zDimension": {
            helperText: "Integer values only.",
            id: "zDimensionInput",
            label: "Voxels in z-direction",
            value: "0",
            type: "int",
            required: false
        }, "porosity": {
            helperText: "Float value between 0 and 1",
            id: "porosityInput",
            label: "Porosity",
            value: "0.5",
            type: "float",
            required: true
        }, "blobiness": {
            helperText: "Integer values only.",
            id: "blobinessInput",
            label: "Blobiness",
            value: "1",
            type: "int",
            required: true
        }
    };

    const [params, setParams] = useState(fieldsInfo);
    const [validatedParams, setValidatedParams] = useState(false);
    const [blob, setBlob] = useState('');

    // backendRootEndpoint should be part of store in Redux (globalized state between components)
    const backendRootEndpoint = 'http://localhost:8000/';

    const generateBlob = () => {
        axios.put(`${backendRootEndpoint}generators/blobs/1/`, {
                porosity: params["porosity"].value,
                blobiness: params["blobiness"].value,
                dimension_x: params["xDimension"].value,
                dimension_y: params["yDimension"].value,
                dimension_z: params["zDimension"].value
            }
        ).then(({ data: { generated_image } }) => {
            setBlob(generated_image);
        }).catch((e) => {
            // TODO: better error catching method?
            console.log(e);
        });
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
                blob !== '' 
                &&
                <div className="blobImageWrapper">
                    <img 
                        className="blobImage" 
                        src={`data:image/png;base64,${blob}`} 
                    />
                </div> 
            }
        </div>
    )
}

export default Blobs;
