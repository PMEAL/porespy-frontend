//
//  FindDtArtifacts.js
//  porespy-frontend
//

import React from 'react';
import './FindDtArtifacts.css';

const FindDtArtifacts = () => {
    return (
        <div>
            <div>
                Find Dt Artifacts
            </div>
            <div>
                Finds points in a distance transform that are closer to wall than
                solid.
            </div>
            <div>
                These points could *potentially* be erroneously high since their
                distance values do not reflect the possibility that solid may have
                been present beyond the border of the image but lost by trimming.
            </div>
        </div>
    )
}

export default FindDtArtifacts;
