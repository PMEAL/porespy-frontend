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

// If one were to do SoC on generators components, following values will be passed into props:
// api endpoint
// Textfields and other UI components

const Blobs = () => {
    const [xDimension, setXDimension] = useState(500);
    const [yDimension, setYDimension] = useState(500);
    const [porosity, setPorosity] = useState(0.5);
    const [blobiness, setBlobiness] = useState(1);
    const [blob, setBlob] = useState('');
    const [blobGenerationTime, setBlobGenerationTime] = useState('');

    // backendRootEndpoint should be part of store in Redux (globalized state between components)
    const backendRootEndpoint = 'http://localhost:8000/';

    const generateBlob = () => {
        const startTime = moment();

        axios.put(`${backendRootEndpoint}generators/blobs/1/`, {
                porosity,
                blobiness,
                dimension_x: xDimension,
                dimension_y: yDimension
            }
        ).then(({ data: { generated_image } }) => {
            setBlob(generated_image);
            const timeElapsed = ((moment() - startTime) / 1000).toString();
            const timeElapsedFormatted = `Time taken to generate blob: ${timeElapsed} seconds.`;
            setBlobGenerationTime(timeElapsedFormatted);
        }).catch((e) => {
            console.log(e);
            setBlobGenerationTime("Looks like an error has occurred...");
        });
    }

    const validateParams = () => {
        const blobParameters = [xDimension, yDimension, porosity, blobiness];
        return blobParameters.includes("") ? true : false;
    }

    return (
        <div>
            <div className="blobButton">
                <Button 
                    variant="contained" 
                    color="primary"
                    onClick={() => generateBlob()} 
                    disabled={validateParams()}
                >
                    Generate Image
                </Button>
            </div>

            <div className="blobTextFields">
                <div className="blobTextField">
                    <TextField
                        required
                        id="xDimensionInput"
                        label="Voxels in x-direction"
                        defaultValue="500"
                        helperText="Integer values only"
                        variant="outlined"
                        onInput={(e) => {
                            const onlyIntegers = integerOnlyField(e);
                            setXDimension(onlyIntegers);
                        }}
                    />
                </div>
                <div className="blobTextField">
                    <TextField
                        required
                        id="yDimensionInput"
                        label="Voxels in y-direction"
                        defaultValue="500"
                        helperText="Integer values only"
                        variant="outlined"
                        onInput={(e) => {
                            const onlyIntegers = integerOnlyField(e);
                            setYDimension(onlyIntegers);
                        }}
                    />
                </div>
                <div className="blobTextField">
                    <TextField
                        required
                        id="porosityInput"
                        label="Porosity"
                        defaultValue="0.5"
                        helperText="Decimal value betweeen 0 and 1."
                        variant="outlined"
                        onInput={(e) => {
                            const onlyFloats = floatOnlyBetweenOneAndZeroField(e);
                            setPorosity(onlyFloats);
                        }}
                    />
                </div>
                <div className="blobTextField">
                    <TextField
                        required
                        id="blobinessInput"
                        label="Blobiness"
                        defaultValue="1"
                        helperText="Integer values only"
                        variant="outlined"
                        onInput={(e) => {
                            const onlyIntegers = integerOnlyField(e);
                            setBlobiness(onlyIntegers);
                        }}
                    />
                </div>
            </div>

            {
                blob !== '' 
                &&
                <div className="blobImageWrapper">
                    <img 
                        className="blobImage" 
                        src={`data:image/png;base64,${blob}`} 
                    />
                    <div>{blobGenerationTime}</div>
                </div> 
            }
        </div>
    )
}

export default Blobs;
