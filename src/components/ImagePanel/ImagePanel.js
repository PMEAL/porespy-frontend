//
//  ImagePanel.js
//  porespy-frontend
//

import React from 'react';
import { connect, useSelector } from 'react-redux';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DeleteIcon from '@material-ui/icons/Delete';
import { windowDownload } from '../../utils/fileManipulators';
import { startDeleteImages } from '../../actions/Generators/GeneratedImages';
import { startSetChosenImage } from '../../actions/Filters/ImageToBeFiltered';
import './ImagePanel.css';

let indexToDelete = 0;
let chosenImage = "";

const ImagePanel = (props) => {
    const generatedImages = useSelector((state) => (state.generatedImages));

    const deleteImage = (index) => {
        indexToDelete = index;
        props.startDeleteImages(index);
    }

    const imageToBeFiltered = (imgIndex) => {
        // console.log("load image here!");
        chosenImage = imgIndex;
        props.startSetChosenImage(chosenImage);
    }
    
    return (
        <div>
            <GridList cellHeight={180} className={props.classes.gridList}>
            {
                generatedImages.map((tile, index) => (
                        <GridListTile cols={2} key={tile.img}>
                            <img 
                                src={`data:image/png;base64,${tile.img}`}
                                alt={index+1}
                            />
                            <GridListTileBar
                                title={`${tile.genType}_${index+1}`}
                                titlePosition="top"
                            />
                            <GridListTileBar
                                actionIcon={
                                    <div className={props.classes.imageBarButtons}>
                                        <IconButton aria-label={`info about ${index+1}`} className={props.classes.icon} title="Load image">
                                            <ArrowBackIcon onClick={() => imageToBeFiltered(index)}/>
                                        </IconButton>
                                        <IconButton aria-label={`info about ${index+1}`} className={props.classes.icon} title="Download image">
                                            <ArrowDownwardIcon onClick={() => windowDownload(tile.img, tile.genType, "image")}/>
                                        </IconButton>
                                        <IconButton aria-label={`info about ${index+1}`} className={props.classes.icon} title="Delete image">
                                            <DeleteIcon onClick={() => deleteImage(index)} />
                                        </IconButton>
                                    </div>
                                }
                            />
                        </GridListTile>
                    ))
                }
            </GridList>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    startDeleteImages: () => dispatch(startDeleteImages(indexToDelete)),
    startSetChosenImage: () => dispatch(startSetChosenImage(chosenImage)),
})

export default connect(undefined, mapDispatchToProps)(ImagePanel);
