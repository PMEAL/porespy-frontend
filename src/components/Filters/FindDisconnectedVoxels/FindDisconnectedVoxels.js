//
//  FindDisconnectedVoxels.js
//  porespy-frontend
//

import React from 'react';
import './FindDisconnectedVoxels.css';

const FindDisconnectedVoxels = () => {
    return (
        <div>
            <div>
                Find Disconnected Voxels
            </div>
            <div>
                This identifies all pore (or solid) voxels that are not connected to
                the edge of the image.  This can be used to find blind pores, or
                remove artifacts such as solid phase voxels that are floating in space.
            </div>
        </div>
    )
}

export default FindDisconnectedVoxels;
