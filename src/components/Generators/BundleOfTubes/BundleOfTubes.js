//
//  BundleOfTubes.js
//  porespy-frontend
//

import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { integerOnlyField, floatOnlyBetweenOneAndZeroField } from '../../../utils/inputFieldValidators';
import './BundleOfTubes.css';

const BundleOfTubes = () => {    
    
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
        }, "spacing": {
            helperText: "Integer values only.",
            id: "spacingInput",
            label: "Spacing",
            value: "1",
            type: "int",
            required: true
        }
    };

    // pieces of state to disregard
    const [xDimension, setXDimension] = useState();
    const [yDimension, setYDimension] = useState();
    const [zDimension, setZDimension] = useState();
    const [spacing, setSpacing] = useState();



    // pieces of state to actually use:
    const [params, setParams] = useState(fieldsInfo);
    const [validatedParams, setValidatedParams] = useState(false);
    const [bundleOfTubes, setBundleOfTubes] = useState('');
    const [bundlesOfTubesGenerationTime, setBundlesOfTubesGenerationTime] = useState('');

    const backendRootEndpoint = 'http://localhost:8000/';

    const generateBundleOfTubes = () => {
        console.log("hello from generateBundleOfTubes()");

        // axios.put(`${backendRootEndpoint}generators/bundleOfTubes/1/`, {
        //     // populate data entered here:
        // }).then((response) => {
        //     console.log(response);
        // }).catch((e) => {
        //     // TODO: better error catching method?
        //     console.log(e);
        // })

    }

    const validateParams = () => {
        const bundleOfTubesParameters = [xDimension, yDimension, zDimension, spacing];
        return bundleOfTubesParameters.includes("");
    }


    return (
        <div>
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
                                // onInput={(e) => parseEnteredValues(e, p)}
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
                    disabled={validateParams()}
                >
                    Generate Image
                </Button>
            </div>

            {
                //
            }
        </div>
    )
}

export default BundleOfTubes;
