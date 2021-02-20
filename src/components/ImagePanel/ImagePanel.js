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
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import DeleteIcon from '@material-ui/icons/Delete';
import { windowDownload } from '../../utils/fileManipulators';
import './ImagePanel.css';
import { startDeleteImages } from '../../actions/Generators/GeneratedImages';

let indexToDelete = 0;

const ImagePanel = (props) => {
    const generatedImages = useSelector((state) => (state.generatedImages));

    const deleteImage = (index) => {
        indexToDelete = index;
        props.startDeleteImages(index);
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
                            title={`${index+1}`}
                            actionIcon={
                                <div className={props.classes.imageBarButtons}>
                                    <IconButton aria-label={`info about ${index+1}`} className={props.classes.icon} title="Load image">
                                        <ArrowUpwardIcon onClick={() => console.log("load image here!")}/>
                                    </IconButton>
                                    <IconButton aria-label={`info about ${index+1}`} className={props.classes.icon} title="Download image">
                                        <ArrowDownwardIcon onClick={() => windowDownload(tile.img)}/>
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
    startDeleteImages: () => dispatch(startDeleteImages(indexToDelete))
})

export default connect(undefined, mapDispatchToProps)(ImagePanel);
