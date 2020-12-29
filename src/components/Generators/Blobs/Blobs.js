import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import './Blobs.css';

const Blobs = () => {
    const [xDimension, setXDimension] = useState(500);
    const [yDimension, setYDimension] = useState(500);
    const [porosity, setPorosity] = useState(0.5);
    const [blobiness, setBlobiness] = useState(1);
    const [generator, setGenerator] = useState('');
    const [generatorTime, setGeneratorTime] = useState('');

    // TODO: validate porosity entry for a value between 0 and 1
    // TODO: add CSS stylings to this component.






    const generateBlob = () => {
        const startTime = moment();

        axios.put('http://localhost:8000/porespygenerator/1/', {
                porosity,
                blobiness,
                dimension_x: xDimension,
                dimension_y: yDimension
            }
        )
        .then(({ data: { generated_image } }) => {
            setGenerator(generated_image);
            const timeElapsed = ((moment() - startTime) / 1000).toString();
            const timeElapsedFormatted = `Time taken to generate blob: ${timeElapsed} seconds.`;
            setGeneratorTime(timeElapsedFormatted);
        })
        .catch((e) => {
            console.log(e);
            setGeneratorTime("Looks like an error has occurred...");
        });
    }

    const validateParams = () => {
        const blobParameters = [xDimension, yDimension, porosity, blobiness];

        if (blobParameters.includes("")) {
            return true;
        } else {
            return false;
        }
    }

    const integerOnlyField = (e) => {
        const onlyNumbers = e.target.value.replace(/[^0-9]/g, '');
        e.target.value = onlyNumbers;
        return onlyNumbers;
    }

    const floatOnlyField = (e, minValue = null, maxValue = null) => {

    }

    return (
        <div>
            <Button variant="contained" color="primary" onClick={() => generateBlob()} disabled={validateParams()}>
                Generate Image
            </Button>

            <div>
                <TextField
                    required
                    id="xDimensionInput"
                    label="Voxels in x-direction"
                    defaultValue="500"
                    helperText="Integer values only"
                    variant="outlined"
                    onInput={(e) => {
                        const onlyNumbers = integerOnlyField(e);
                        setXDimension(onlyNumbers);
                    }}
                />
                <TextField
                    required
                    id="yDimensionInput"
                    label="Voxels in y-direction"
                    defaultValue="500"
                    helperText="Integer values only"
                    variant="outlined"
                    onInput={(e) => {
                        const onlyNumbers = integerOnlyField(e);
                        setYDimension(onlyNumbers);
                    }}
                />
                <TextField
                    required
                    id="porosityInput"
                    label="Porosity"
                    defaultValue="0.5"
                    helperText="Decimal value betweeen 0 and 1."
                    variant="outlined"
                    onInput={(e) => setPorosity(e.target.value)}
                />
                <TextField
                    required
                    id="blobinessInput"
                    label="Blobiness"
                    defaultValue="1"
                    helperText="Integer values only"
                    variant="outlined"
                    onInput={(e) => {
                        const onlyNumbers = integerOnlyField(e);
                        setBlobiness(onlyNumbers);
                    }}
                />
            </div>
            
            {
                generator !== '' 
                &&
                <div>
                    <div></div>
                    <img 
                        className="tutorialImage" 
                        src={`data:image/png;base64,${generator}`} 
                    />
                    <div>{generatorTime}</div>
                </div> 
            }
        </div>
    )
}

export default Blobs;
