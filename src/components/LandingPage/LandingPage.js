import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import './LandingPage.css';

const LandingPage = () => {
    const [pythonResponse, setPythonResponse] = useState({});
    const [generator, setGenerator] = useState('');

    useEffect(() => {
        // run function onload
    }, []);

    const testBackend = () => {
        axios.put('http://localhost:8000/porespytutorial/9/', {
                porosity: 0.96,
                blobiness: 2,
                dimension_x: 800,
                dimension_y: 800
            }
        )
        .then(({ data }) => {
            const generatorImage = data.generated_image;
            setGenerator(generatorImage);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    return (
        <div>
            <div className="title">
                PoreSpy
            </div>
            <div className="description">
                (Insert description here)
            </div>
            
            <Button variant="contained" color="primary" onClick={() => testBackend()}>
                Tutorial test
            </Button>
            
            {generator !== '' && <img src={`data:image/png;base64,${generator}`} style={{ width: 200, height: 200 }} />}

        </div>
    )
}

export default LandingPage;
