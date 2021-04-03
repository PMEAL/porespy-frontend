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
                // Conditional rendering:
                // If blob is not an empty string, the blob has been generated and will be displayed in the <img /> tag.
                // If blob is an empty string, check whether generateBlob() has been called which will change whether loading is true or false.
                // If loading, display the spinner to the user. If not and there is an error, display error message to the user.
                // Upon loading, nothing will appear in this <div></div> as no conditions are satisfied.
            }
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
                        <div className="spinnerMsg">
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

export default RenderImage;
