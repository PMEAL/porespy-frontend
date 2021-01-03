import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import './Blobs.css';

const Blobs = () => {
    const [xDimension, setXDimension] = useState(500);
    const [yDimension, setYDimension] = useState(500);
    const [porosity, setPorosity] = useState(0.5);
    const [blobiness, setBlobiness] = useState(1);
    const [generator, setGenerator] = useState('');
    const [generatorTime, setGeneratorTime] = useState('');

    const generateBlob = () => {
        const startTime = moment();

        axios.put('http://localhost:8000/porespygenerator/1/', {
                porosity,
                blobiness,
                dimension_x: xDimension,
                dimension_y: yDimension
            }
        ).then(({ data: { generated_image } }) => {
            setGenerator(generated_image);
            const timeElapsed = ((moment() - startTime) / 1000).toString();
            const timeElapsedFormatted = `Time taken to generate blob: ${timeElapsed} seconds.`;
            setGeneratorTime(timeElapsedFormatted);
        }).catch((e) => {
            console.log(e);
            setGeneratorTime("Looks like an error has occurred...");
        });
    }

    const validateParams = () => {
        const blobParameters = [xDimension, yDimension, porosity, blobiness];
        return blobParameters.includes("") ? true : false;
    }

    const integerOnlyField = (e) => {
        const regExp = /[^0-9]/g;
        const integersOnly = e.target.value.replace(regExp, '');
        e.target.value = integersOnly;
        return integersOnly;
    }

    const floatOnlyField = (e) => {
        const regExpFullDecimal = /^(?:[0](?:\.\d+)?|1(?:\.0+)?)$/g;
        const regExpZeroOrOne = /^[0]\.$/g;
        const regExpDefault = /[^0-1]/g;

        let floatsOnly = "";
        if (regExpFullDecimal.test(e.target.value) || regExpZeroOrOne.test(e.target.value)) {
            floatsOnly = e.target.value;
        } else if (regExpDefault.test(e.target.value)) {
            floatsOnly = e.target.value.slice(0, -1);
        }

        e.target.value = floatsOnly;
        return floatsOnly;
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
                            const onlyFloats = floatOnlyField(e);
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
                generator !== '' 
                &&
                <div className="blobImageWrapper">
                    <img 
                        className="blobImage" 
                        src={`data:image/png;base64,${generator}`} 
                    />
                    <div>{generatorTime}</div>
                </div> 
            }
        </div>
    )
}

export default Blobs;
