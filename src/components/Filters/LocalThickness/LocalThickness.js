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
    const availableImages = useSelector((state) => state.generatedImages);
    const chosenImage = chosenImageIndex !== "" ? availableImages[chosenImageIndex] : { img: "" };

    const [filteredImage, setFilteredImage] = useState("");

    // console.log(chosenImage);

    const applyLocalThickness = () => {
        const imgArrayJSON = JSON.stringify(chosenImage["img_array"]);
        axios.put(`${backendEndpoint}filters/localthickness/1/`, {
            generator_image: imgArrayJSON
        }).then(({ data: { local_thickness_image_filtered } }) => {
            console.log(local_thickness_image_filtered);
            setFilteredImage(local_thickness_image_filtered);
            // setFilteredImage(generator_image_filtered["base64"]);
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
                    chosenImage["img"] !== "" && chosenImage !== undefined
                    &&
                    <img
                        className="selectedImage"
                        src={`data:image/png;base64,${chosenImage["img"]}`}
                        alt={chosenImage["img"]}
                    />
                }
            </div>

            <div>
                <Button
                    variant="contained" 
                    color="primary"
                    onClick={() => applyLocalThickness()}
                    disabled={chosenImage["img"] === ""}
                    style={{ minWidth: '170px', minHeight: '16px'}}
                >
                    Apply Filter
                </Button>
            </div>



            <div>
                Filtered image:
            </div>
            {
                filteredImage !== ""
                ?
                <div>
                    <img 
                        // className=""
                        src={`data:image/png;base64,${filteredImage}`}
                        alt={filteredImage}
                    />
                </div>
                :
                <div>
                    NO Filtered image
                </div>
            }


        </div>
    )
}

export default connect(undefined, undefined)(LocalThickness);
