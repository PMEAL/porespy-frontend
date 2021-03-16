//
//  SnowPartitioning.js
//  porespy-frontend
//

import React from 'react';
import './SnowPartitioning.css';

const SnowPartitioning = () => {
    return (
        <div>
            <div>
                Snow Partitioning
            </div>
            <div>
                Partitions the void space into pore regions using a marker-based
                watershed algorithm, with specially filtered peaks as markers.
            </div>
            <div>
                The SNOW network extraction algorithm (Sub-Network of an
                Over-segmented Watershed) was designed to handle to perculiarities of
                high porosity materials, but it applies well to other materials as
                well.
            </div>
        </div>
    )
}

export default SnowPartitioning;
