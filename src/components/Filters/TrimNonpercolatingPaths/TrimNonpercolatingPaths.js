//
//  LocalThickness.js
//  porespy-frontend
//

import React from 'react';
import './TrimNonpercolatingPaths.css';

const TrimNonpercolatingPaths = () => {
    return (
        <div>
            <div>
                Trim Nonpercolating Paths
            </div>
            <div>
                Removes all nonpercolating paths between specified edges
            </div>
            <div>
                This function is essential when performing transport simulations on an
                image, since image regions that do not span between the desired inlet
                and outlet do not contribute to the transport.
            </div>
        </div>
    )
}

export default TrimNonpercolatingPaths;
