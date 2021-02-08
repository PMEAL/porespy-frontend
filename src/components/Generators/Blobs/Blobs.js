//
//  Blob.js
//  porespy-frontend
//

import React, { useState, useEffect, createRef, useCallback } from 'react';
import { connect, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import Dropzone, { useDropzone } from 'react-dropzone';
import { integerOnlyField, floatOnlyBetweenOneAndZeroField, validateParams } from '../../../utils/fieldValidators';
import { windowDownload } from '../../../utils/fileManipulators';
import './Blobs.css';

const Blobs = () => {
    // Data should be entered like this (Object of objects)
    // const fieldsInfo = {
    //     "xDimension": {
    //         helperText: "Integer values only.",
    //         id: "xDimensionInput",
    //         label: "Voxels in x-direction",
    //         default: "500",
    //         type: "int",
    //         required: true
    //     }
    // };





    // TODO: Vertical panel of images Material UI GridList

    // import React from 'react';
    // import { makeStyles } from '@material-ui/core/styles';
    // import GridList from '@material-ui/core/GridList';
    // import GridListTile from '@material-ui/core/GridListTile';
    // import tileData from './tileData';

    // const useStyles = makeStyles((theme) => ({
    // root: {
    //     display: 'flex',
    //     flexWrap: 'wrap',
    //     justifyContent: 'space-around',
    //     overflow: 'hidden',
    //     backgroundColor: theme.palette.background.paper,
    // },
    // gridList: {
    //     width: 500,
    //     height: 450,
    // },
    // }));

    // /**
    //  * The example data is structured as follows:
    //  *
    //  * import image from 'path/to/image.jpg';
    //  * [etc...]
    //  *
    //  * const tileData = [
    //  *   {
    //  *     img: image,
    //  *     title: 'Image',
    //  *     author: 'author',
    //  *     cols: 2,
    //  *   },
    //  *   {
    //  *     [etc...]
    //  *   },
    //  * ];
    //  */
    // export default function ImageGridList() {
    // const classes = useStyles();

    // return (
    //     <div className={classes.root}>
    //     <GridList cellHeight={160} className={classes.gridList} cols={3}>
    //         {tileData.map((tile) => (
    //         <GridListTile key={tile.img} cols={tile.cols || 1}>
    //             <img src={tile.img} alt={tile.title} />

            // <Button 
            //     variant="contained" 
            //     color="primary"
            //     style={{ minWidth: '170px', minHeight: '16px'}}
            // >
            //     Load
            // </Button>

            // <Button 
            //     variant="contained" 
            //     color="primary"
            //     style={{ minWidth: '170px', minHeight: '16px'}}
            // >
            //     Download
            // </Button>

    //         </GridListTile>
    //         ))}
    //     </GridList>
    //     </div>
    // );
    // }










    const backendEndpoint = useSelector((state) => state.backend);
    const funcs = useSelector((state) => (state));
    const fieldsInfo = funcs.porespyFuncs.hasOwnProperty('generators') ? funcs.porespyFuncs.generators.blobs : {};

    if (fieldsInfo.hasOwnProperty('kwargs')) {
        // remove kwargs from this function. As a result, no kwargs entry in the component will be generated.
        delete fieldsInfo['kwargs'];
    }

    for (const entry in fieldsInfo) {
        if (fieldsInfo[entry].type === "int") {
            fieldsInfo[entry]["helperText"] = "Integer Values only";
        } else if (fieldsInfo[entry].type === "float") {
            fieldsInfo[entry]["helperText"] = "Float value between 0 and 1";
        }

        fieldsInfo[entry]["id"] = entry + "input";

        switch (entry) {
            case "shape[0]":
                fieldsInfo[entry]["label"] = "Voxels in x Dimension";
                break;
            case "shape[1]":
                fieldsInfo[entry]["label"] = "Voxels in y Dimension";
                break;
            case "shape[2]":
                fieldsInfo[entry]["label"] = "Voxels in z Dimension";
                break;
            case "blobiness":
                fieldsInfo[entry]["label"] = "Blobiness";
                break;
            case "porosity":
                fieldsInfo[entry]["label"] = "Porosity";
                break;
            default:
                break;
        }
    }

    const [params, setParams] = useState(fieldsInfo);
    const [validatedParams, setValidatedParams] = useState(false);
    const [blob, setBlob] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const dropzoneRef = createRef();    
    const loadBlob = () => {
        if (dropzoneRef.current) {
            dropzoneRef.current.open();
        }
    }

    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.forEach((file) => {
            const reader = new FileReader();
            reader.onabort = () => console.log("File reading was aborted");
            reader.onerror = () => console.log("File reading has failed");
            reader.onload = () => {
                const binaryStr = reader.result;
                console.log(binaryStr);
            }

            reader.readAsArrayBuffer(file);
        })
    }, []);

    const generateBlob = () => {
        setLoading(true);
        setBlob("");
        // currently image loading is very quick. setTimeout adds 1 sec of loading to show user that the image is loading.
        setTimeout(() => {
            axios.put(`${backendEndpoint}generators/blobs/1/`, {
                porosity: params["porosity"].value,
                blobiness: params["blobiness"].value,
                dimension_x: params["shape[0]"].value,
                dimension_y: params["shape[1]"].value,
                dimension_z: params["shape[2]"].value === "" ? 0 : params["shape[2]"].value
            }).then(({ data: { generated_image } }) => {
                setBlob(generated_image);
                setLoading(false);
            }).catch((e) => {
                setBlob("");
                setLoading(false);
                setError(true);
                setErrorMessage(`Something is wrong... ${e.message}`);
            });
        }, 1000);
    }

    const downloadBlob = () => {
        if (blob === "") {
            setError(true);
            setErrorMessage("You need to generate a Blob before downloading it!");
            return;
        }

        windowDownload(blob);
    }

    const parseEnteredValues = (e, property) => {
        const tempParams = params;

        switch (tempParams[property].type) {
            case "int":
                tempParams[property].value = integerOnlyField(e);
                break;
            case "float":
                tempParams[property].value =  floatOnlyBetweenOneAndZeroField(e);
                break;
            default:
                break;
        }

        setParams(tempParams);
        setValidatedParams(validateParams(params));
    }

    const {getRootProps, getInputProps} = useDropzone({onDrop})

    return (
        <div>
            <div className="blobTitle">
                Blobs
            </div>
            <div className="blobDescription">
                Generates an image containing amorphous blobs.
            </div>
            <div className="blobTextFields">
                {
                    Object.keys(params).map((p) => (
                            p
                            &&
                            <div className="blobTextField">
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
                        )
                    )
                }
            </div>

            <div className="blobButtons">
                <div className="blobButton">
                    <Dropzone ref={dropzoneRef} noClick noKeyboard>
                        {() => (
                            <div {...getRootProps({className: 'dropzone'})}>
                                <input {...getInputProps()} />
                                <Button
                                    variant="contained" 
                                    color="primary"
                                    style={{ minWidth: '170px', minHeight: '16px'}}
                                    onClick={() => loadBlob()}
                                >
                                    Load Image
                                </Button>
                            </div>
                            )
                        }
                    </Dropzone>
                </div>
                <div className="blobButton">
                    <Button 
                        variant="contained" 
                        color="primary"
                        onClick={() => generateBlob()}
                        disabled={validatedParams}                        
                        style={{ minWidth: '170px', minHeight: '16px'}}
                    >
                        Generate Image
                    </Button>
                </div>
                <div className="blobButton">
                    <Button 
                        variant="contained" 
                        color="primary"
                        onClick={() => downloadBlob()}
                        disabled={validatedParams}
                        style={{ minWidth: '170px', minHeight: '16px'}}
                    >
                        Download Image
                    </Button>
                </div>
            </div>

            {
                // Conditional rendering:
                // If blob is not an empty string, the blob has been generated and will be displayed in the <img /> tag.
                // If blob is an empty string, check whether generateBlob() has been called which will change whether loading is true or false.
                // If loading, display the spinner to the user. If not and there is an error, display error message to the user.
                // Upon loading, nothing will appear in this <div></div> as no conditions are satisfied.
                blob !== ""
                ?
                <div className="blobImageWrapper">
                    <img 
                        className="blobImage" 
                        src={`data:image/png;base64,${blob}`} 
                    />
                </div>
                :
                (
                    loading
                    ?
                    <div className="spinner">
                        <div>
                            <CircularProgress />
                        </div>
                        <div>
                            Generating your image...
                        </div>
                    </div>
                    :
                    <div>
                        {
                            error 
                            && 
                            <div className="blobImageWrapper">
                                {errorMessage}
                            </div>
                        }
                    </div>
                )                              
            }
        </div>
    )
}

export default connect(undefined, undefined)(Blobs);
