//
//  ReducePeaks.js
//  porespy-frontend
//

import React from 'react';
import './ReducePeaks.css';

const ReducePeaks = () => {
    return (
        <div>
            <div>
                Reduce Peaks
            </div>
            <div>
                Any peaks that are broad or elongated are replaced with a single voxel
                that is located at the center of mass of the original voxels.
            </div>
        </div>
    )
}

export default ReducePeaks;
