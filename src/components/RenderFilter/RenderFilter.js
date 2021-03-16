//
//  RenderFilter.js
//  porespy-frontend
//

import React from 'react';
import ApplyChords from '../Filters/ApplyChords/ApplyChords';
import ApplyChords3D from '../Filters/ApplyChords3D/ApplyChords3D';
import ApplyPadded from '../Filters/ApplyPadded/ApplyPadded';
import ChunkedFunc from '../Filters/ChunkedFunc/ChunkedFunc';
import DistanceTransformLin from '../Filters/DistanceTransformLin/DistanceTransformLin';
import Fftmorphology from '../Filters/Fftmorphology/Fftmorphology';
import FillBlindPores from '../Filters/FillBlindPores/FillBlindPores';
import FindDisconnectedVoxels from '../Filters/FindDisconnectedVoxels/FindDisconnectedVoxels';
import FindDtArtifacts from '../Filters/FindDtArtifacts/FindDtArtifacts';
import FindPeaks from '../Filters/FindPeaks/FindPeaks';
import Flood from '../Filters/Flood/Flood';
import HoldPeaks from '../Filters/HoldPeaks/HoldPeaks';
import LocalThickness from '../Filters/LocalThickness/LocalThickness';
import NphaseBorder from '../Filters/NphaseBorder/NphaseBorder';
import Porosimetry from '../Filters/Porosimetry/Porosimetry';
import PruneBranches from '../Filters/PruneBranches/PruneBranches';
import ReducePeaks from '../Filters/ReducePeaks/ReducePeaks';
import RegionSize from '../Filters/RegionSize/RegionSize';
import SnowPartitioning from '../Filters/SnowPartitioning/SnowPartitioning';
import SnowPartitioningN from '../Filters/SnowPartitioningN/SnowPartitioningN';
import SnowPartitioningParallel  from '../Filters/SnowPartitioningParallel/SnowPartitioningParallel';
import TrimDisconnectedBlobs from '../Filters/TrimDisconnectedBlobs/TrimDisconnectedBlobs';
import TrimExtrema from '../Filters/TrimExtrema/TrimExtrema';
import TrimFloatingSolid from '../Filters/TrimFloatingSolid/TrimFloatingSolid';
import TrimNearbyPeaks from '../Filters/TrimNearbyPeaks/TrimNearbyPeaks';
import TrimNonpercolatingPaths from '../Filters/TrimNonpercolatingPaths/TrimNonpercolatingPaths';
import TrimSaddlePoints from '../Filters/TrimSaddlePoints/TrimSaddlePoints';
import TrimSmallClusters from '../Filters/TrimSmallClusters/TrimSmallClusters';
import './RenderFilter.css';

const RenderFilter = ({ chosenFunction }) => {
    return (
        <div>
            {/* Conditionally renders the Filter chosen by the user.*/}
            { chosenFunction === "Apply Chords" && <ApplyChords /> }
            { chosenFunction === "Apply Chords 3D" && <ApplyChords3D /> }
            { chosenFunction === "Apply Padded" && <ApplyPadded /> }
            { chosenFunction === "Chunked Func" && <ChunkedFunc /> }
            { chosenFunction === "Distance Transform Lin" && <DistanceTransformLin /> }
            { chosenFunction === "Fftmorphology" && <Fftmorphology /> }
            { chosenFunction === "Fill Blind Pores" && <FillBlindPores /> }
            { chosenFunction === "Find Disconnected Voxels" && <FindDisconnectedVoxels /> }
            { chosenFunction === "Find Dt Artifacts" && <FindDtArtifacts /> }
            { chosenFunction === "Find Peaks" && <FindPeaks /> }
            { chosenFunction === "Flood" && <Flood /> }
            { chosenFunction === "Hold Peaks" && <HoldPeaks /> }
            { chosenFunction === "Local Thickness" && <LocalThickness /> }
            { chosenFunction === "Nphase Border" && <NphaseBorder /> }
            { chosenFunction === "Porosimetry" && <Porosimetry /> }
            { chosenFunction === "Prune Branches" && <PruneBranches /> }
            { chosenFunction === "Reduce Peaks" && <ReducePeaks /> }
            { chosenFunction === "Region Size" && <RegionSize /> }
            { chosenFunction === "Snow Partitioning" && <SnowPartitioning /> }
            { chosenFunction === "Snow Partitioning N" && <SnowPartitioningN /> }
            { chosenFunction === "Snow Partitioning Parallel" && <SnowPartitioningParallel /> }
            { chosenFunction === "Trim Disconnected Blobs" && <TrimDisconnectedBlobs /> }
            { chosenFunction === "Trim Extrema" && <TrimExtrema /> }
            { chosenFunction === "Trim Floating Solid" && <TrimFloatingSolid /> }
            { chosenFunction === "Trim Nearby Peaks" && <TrimNearbyPeaks /> }
            { chosenFunction === "Trim Nonpercolating Paths" && <TrimNonpercolatingPaths /> }
            { chosenFunction === "Trim Saddle Points" && <TrimSaddlePoints /> }
            { chosenFunction === "Trim Small Clusters" && <TrimSmallClusters /> }
        </div>
    )
}

export default RenderFilter;
