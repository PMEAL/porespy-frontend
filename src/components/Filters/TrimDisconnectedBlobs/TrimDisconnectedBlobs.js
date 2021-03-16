//
//  TrimDisconnectedBlobs.js
//  porespy-frontend
//

import React from 'react';
import './TrimDisconnectedBlobs.css';

const TrimDisconnectedBlobs = () => {
    return (
        <div>
            <div>
                Trim Disconnected Blobs
            </div>
            <div>
                Removes foreground voxels not connected to specified inlets.
            </div>
        </div>
    )
}

export default TrimDisconnectedBlobs;
