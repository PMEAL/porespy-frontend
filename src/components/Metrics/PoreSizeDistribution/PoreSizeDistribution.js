//
//  PoreSizeDistribution.js
//  porespy-frontend
//

import React, { useState, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import RenderImage from '../../RenderImage/RenderImage';
import './PoreSizeDistribution.css';

const PoreSizeDistribution = (props) => {
    const backendEndpoint = useSelector((state) => state.backend);
    const chosenImageIndex = useSelector((state) => state.imageToBeFiltered);
    const availableImages = useSelector((state) => state.generatedImages);
    const chosenImage = chosenImageIndex !== "" ? availableImages[chosenImageIndex] : { img: "" };
    const funcs = useSelector((state) => (state));
    const fieldsInfo = funcs.porespyFuncs.hasOwnProperty('metrics') ? funcs.porespyFuncs.metrics["pore_size_distribution"] : {};

    const [params, setParams] = useState(fieldsInfo);
    const [metricImage, setMetricImage] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("")

    const generatePoreSizeDistribution = () => {
        setLoading(true);
        setMetricImage("");
        const imgArrayJSON = JSON.stringify(chosenImage["img_array"]);





        // TODO: add textfields for the labels for the users -> like xlabel, ylabel






        setTimeout(() => {
            axios.put(`${backendEndpoint}metrics/poresizedistribution/1/`, {
                psd_im: imgArrayJSON,
                bins: 10,
                log: true,
                voxel_size: 3
            }).then(({ data: { psd_im_metric } }) => {
                console.log(psd_im_metric["base_64"]);
                setMetricImage(psd_im_metric["base_64"]);
                // props.startSetImages();

                setLoading(false);            
            }).catch((e) => {
                setMetricImage("");
                setLoading(false);
                setError(true);
                setErrorMessage(`Something is wrong... ${e.message}`);
            });
        }, 500);        
    }

    return (
        <div>
            <div>
                Pore Size Distribution
            </div>
            <div>
                Calculate a pore-size distribution based on the image produced by the
                ``porosimetry`` or ``local_thickness`` functions.
            </div>
            <div>
                Image chosen to apply filter on:
            </div>
            <div>
                {
                    chosenImage !== undefined && chosenImage["img"] !== ""
                    &&
                    <img
                        // className="selectedImage"
                        src={`data:image/png;base64,${chosenImage["img"]}`}
                        alt={chosenImage["img"]}
                    />
                }
            </div>

            <div>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => generatePoreSizeDistribution()}

                    disabled={false}

                    style={{ minWidth: '170px', minHeight: '16px'}}
                >
                    Create metric
                </Button>
            </div>

            <div>
                <div>
                    Pore Size Distribution Metric:
                </div>
                <RenderImage 
                    imgString={metricImage}
                    loading={loading}
                    error={error}
                    erroMessage={errorMessage}
                />
            </div>
        </div>
    )
}

// const mapDispatchToProps = (dispatch) => ({
//     startSetImages: () => dispatch(startSetImages(metricsPSDImagesRedux))
// })


export default connect(undefined, undefined)(PoreSizeDistribution);
