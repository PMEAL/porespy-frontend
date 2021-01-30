//
//  RenderGenerator.js
//  porespy-frontend
//

import React from 'react';
import { connect } from 'react-redux';
import Blobs from '../Generators/Blobs/Blobs';
import BundleOfTubes from '../Generators/BundleOfTubes/BundleOfTubes';
import Cylinders from '../Generators/Cylinders/Cylinders';
import InsertShape from '../Generators/InsertShape/InsertShape';
import LatticeSpheres from '../Generators/LatticeSpheres/LatticeSpheres';
import LineSegment from '../Generators/LineSegment/LineSegment';
import OverlappingSpheres from '../Generators/OverlappingSpheres/OverlappingSpheres';
import PerlinNoise from '../Generators/PerlinNoise/PerlinNoise';
import PolydisperseSpheres from '../Generators/PolydisperseSpheres/PolydisperseSpheres';
import RSA from '../Generators/RSA/RSA';
import VoronoiEdges from '../Generators/VoronoiEdges/VoronoiEdges';
import './RenderGenerator.css';

const RenderGenerator = ({ chosenFunction }) => {
    return (
        <div>
            {/* Conditionally renders the Generator chosen by the user.*/}
            {chosenFunction === "Blobs" && <Blobs />}
            {chosenFunction === "Bundle of Tubes" && <BundleOfTubes />}
            {chosenFunction === "Cylinders" && <Cylinders />}
            {chosenFunction === "Insert Shape" && <InsertShape />}
            {chosenFunction === "Lattice Spheres" && <LatticeSpheres />}
            {chosenFunction === "Line Segment" && <LineSegment />}
            {chosenFunction === "Overlapping Spheres" && <OverlappingSpheres />}
            {chosenFunction === "Perlin Noise" && <PerlinNoise />}
            {chosenFunction === "Polydisperse Spheres" && <PolydisperseSpheres />}
            {chosenFunction === "RSA" && <RSA />}
            {chosenFunction === "Voronoi Edges" && <VoronoiEdges />}
            {/* TODO: add a landing page component when chosenFunction === "", style it. */}
            {chosenFunction === "" && <div>Choose a generator to get started!</div>}
        </div>
    )
}

export default connect(undefined, undefined)(RenderGenerator);
