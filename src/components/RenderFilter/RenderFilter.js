//
//  RenderFilter.js
//  porespy-frontend
//

import React from 'react';
import './RenderFilter.css';
import LocalThickness from '../Filters/LocalThickness/LocalThickness';

const RenderFilter = ({ chosenFunction }) => {
    return (
        <div>
            {
                // TODO: create components for remaining filter functions
                chosenFunction === "Local Thickness" && <LocalThickness />
                

                /*
                chosenFunction === "Apply Chords" && <ApplyChords />
                chosenFunction === "Apply Chords 3D" && <ApplyChords3D />
                chosenFunction === "Apply Padded" && <ApplyPadded />
                chosenFunction === "Chunked Func" && <ChunkedFunc />
                chosenFunction === "Distance Transform Lin" && <DistanceTransformLin />
                chosenFunction === "Fftmorphology" && <Fftmorphology />                
                chosenFunction === "Fill Blind Pores" && <FillBlindPores />
                chosenFunction === "Find Disconnected Voxels" && <FindDisconnectedVoxels />
                chosenFunction === "Find Dt Artifacts" && <FindDtArtifacts />
                chosenFunction === "Find Peaks" && <FindPeaks />
                chosenFunction === "Flood" && <Flood />
                chosenFunction === "Hold Peaks" && <HoldPeaks />
                chosenFunction === "Nphase Border" && <NPhaseBorder />
                chosenFunction === "Porosimetry" && <Porosimetry />
                chosenFunction === "Prune Branches" && <PruneBranches />
                chosenFunction === "Reduce Peaks" && <ReducePeaks />
                chosenFunction === "Region Size" && <RegionSize />
                chosenFunction === "Snow Partitioning" && <SnowPartitioning />                
                chosenFunction === "Snow Partitioning N" && <SnowPartitioningN />
                chosenFunction === "Snow Partitioning Parallel" && <SnowPartitioningParallel />
                chosenFunction === "Trim Disconnected Blobs" && <TrimDisconnectedBlobs />
                chosenFunction === "Trim Extrema" && <TrimExtrema />
                chosenFunction === "Trim Floating Solid" && <TrimFloatingSolid />
                chosenFunction === "Trim Nearby Peaks" && <TrimNearbyPeaks />
                chosenFunction === "Trim Nonpercolating Paths" && <TrimNonpercolatingPaths />
                chosenFunction === "Trim Saddle Points" && <trimSaddlePoints />
                chosenFunction === "Trim Small Clusters" && <TrimSmallClusters />
                */
            }
        </div>
    )
}

export default RenderFilter;
