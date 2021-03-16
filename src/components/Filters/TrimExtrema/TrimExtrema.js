//
//  TrimExtrema.js
//  porespy-frontend
//


import React from 'react';
import './TrimExtrema.css';

const TrimExtrema = () => {
    return (
        <div>
            <div>
                Trim Extrema
            </div>
            <div>
                Trims local extrema in greyscale values by a specified amount.
            </div>
            <div>
                This essentially decapitates peaks and/or floods valleys.
            </div>
        </div>
    )
}

export default TrimExtrema;
