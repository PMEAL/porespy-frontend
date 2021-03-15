//
//  RenderImage.js
//  porespy-frontend
//

import React from 'react';
import { CircularProgress } from '@material-ui/core';

const RenderImage = ({ imgString, loading, error, errorMessage }) => {
    return (
        <div>
            {
                imgString !== ""
                ?
                <div>
                    <img 
                        // className=""
                        src={`data:image/png;base64,${imgString}`}
                    />
                </div>
                :
                (
                    loading
                    ?
                    <div>
                        <CircularProgress />
                        <div>
                            Generating your image...
                        </div>
                    </div>
                    :
                    <div>
                        {
                            error
                            &&
                            <div>
                                {errorMessage}
                            </div>
                        }
                    </div>
                )
            }
        </div>
    )
}

export default RenderImage
