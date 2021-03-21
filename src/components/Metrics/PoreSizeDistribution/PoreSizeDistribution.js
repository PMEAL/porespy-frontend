//
//  PoreSizeDistribution.js
//  porespy-frontend
//

import React, { useState, useRef } from 'react';
import { connect, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { integerOnlyField, validateParams } from '../../../utils/fieldValidators';
import RenderImage from '../../RenderImage/RenderImage';
import { startSetImages } from '../../../actions/Generators/GeneratedImages';
import './PoreSizeDistribution.css';

// TODO: abstract this/the styles object into Redux?
const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 210,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
}));

let metricsPSDImagesRedux = {};

const PoreSizeDistribution = (props) => {
    const classes = useStyles();
    const backendEndpoint = useSelector((state) => state.backend);
    const chosenImageIndex = useSelector((state) => state.imageToBeFiltered);
    const availableImages = useSelector((state) => state.generatedImages);
    const chosenImage = chosenImageIndex !== "" ? availableImages[chosenImageIndex] : { img: "" };
    const funcs = useSelector((state) => (state));
    const fieldsInfo = funcs.porespyFuncs.hasOwnProperty('metrics') ? funcs.porespyFuncs.metrics["pore_size_distribution"] : {};

    if (fieldsInfo.hasOwnProperty("im")) {
        delete fieldsInfo["im"];
    }

    if (fieldsInfo.hasOwnProperty("log")) {
        delete fieldsInfo["log"];
    }
    
    fieldsInfo["x_axis_label"] = {
        id: "x_axis_labelinput",
        required: true,
        type: "null",
        value: "Y Axis"
    };
    
    fieldsInfo["y_axis_label"] = {
        id: "y_axis_labelinput",
        required: true,
        type: "null",
        value: "X Axis"
    };

    for (const entry in fieldsInfo) {
        fieldsInfo[entry]["id"] = entry + "input";

        switch (entry) {
            case "bins":
                fieldsInfo[entry]["label"] = "Number of bins";
                fieldsInfo[entry]["helperText"] = "Integer values only";
                break;
            case "voxel_size":
                fieldsInfo[entry]["label"] = "Size of a voxel side";
                fieldsInfo[entry]["helperText"] = "Integer values only";
                break;
            case "x_axis_label":
                fieldsInfo[entry]["label"] = "X axis label";
                fieldsInfo[entry]["helperText"] = "X axis label";
                break;
            case "y_axis_label":
                fieldsInfo[entry]["label"] = "Y axis label";
                fieldsInfo[entry]["helperText"] = "Y axis label";
                break;
            default:
                break;
        }
    }

    const [params, setParams] = useState(fieldsInfo);
    const [log, setLog] = useState(true);
    const [xAxisLabel, setXAxisLabel] = useState("X Axis");
    const [yAxisLabel, setYAxisLabel] = useState("Y Axis");
    const [validatedParams, setValidatedParams] = useState(chosenImage === "");
    const [metricImage, setMetricImage] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const imageRef = useRef(null);

    const generatePoreSizeDistribution = () => {
        setLoading(true);
        setMetricImage("");
        const imgArrayJSON = JSON.stringify(chosenImage["img_array"]);

        setTimeout(() => {
            axios.put(`${backendEndpoint}metrics/poresizedistribution/1/`, {
                psd_im: imgArrayJSON,
                bins: params["bins"].value,
                log,
                voxel_size: params["voxel_size"].value,
                x_axis_label: xAxisLabel,
                y_axis_label: yAxisLabel
            }).then(({ data: { psd_im_metric } }) => {
                setMetricImage(psd_im_metric["base_64"]);
                metricsPSDImagesRedux = {
                    img: psd_im_metric["base_64"],
                    img_array: psd_im_metric["np_array"],
                    genType: "PoreSizeDistribution"
                };
                props.startSetImages(metricsPSDImagesRedux);
                setLoading(false);            
            }).catch((e) => {
                setMetricImage("");
                setLoading(false);
                setError(true);
                setErrorMessage(`Something is wrong... ${e.message}`);
            }).finally(() => {
                imageRef.current.scrollIntoView();
            });
        }, 500);
    }

    const handleSelectChange = (e) => {
        setLog(e.target.value === "true");
    }

    const parseEnteredValues = (e, property) => {
        const tempParams = params;

        if (property !== "x_axis_label" && property !== "y_axis_label") {
            tempParams[property].value = integerOnlyField(e);
        } else if (property === "x_axis_label") {
            tempParams[property].value = e.target.value;
            setXAxisLabel(e.target.value);
        } else if (property === "y_axis_label") {
            tempParams[property].value = e.target.value;
            setYAxisLabel(e.target.value);
        }

        setParams(tempParams);
        setValidatedParams(validateParams(params));
    }

    return (
        <div>
            <div className="poreSizeDistributionTitle">
                Pore Size Distribution
            </div>
            <div className="poreSizeDistributionDescription">
                Calculate a pore-size distribution based on the image produced by the porosimetry or local_thickness functions.
            </div>
            <div className="poreSizeDistributionDescription">
                To apply a filter on an image, first click the left arrow on the image you want to load in from the right side panel.
                Then, enter the desired Size and Mode values.
            </div>
            <div className="poreSizeDistributionMsg">
                Image chosen to apply filter on:
            </div>
            <div className="selectedImageWrapper">
                {
                    chosenImage !== undefined && chosenImage["img"] !== ""
                    &&
                    <img
                        className="selectedImage"
                        src={`data:image/png;base64,${chosenImage["img"]}`}
                        alt={chosenImage["img"]}
                    />
                }
            </div>

            <div className="poreSizeDistributionInputs">
                {
                    Object.keys(params).map((p) => (
                        <div>
                            <TextField  
                                required={params[p].required}
                                id={params[p].id}
                                label={params[p].label}
                                defaultValue={params[p].value}
                                helperText={params[p].helperText}
                                variant={"outlined"}
                                onInput={(e) => parseEnteredValues(e, p)}
                            />
                        </div>
                    ))
                }
            </div>
            
            <div className="poreSizeDistributionDropdown" ref={imageRef}>
                <FormControl className={classes.formControl}>
                    <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                        Logarithmic data?
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-placeholder-label-label"
                        id="demo-simple-select-placeholder-label"
                        value={log}
                        onChange={(e) => handleSelectChange(e)}
                        displayEmpty
                        className={classes.selectEmpty}
                    >
                        <MenuItem value="true">
                            True
                        </MenuItem>
                        <MenuItem value="false">
                            False
                        </MenuItem>
                    </Select>
                    <FormHelperText>
                        Logarithmic data?
                    </FormHelperText>
                </FormControl>
            </div>

            <div className="poreSizeDistributionButton">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => generatePoreSizeDistribution()}
                    disabled={(validatedParams || chosenImage === undefined || chosenImage["img"] === "")}
                    style={{ minWidth: '170px', minHeight: '16px'}}
                >
                    Create metric
                </Button>
            </div>

            <div>
                <div className="poreSizeDistributionMsg">
                    Created Pore Size Distribution Metric:
                </div>
                <div>
                    <RenderImage 
                        imgString={metricImage}
                        loading={loading}
                        error={error}
                        erroMessage={errorMessage}
                    />
                </div>
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    startSetImages: () => dispatch(startSetImages(metricsPSDImagesRedux))
})

export default connect(undefined, mapDispatchToProps)(PoreSizeDistribution);
