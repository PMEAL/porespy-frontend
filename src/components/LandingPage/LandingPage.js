import React, { useState, useEffect } from 'react';
import Blobs from '../Generators/Blobs/Blobs';
import './LandingPage.css';

const LandingPage = () => {
    return (
        <div>
            <div className="title">
                PoreSpy
            </div>
            <div className="description">
                (Insert description here)
            </div>
            
            <div className="description">
                (Temporary description): A python library of image analysis tools used to extract information from 3D images of porous materials
            </div>


            <Blobs />
        </div>
    )
}

export default LandingPage;
