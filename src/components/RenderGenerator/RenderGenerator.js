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
            {
                chosenFunction === "Blobs" && <Blobs />
            }
        </div>
    )
}

export default RenderGenerator;
