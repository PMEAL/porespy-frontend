//
//  ChunkedFunc.js
//  porespy-frontend
//

import React from 'react';
import './ChunkedFunc.css';

const ChunkedFunc = () => {
    return (
        <div>
            <div>
                Chunked Func
            </div>
            <div>
                Performs the specfied operation "chunk-wise" in parallel using dask.
                This can be used to save memory by doing one chunk at a time
                (``cores=1``) or to increase computation speed by spreading the work
                across multiple cores (e.g. ``cores=8``)
                This function can be used with any operation that applies a
                structuring element of some sort, since this implies that the
                operation is local and can be chunked.
            </div>
        </div>
    )
}

export default ChunkedFunc;
