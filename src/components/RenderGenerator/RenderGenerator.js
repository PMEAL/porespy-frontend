import React from 'react';
import './RenderGenerator.css';
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

const RenderGenerator = ({ chosenFunction }) => {
    return (
        <div>
            <h1>
                Hello from RenderGenerator
            </h1>
            <div>
                {chosenFunction}
            </div>
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
        </div>
    )
}

export default RenderGenerator;
