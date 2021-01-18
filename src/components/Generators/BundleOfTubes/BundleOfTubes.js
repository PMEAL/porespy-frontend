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
    const [xDimension, setXDimension] = useState();
    const [yDimension, setYDimension] = useState();
    const [zDimension, setZDimension] = useState();
    const [spacing, setSpacing] = useState();

    const generateBlob = () => {
        console.log("hello from generateBlob()")
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
                <div className="bundleOfTubesTextField">
                    <TextField 
                        required
                        id="xDimensionInput"
                        label="Voxels in x-direction"
                        defaultValue="500"
                        helperText="Integer values only"
                        variant="outlined"
                        onInput={(e) => {
                            const integersOnly = integerOnlyField(e);
                            setXDimension(integersOnly);
                        }}
                    />
                </div>
                <div className="bundleOfTubesTextField">
                    <TextField 
                        required
                        id="yDimensionInput"
                        label="Voxels in y-direction"
                        defaultValue="500"
                        helperText="Integer values only"
                        variant="outlined"
                        onInput={(e) => {
                            const integersOnly = integerOnlyField(e);
                            setYDimension(integersOnly);
                        }}
                    />
                </div>
                <div className="bundleOfTubesTextField">
                    <TextField 
                        required
                        id="zDimensionInput"
                        label="Voxels in z-direction"
                        defaultValue="500"
                        helperText="Integer values only"
                        variant="outlined"
                        onInput={(e) => {
                            const integersOnly = integerOnlyField(e);
                            setZDimension(integersOnly);
                        }}
                    />
                </div>
                <div className="bundleOfTubesTextField">
                    <TextField 
                        required
                        id="spacingInput"
                        label="Spacing"
                        defaultValue=""
                        helperText="Integer values only."
                        variant="outlined"
                        onInput={(e) => {
                            const integersOnly = integerOnlyField(e);
                            setSpacing(integersOnly);
                        }}
                    />
                </div>
            </div>

            <div className="bundleOfTubesButton">
                <Button 
                    variant="contained" 
                    color="primary"
                    // onClick={() => generateBlob()} 
                    disabled={validateParams()}
                >
                    Generate Image
                </Button>
            </div>
        </div>
    )
}

export default BundleOfTubes;
