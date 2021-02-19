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

const ImagePanel = ({ classes }) => {
    const generatedImages = useSelector((state) => (state.generatedImages));
    
    return (
        <div>
            <GridList cellHeight={180} className={classes.gridList}>
            {
                generatedImages.map((tile, index) => (
                    <GridListTile cols={2} key={tile.img}>
                        <img 
                            src={`data:image/png;base64,${tile.img}`}
                            alt={index+1}
                        />
                        <GridListTileBar
                            title={`Img${index+1}`}
                            actionIcon={
                                <div className={classes.imageBarButtons}>
                                    <IconButton aria-label={`info about ${index+1}`} className={classes.icon}>
                                        <ArrowUpwardIcon onClick={() => console.log("load image here!")}/>
                                    </IconButton>
                                    <IconButton aria-label={`info about ${index+1}`} className={classes.icon}>
                                        <ArrowDownwardIcon onClick={() => windowDownload(tile.img)}/>
                                    </IconButton>
                                    <IconButton aria-label={`info about ${index+1}`} className={classes.icon}>
                                        <DeleteIcon />
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

export default connect(undefined, undefined)(ImagePanel);
