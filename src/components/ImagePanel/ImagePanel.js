//
//  ImagePanel.js
//  porespy-frontend
//

import React from 'react';
import { connect, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import DeleteIcon from '@material-ui/icons/Delete';
import { windowDownload } from '../../utils/fileManipulators';
import './ImagePanel.css';

const ImagePanel = () => {
    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
        },
        drawer: {
            width: 240,
            flexShrink: 0,
        },
        drawerPaper: {
            width: 240
        },
        drawerContainer: {
            overflow: 'auto',
        },
        content: {
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            width: '100%',
        },
        contentOuter: {
            display: 'flex',
            flexDirection: 'row',
            flexGrow: 1,
            padding: theme.spacing(3),
            paddingLeft: 240,
            width: '100%',
        },
        root: {
            width: '100%',
        },
        nested: {
            paddingLeft: theme.spacing(4)
        },
        collapseMenu: {
            display: 'flex',
            flexDirection: 'column'
        }, 
        gridList: {
            display: 'flex',
            flexDirection: 'column',
            maxWidth: 175,
            minHeight: '95%',
            position: 'absolute',
            right: 3,
            top: 64
        },
        icon: {
            color: 'rgba(255, 255, 255, 0.54)',
        },
        imageBarButtons: {
            display: 'flex',
            flexDirection: 'row'
        },
    }));
    
    const generatedImages = useSelector((state) => (state.generatedImages));
    const classes = useStyles();

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
