import React from 'react';
import './RenderGenerator.css';
import Blobs from '../Generators/Blobs/Blobs';

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
            {/*chosenFunction === "Bundle of Tubes" && <BundleOfTubes />*/}
            {/*chosenFunction === "Cylinders" && <Cylinders />*/}
            {/*chosenFunction === "Insert Shape" && <InsertShape />*/}
            {/*chosenFunction === "Lattice Spheres" && <LatticeSpheres />*/}
            {/*chosenFunction === "Line Segment" && <LineSegment />*/}
            {/*chosenFunction === "Overlapping Spheres" && <OverlappingSpheres />*/}
            {/*chosenFunction === "Perlin Noise" && <PerlinNoise />*/}
            {/*chosenFunction === "Polydispers Spheres" && <PolydiperseSpheres />*/}
            {/*chosenFunction === "RSA" && <RSA />*/}
            {/*chosenFunction === "Voronoi Edges" && <VoronoiEdges />*/}
        </div>
    )
}

export default RenderGenerator;
