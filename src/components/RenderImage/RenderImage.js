//
//  RenderImage.js
//  porespy-frontend
//

import React from 'react';
import { CircularProgress } from '@material-ui/core';
import './RenderImage.css';

const RenderImage = ({ imgString, loading, error, errorMessage }) => {
    return (
        <div>
            {
                imgString !== ""
                ?
                <div className="renderedImageWrapper">
                    <img 
                        className="renderedImage"
                        src={`data:image/png;base64,${imgString}`}
                        alt={imgString}
                    />
                </div>
                :
                (
                    loading
                    ?
                    <div className="spinner">
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
                            <div className="renderedImageWrapper">
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
