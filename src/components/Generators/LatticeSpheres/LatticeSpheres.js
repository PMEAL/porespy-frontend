//
//  LatticeSpheres.js
//  porespy-frontend
//

import React, { useState, useRef } from 'react';
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
import RenderImage from '../../RenderImage/RenderImage';
import { integerOnlyField, validateParams } from '../../../utils/fieldValidators';
import { startSetImages } from '../../../actions/Generators/GeneratedImages';
import './LatticeSpheres.css';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 210,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
}));

let generatorsLsImagesRedux = {};

const LatticeSpheres = (props) => {
    const classes = useStyles();
    const backendEndpoint = useSelector((state) => state.backend);
    const funcs = useSelector((state) => (state));
    const fieldsInfo = funcs.porespyFuncs.hasOwnProperty('generators') ? funcs.porespyFuncs.generators["lattice_spheres"] : {};

    if (fieldsInfo.hasOwnProperty('kwargs')) {
        delete fieldsInfo['kwargs'];
    }

    if (fieldsInfo.hasOwnProperty('lattice')) {
        delete fieldsInfo['lattice'];
    }

    if (fieldsInfo.hasOwnProperty('smooth')) {
        delete fieldsInfo['smooth'];
    }

    for (const entry in fieldsInfo) {
        if (fieldsInfo[entry].type === "int") {
            fieldsInfo[entry]["helperText"] = "Integer Values only";
        }

        fieldsInfo[entry]["id"] = entry + "input";

        switch (entry) {
            case "shape[0]":
                fieldsInfo[entry]["label"] = "X Direction Voxels";
                break;
            case "shape[1]":
                fieldsInfo[entry]["label"] = "Y Direction Voxels";
                break;
            case "shape[2]":
                fieldsInfo[entry]["label"] = "Z Direction Voxels";
                break;
            case "radius":
                fieldsInfo[entry]["required"] = true;
                fieldsInfo[entry]["label"] = "Radius of spheres in packing";
                break;
            case "spacing":
                fieldsInfo[entry]["label"] = "Spacing between unit cells";
                break;
            case "offset":
                fieldsInfo[entry]["default"] = 0;
                fieldsInfo[entry]["required"] = true;
                fieldsInfo[entry]["label"] = "Amount of offset to be added";
                break;
        }
    }

    const [params, setParams] = useState(fieldsInfo);
    const [lattice, setLattice] = useState("sc");
    const [smooth, setSmooth] = useState("true");
    const [validatedParams, setValidatedParams] = useState(true);
    const [latticeSpheres, setLatticeSpheres] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const imageRef = useRef(null);

    const generateLatticeSpheres = () => {
        setLoading(true);
        setLatticeSpheres("");

        setTimeout(() => {
            axios.put(`${backendEndpoint}generators/latticespheres/1/`, {
                dimension_x: params["shape[0]"].value,
                dimension_y: params["shape[1]"].value,
                dimension_z: params["shape[2]"].value === "" ? 0 : params["shape[2]"].value,

                radius: params["radius"].value,
                offset: params["offset"].value,
                // TODO: uncomment this line below when the smooth kwarg has been added to the lattice_spheres function:
                // smooth
                lattice
            }).then(({ data: { generated_image } }) => {
                setLatticeSpheres(generated_image["base_64"]);
                generatorsLsImagesRedux = {
                    img: generated_image["base_64"],
                    img_array: generated_image["np_array"],
                    genType: "LatticeSpheres"
                };
                props.startSetImages(generatorsLsImagesRedux);
                setLoading(false);
            }).catch((e) => {
                setLatticeSpheres("");
                setLoading(false);
                setError(true);
                setErrorMessage(`Something is wrong... ${e.message}`);
            }).finally(() => {
                imageRef.current.scrollIntoView();
            });
        }, 500);
    }

    const handleLatticeSelectChange = (e) => {
        setLattice(e.target.value);
    }

    const handleSmoothSelectChange = (e) => {
        setSmooth(e.target.value);
    }

    const parseEnteredValues = (e, property) => {
        const tempParams = params;

        switch (tempParams[property].type) {
            case "int":
                tempParams[property].value = integerOnlyField(e);
                break;
            default:
                break;
        }

        setParams(tempParams);
        setValidatedParams(validateParams(params));
    }

    return (
        <div>
            <div className="latticeSpheresTitle">
                Lattice Spheres
            </div>
            <div className="latticeSpheresDescription">
                Generates a cubic packing of spheres in a specified lattice arrangement.
            </div>
            <div className="latticeSpheresInputs">
                {
                    Object.keys(params).map((p) => (
                        p
                        &&
                        <div className="latticeSpheresInput">
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
            <div className="latticeSpheresDropdowns">
                <div ref={imageRef}>
                    <FormControl className={classes.formControl}>
                        <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                            Type of Lattice
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-placeholder-label-label"
                            id="demo-simple-select-placeholder-label"
                            value={lattice}
                            onChange={(e) => handleLatticeSelectChange(e)}
                            displayEmpty
                            className={classes.selectEmpty}
                        >
                            <MenuItem value="sc">
                                sc
                            </MenuItem>
                            <MenuItem value="bcc">
                                bcc
                            </MenuItem>
                            <MenuItem value="fcc">
                                fcc
                            </MenuItem>
                        </Select>
                        <FormHelperText>
                            Lattice
                        </FormHelperText>
                    </FormControl>
                </div>
                <div>
                    <FormControl className={classes.formControl}>
                        <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                            Smooth spheres?
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-placeholder-label-label"
                            id="demo-simple-select-placeholder-label"
                            value={smooth}
                            onChange={(e) => handleSmoothSelectChange(e)}
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
                            Smooth spheres?
                        </FormHelperText>
                    </FormControl>
                </div>
            </div>
            <div className="localThicknessButton">
                <Button
                    variant="contained" 
                    color="primary"
                    onClick={() => generateLatticeSpheres()}
                    disabled={validatedParams}
                    style={{ minWidth: '170px', minHeight: '16px'}}
                >
                    Generate Image
                </Button>
            </div>
            <div>
                <RenderImage 
                    imgString={latticeSpheres}
                    loading={loading}
                    error={error}
                    errorMessage={errorMessage}
                />
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    startSetImages: () => dispatch(startSetImages(generatorsLsImagesRedux))
})

export default connect(undefined, mapDispatchToProps)(LatticeSpheres);
