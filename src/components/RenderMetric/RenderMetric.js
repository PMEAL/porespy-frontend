//
//  RenderMetric.js
//  porespy-frontend
//

import React from 'react';
import DefaultPage from '../DefaultPage/DefaultPage';
import PoreSizeDistribution from '../Metrics/PoreSizeDistribution/PoreSizeDistribution';
import './RenderMetric.css';

const RenderMetric = ({ chosenFunction }) => {
    const title = `Metrics`;
    const description = `These are functions that determine key metrics about an image.
    Typically these are applied to an image after applying a filter, but a few metrics functions
    can be applied directly to the binary image,`;

    return (
        <div>
            {/* Conditionally renders the Metric chosen by the user.*/}
            { chosenFunction === "Pore Size Distribution" && <PoreSizeDistribution /> }
            {}
            {}
            {}
            {}
            {}
            {}
            {}
            {}
            {}
            {}
            {}
            {}
            {}
            { chosenFunction === "" && <DefaultPage title={title} description={description}/> }
            {                
                /* 
                chosenFunction === "Chord Counts" && <ChordCounts />
                chosenFunction === "Chord Length Distribution" && <ChordLengthDistribution />
                chosenFunction === "Linear Density" && <LinearDensity />
                chosenFunction === "Mesh Surface Area" && <MeshSurfaceArea />
                chosenFunction === "Phase Fraction" && <PhaseFraction />
                
                
                chosenFunction === "Porosity" && <Porosity />
                chosenFunction === "Porosity Profile" && <PorosityProfile />
                chosenFunction === "Props To DataFrame" && <PropsToDataFrame />
                chosenFunction === "Props To Image" && <PropsToImage />
                chosenFunction === "Radial Density" && <RadialDensity />
                chosenFunction === "Region Interface Areas" && <RegionInterfaceAreas />
                chosenFunction === "Region Surface Areas" && <RegionSurfaceAreas />
                chosenFunction === "Regionprops 3D" && <Regionprops3D />
                chosenFunction === "Representative Elementary Volume" && <RepresentativeElementaryVolume />
                chosenFunction === "Two Point Correlation Bf" && <TwoPointCorrelationBf />
                chosenFunction === "Two Point Correlation Fft" && <TwoPointCorrelationFft />
                */
            }
        </div>
    )
}

export default RenderMetric;
