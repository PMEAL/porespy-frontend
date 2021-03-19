//
//  LocalThickness.js
//  porespy-frontend
//

import React, { useState } from 'react';
import { connect, useSelector } from 'react-redux';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { integerOnlyField } from '../../../utils/fieldValidators';
import RenderImage from '../../RenderImage/RenderImage';
import { startSetImages } from '../../../actions/Generators/GeneratedImages';
import './LocalThickness.css';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 210,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
}));

let filtersLtImagesRedux = {};

const LocalThickness = (props) => {
    const classes = useStyles();
    const backendEndpoint = useSelector((state) => state.backend);
    const chosenImageIndex = useSelector((state) => state.imageToBeFiltered);
    const availableImages = useSelector((state) => state.generatedImages);
    const chosenImage = chosenImageIndex !== "" ? availableImages[chosenImageIndex] : { img: "" };
    const funcs = useSelector((state) => (state));
    const fieldsInfo = funcs.porespyFuncs.hasOwnProperty('filters') ? funcs.porespyFuncs.filters["local_thickness"] : {};

    if (fieldsInfo.hasOwnProperty('kwargs') || fieldsInfo.hasOwnProperty('im') || fieldsInfo.hasOwnProperty('mode')) {
        delete fieldsInfo['kwargs'];
        delete fieldsInfo['im'];
        delete fieldsInfo['mode'];
    }

    for (const entry in fieldsInfo) {
        switch (entry) {
            case "sizes":
                fieldsInfo[entry]["label"] = "The size to invade.";
                fieldsInfo[entry]["helperText"] = "Size";
                fieldsInfo[entry]["id"] = entry + "input";
                break;
            default:
                break;
        }
    }

    const [params, setParams] = useState(fieldsInfo);
    const [mode, setMode] = useState("hybrid");
    const [validatedParams, setValidatedParams] = useState(chosenImage !== "");
    const [filteredImage, setFilteredImage] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const applyLocalThickness = () => {
        setLoading(true);
        setFilteredImage("");
        const imgArrayJSON = JSON.stringify(chosenImage["img_array"]);

        setTimeout(() => {
            axios.put(`${backendEndpoint}filters/localthickness/1/`, {
                local_thickness_image: imgArrayJSON,
                sizes: params["sizes"].value,
                mode
            }).then(({ data: { local_thickness_image_filtered } }) => {
                setFilteredImage(local_thickness_image_filtered["base_64"]);
                filtersLtImagesRedux = {
                    img: local_thickness_image_filtered["base_64"],
                    img_array: local_thickness_image_filtered["np_array"],
                    genType: "LocalThickness"
                };
                props.startSetImages(filtersLtImagesRedux);
                setLoading(false);
            }).catch((e) => {    
                setFilteredImage("");
                setLoading(false);
                setError(true);
                setErrorMessage(`Something is wrong... ${e.message}`);
                console.log(e);
            });
        }, 500);        
    }

    const handleSelectChange = (e) => {
        setMode(e.target.value);
    }

    const parseEnteredValues = (e, property) => {
        if (
            chosenImage !== undefined
            && chosenImage["img"] !== ""
            && e.target.value !== ""
        ) {
            setValidatedParams(true);
            const tempParams = params;
            tempParams[property].value = integerOnlyField(e);
            setParams(tempParams);
        } else {
            setValidatedParams(false);
        }
    }
    
    return (
        <div>
            <div className="localThicknessTitle">
                Local Thickness
            </div>
            <div className="localThicknessDescription">
                For each voxel, this function calculates the radius of the largest sphere that both engulfs the voxel and fits entirely within the foreground. 
                This is not the same as a simple distance transform, which finds the largest sphere that could be "centered" on each voxel.
            </div>
            <div className="localThicknessDescription">
                To apply a filter on an image, first click the left arrow on the image you want to load in from the right side panel.
                Then, enter the desired Size and Mode values.
            </div>
            <div className="localThicknessMsg">
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
            <div className="localThicknessInputs">
                {
                    Object.keys(params).map((p) => (
                        <div className="localThicknessInput">
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
                <div className="localThicknessInput">                
                    <FormControl className={classes.formControl}>
                        <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                            Computational result method
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-placeholder-label-label"
                            id="demo-simple-select-placeholder-label"
                            value={mode}
                            onChange={(e) => handleSelectChange(e)}
                            displayEmpty
                            className={classes.selectEmpty}
                        >
                            <MenuItem value="hybrid">
                                hybrid
                            </MenuItem>
                            <MenuItem value="dt">
                                dt
                            </MenuItem>
                            <MenuItem value="mio">
                                mio
                            </MenuItem>
                        </Select>
                        <FormHelperText>
                            Mode
                        </FormHelperText>
                    </FormControl>
                </div>
            </div>

            <div className="localThicknessButton">
                <Button
                    variant="contained" 
                    color="primary"
                    onClick={() => applyLocalThickness()}
                    disabled={(!validatedParams || chosenImage === undefined || chosenImage["img"] === "")}
                    style={{ minWidth: '170px', minHeight: '16px'}}
                >
                    Apply Filter
                </Button>
            </div>
            <div>
                <div className="localThicknessMsg">
                    Filtered Image:
                </div>
                <RenderImage 
                    imgString={filteredImage}
                    loading={loading}
                    error={error}
                    errorMessage={errorMessage}
                />
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    startSetImages: () => dispatch(startSetImages(filtersLtImagesRedux))
})

export default connect(undefined, mapDispatchToProps)(LocalThickness);
