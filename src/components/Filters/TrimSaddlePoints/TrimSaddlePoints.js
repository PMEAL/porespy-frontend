//
//  TrimSaddlePoints.js
//  porespy-frontend
//

import React from 'react';
import './TrimSaddlePoints.css';

const TrimSaddlePoints = () => {
    return (
        <div>
            <div>
                Trim Saddle Points
            </div>
            <div>
                Removes peaks that were mistakenly identified because they lied on a
                saddle or ridge in the distance transform that was not actually a true
                local peak.
            </div>
        </div>
    )
}

export default TrimSaddlePoints;
