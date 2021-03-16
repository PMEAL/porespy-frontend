//
//  DistanceTransformLin.js
//  porespy-frontend
//

import React from 'react';
import './DistanceTransformLin.css';

const DistanceTransformLin = () => {
    return (
        <div>
            <div>
                Distance Transform Lin
            </div>
            <div>
                Replaces each void voxel with the linear distance to the nearest solid
                voxel along the specified axis.
            </div>
        </div>
    )
}

export default DistanceTransformLin
