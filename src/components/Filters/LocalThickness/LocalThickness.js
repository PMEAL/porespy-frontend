//
//  LocalThickness.js
//  porespy-frontend
//

import React, { useState } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import { connect, useSelector } from 'react-redux';
import RenderImage from '../../RenderImage/RenderImage';
import './LocalThickness.css';

const LocalThickness = () => {
    const backendEndpoint = useSelector((state) => state.backend);
    const chosenImageIndex = useSelector((state) => (state.imageToBeFiltered));
    const availableImages = useSelector((state) => state.generatedImages);
    const chosenImage = chosenImageIndex !== "" ? availableImages[chosenImageIndex] : { img: "" };

    const [filteredImage, setFilteredImage] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const applyLocalThickness = () => {
        setLoading(true);
        setFilteredImage("");
        const imgArrayJSON = JSON.stringify(chosenImage["img_array"]);

        setTimeout(() => {
            axios.put(`${backendEndpoint}filters/localthickness/1/`, {
                local_thickness_image: imgArrayJSON
            }).then(({ data: { local_thickness_image_filtered } }) => {
                setFilteredImage(local_thickness_image_filtered["base_64"]);
                setLoading(false);
            }).catch((e) => {
                // TODO: proper error handling?
    
                setFilteredImage("");
                setLoading(false);
                setError(true);
                setErrorMessage(`Something is wrong... ${e.message}`);
                console.log(e);
            });
        }, 500);        
    }


    // TODO: should have a component that tells the user to choose an image by clicking on the sideways arrow.

    return (
        <div>
            <div className="localThicknessTitle">
                Local Thickness
            </div>
            <div className="localThicknessDescription">
                For each voxel, this function calculates the radius of the largest sphere that both engulfs the voxel and fits entirely within the foreground. 
                This is not the same as a simple distance transform, which finds the largest sphere that could be "centered" on each voxel.
            </div>
            <div className="localThicknessMsg">
                Image chosen to apply filter on:
            </div>
            <div className="selectedImageWrapper">
                {
                    chosenImage !== undefined && chosenImage["img"] !== ""
                    &&
                    <img
                        className="selectedImage"
                        src={`data:image/png;base64,${chosenImage["img"]}`}
                        alt={chosenImage["img"]}
                    />
                }
            </div>
            <div className="localThicknessButton">
                <Button
                    variant="contained" 
                    color="primary"
                    onClick={() => applyLocalThickness()}
                    disabled={(chosenImage === undefined || chosenImage["img"] === "")}
                    style={{ minWidth: '170px', minHeight: '16px'}}
                >
                    Apply Filter
                </Button>
            </div>
            <div>
                <div className="localThicknessMsg">
                    Filtered Image:
                </div>
                <RenderImage 
                    imgString={filteredImage}
                    loading={loading}
                    error={error}
                    errorMessage={errorMessage}
                />
            </div>
        </div>
    )
}

export default connect(undefined, undefined)(LocalThickness);
