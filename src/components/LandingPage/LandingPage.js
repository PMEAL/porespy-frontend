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
            <Blobs />
        </div>
    )
}

export default LandingPage;
