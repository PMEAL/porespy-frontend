//
//  TrimNearbyPeaks.js
//  porespy-frontend
//

import React from 'react';
import './TrimNearbyPeaks.css';

const TrimNearbyPeaks = () => {
    return (
        <div>
            <div>
                Trim Nearby Peaks
            </div>
            <div>
                Finds pairs of peaks that are nearer to each other than to the solid
                phase, and removes the peak that is closer to the solid.
            </div>
        </div>
    )
}

export default TrimNearbyPeaks;
