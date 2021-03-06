//
//  LocalThickness.js
//  porespy-frontend
//

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import { connect, useSelector } from 'react-redux';
import './LocalThickness.css';


const LocalThickness = () => {
    const backendEndpoint = useSelector((state) => state.backend);
    const chosenImageIndex = useSelector((state) => (state.imageToBeFiltered));
    const availableimages = useSelector((state) => state.generatedImages);
    const chosenImage = chosenImageIndex !== "" ? availableimages[chosenImageIndex].img : "";

    const applyLocalThickness = () => {
        axios.put(`${backendEndpoint}filters/localthickness/1/`, {
            generator_image: chosenImage
        }).then(({ data: { generator_image_filtered } }) => {
            console.log(generator_image_filtered);
        }).catch((e) => {
            // TODO: proper error handling


            console.log(e);
        })
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
            <div>
                Image chosen to apply filter on:
            </div>
            <div className="selectedImageWrapper">
                {
                    chosenImage !== ""
                    &&
                    <img
                        className="selectedImage"
                        src={`data:image/png;base64,${chosenImage}`}
                        alt={chosenImage}
                    />
                }
            </div>

            <div>
                <Button
                    variant="contained" 
                    color="primary"
                    onClick={() => applyLocalThickness()}
                    disabled={chosenImage === ""}
                    style={{ minWidth: '170px', minHeight: '16px'}}
                >
                    Apply Filter
                </Button>
            </div>

            <div>
                Filtered image:
            </div>
            <div>
            </div>
        </div>
    )
}

export default connect(undefined, undefined)(LocalThickness);
