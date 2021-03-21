//
//  RenderMetric.js
//  porespy-frontend
//

import React from 'react';
import DefaultPage from '../DefaultPage/DefaultPage';
import ChordCounts from '../Metrics/ChordCounts/ChordCounts';
import ChordLengthDistribution from '../Metrics/ChordLengthDistribution/ChordLengthDistribution';
import LinearDensity from '../Metrics/LinearDensity/LinearDensity';
import MeshSurfaceArea from '../Metrics/MeshSurfaceArea/MeshSurfaceArea';
import PhaseFraction from '../Metrics/PhaseFraction/PhaseFraction';
import PoreSizeDistribution from '../Metrics/PoreSizeDistribution/PoreSizeDistribution';
import Porosity from '../Metrics/Porosity/Porosity';
import PorosityProfile from '../Metrics/PorosityProfile/PorosityProfile';
import PropsToDataFrame from '../Metrics/PropsToDataFrame/PropsToDataFrame';
import PropsToImage from '../Metrics/PropsToImage/PropsToImage';
import RadialDensity from '../Metrics/RadialDensity/RadialDensity';
import RegionInterfaceAreas from '../Metrics/RegionInterfaceAreas/RegionInterfaceAreas';
import RegionSurfaceAreas from '../Metrics/RegionSurfaceAreas/RegionSurfaceAreas';
import Regionprops3D from '../Metrics/Regionprops3D/Regionprops3D';
import RepresentativeElementaryVolume from '../Metrics/RepresentativeElementaryVolume/RepresentativeElementaryVolume';
import TwoPointCorrelationBf from '../Metrics/TwoPointCorrelationBf/TwoPointCorrelationBf';
import TwoPointCorrelationFft from '../Metrics/TwoPointCorrelationFft/TwoPointCorrelationFft';
import './RenderMetric.css';

const RenderMetric = ({ chosenFunction }) => {
    const title = `Metrics`;
    const description = `These are functions that determine key metrics about an image.
    Typically these are applied to an image after applying a filter, but a few metrics functions
    can be applied directly to the binary image,`;

    return (
        <div>
            {/* Conditionally renders the Metric chosen by the user.*/}
            { chosenFunction === "Chord Counts" && <ChordCounts /> }
            { chosenFunction === "Chord Length Distribution" && <ChordLengthDistribution /> }
            { chosenFunction === "Linear Density" && <LinearDensity /> }
            { chosenFunction === "Mesh Surface Area" && <MeshSurfaceArea /> }
            { chosenFunction === "Phase Fraction" && <PhaseFraction /> }            
            { chosenFunction === "Pore Size Distribution" && <PoreSizeDistribution /> }
            { chosenFunction === "Porosity" && <Porosity /> }
            { chosenFunction === "Porosity Profile" && <PorosityProfile /> }
            { chosenFunction === "Props To DataFrame" && <PropsToDataFrame /> }
            { chosenFunction === "Props To Image" && <PropsToImage /> }
            { chosenFunction === "Radial Density" && <RadialDensity /> }
            { chosenFunction === "Region Interface Areas" && <RegionInterfaceAreas /> }
            { chosenFunction === "Region Surface Areas" && <RegionSurfaceAreas /> }
            { chosenFunction === "Regionprops 3D" && <Regionprops3D /> }
            { chosenFunction === "Representative Elementary Volume" && <RepresentativeElementaryVolume /> }
            { chosenFunction === "Two Point Correlation Bf" && <TwoPointCorrelationBf /> }
            { chosenFunction === "Two Point Correlation Fft" && <TwoPointCorrelationFft /> }
            { chosenFunction === "" && <DefaultPage title={title} description={description}/> }
        </div>
    )
}

export default RenderMetric;
