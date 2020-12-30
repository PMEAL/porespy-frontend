import React, { useState, useEffect } from 'react';
import Blobs from '../Generators/Blobs/Blobs';
import LocalThickness from '../Filters/LocalThickness/LocalThickness';
import './LandingPage.css';

const LandingPage = () => {
    return (
        <div>
            <div className="title">
                PoreSpy
            </div>
            
            <div className="description">
                A python library of image analysis tools used to extract information from 3D images of porous materials
            </div>

            <div>
                <Blobs />
                <br />
                <LocalThickness />
                <br />
            </div>
        </div>
    )
}

export default LandingPage;
