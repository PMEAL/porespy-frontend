import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Collapse from '@material-ui/core/Collapse';

import Blobs from '../Generators/Blobs/Blobs';
import LocalThickness from '../Filters/LocalThickness/LocalThickness';
import AboutPage from '../AboutPage/AboutPage';
import './LandingPage.css';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerContainer: {
        overflow: 'auto',
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        padding: theme.spacing(3),
        paddingLeft: 240,
        width: '100%',
    },
    root: {
        width: '100%',
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

// import this and submodules names from a utils file to clean it up?
const porespyModules = ['Generators', 'Filters', 'Metrics', 'About', 'Contact', 'test'];

const LandingPage = (props) => {
    const [openGenerators, setOpenGenerators] = useState(true);
    const [openFilters, setOpenFilters] = useState(true);
    const [openMetrics, setOpenMetrics] = useState(true);
    // const [openAbout, setOpenAbout] = useState(true);
    // const [openContact, setOpenContact] = useState(true);

    const [open, setOpen] = useState(true);
    const [chosenModule, setChosenModule] = useState("Generators");

    const handleClick = (text) => {
        // chosenModule state records which module (generators, filters, etc.) is chosen by the user.
        setChosenModule(text);

        // Switch/Case block checks to see which module is chosen and opens the <Collapse /> component.
        switch (text) {
            case "Generators":
                setOpenGenerators(!openGenerators);
                setOpen(true);
                break;
            case "Filters":
                setOpenFilters(!openFilters);
                setOpen(true);
                break; 
            case "Metrics":
                setOpenMetrics(!openMetrics);
                setOpen(true);
                break;        
            case "About":
                setOpen(false);
                break; 
            case "Contact":
                setOpen(false);
                break; 
            default:
                break;
        }
    };

    const classes = useStyles();
    
    return (
        <div>
            {/* https://material-ui.com/components/drawers/ */}

            <div>
                {/*
                    <Blobs />
                    <LocalThickness />
                */}
                <div className={classes.root}>
                    <CssBaseline />
                    <AppBar position="fixed" className={classes.appBar}>
                        <Toolbar>
                            <Typography variant="h6" noWrap>
                                Porespy
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Drawer
                        className={classes.drawer}
                        variant="permanent"
                        classes={{
                        paper: classes.drawerPaper,
                        }}
                    >
                        <Toolbar />
                        <div className={classes.drawerContainer}>
                            <List
                                component="nav"
                                aria-labelledby="nested-list-subheader"
                                subheader={
                                    <ListSubheader component="div" id="modules-header">
                                        Modules
                                    </ListSubheader>
                                }
                                className={classes.root}
                            >
                                {
                                    porespyModules.map((text, index) => (
                                        // text gives name, index gives index of element in porespyModules array
                                        
                                        <div>
                                            <ListItem button onClick={() => handleClick(text)}>
                                                <ListItemText primary={text} />
                                                {/*
                                                    open 
                                                    ? 
                                                    <div>&#9660;</div> 
                                                    : 
                                                    <div>&#9650;</div>
                                                */}
                                            </ListItem>
                                            <Collapse in={open && chosenModule === text} timeout="auto" unmountOnExit>
                                                <List component="div" disablePadding>
                                                    <ListItem button className={classes.nested}>
                                                        <ListItemText primary={`${index} -_- ${text}`} />
                                                    </ListItem>
                                                </List>
                                            </Collapse>
                                        </div>
                                    ))
                                }
                            </List>
                            <Divider />
                        </div>
                    </Drawer>

                    <main className={classes.content}>
                        <Toolbar />
                        <div className="title">
                            PoreSpy
                        </div>
                        
                        <div className="description">
                            A python library of image analysis tools used to extract information from 3D images of porous materials
                        </div>

                        <div className="description">
                            Upon landing, here goes a generic landing page message
                        </div>

                        {/*
                            <Blobs />
                        */}

                        {
                            chosenModule === "Generators" && <Blobs />
                        }
                        {
                            chosenModule === "Filters" && <LocalThickness />
                        }
                        {
                            chosenModule === "About" && <AboutPage />
                        }
                        {
                            // chosenModule === "Contact" && <ContactPage />
                        }

                    </main>
                </div>

            </div>
        </div>
    )
}

export default LandingPage;
