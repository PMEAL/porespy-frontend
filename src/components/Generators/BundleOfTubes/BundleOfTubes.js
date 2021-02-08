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
import './BundleOfTubes.css';

const BundleOfTubes = () => {    
    const backendEndpoint = useSelector((state) => state.backend);
    const funcs = useSelector((state) => (state));
    const fieldsInfo = funcs.porespyFuncs.hasOwnProperty('generators') ? funcs.porespyFuncs.generators.bundle_of_tubes : {};
    console.log(fieldsInfo);

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
                break;
            default:
                break;
        }
    }

    const [params, setParams] = useState(fieldsInfo);
    const [validatedParams, setValidatedParams] = useState(false);
    const [bundleOfTubes, setBundleOfTubes] = useState('');

    const generateBundleOfTubes = () => {
        console.log("hello from generateBundleOfTubes()");
    }

    const downloadBundleOfTubes = () => {
        console.log("hello from downloadBundleOfTubes()");
    }

    const validateParams = () => {
        const requiredBundleOfTubesParameters = [];

        for (const p in params) {
            if (params[p].required) {
                requiredBundleOfTubesParameters.push(params[p].value);
            }
        }

        return requiredBundleOfTubesParameters.includes("");
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
                    style={{ minWidth: '170px', minHeight: '16px'}}
                >
                    Generate Image
                </Button>
            </div>
        </div>
    )
}

export default BundleOfTubes;
