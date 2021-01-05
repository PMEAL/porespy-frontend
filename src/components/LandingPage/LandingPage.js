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
// import ListSubheader from '@material-ui/core/ListSubheader';
import Collapse from '@material-ui/core/Collapse';

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

import Blobs from '../Generators/Blobs/Blobs';
import LocalThickness from '../Filters/LocalThickness/LocalThickness';
import AboutPage from '../AboutPage/AboutPage';
import ContactPage from '../ContactPage/ContactPage';

import { generatorsNames } from '../../utils/generatorsNames';
import { filtersNames } from '../../utils/filtersNames';

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
        // color: 'darkGrey',
        // fontSize: '10',
    },
    collapseMenu: {
        display: 'flex',
        flexDirection: 'column'
    }
}));

// import this and submodules names from a utils file to clean it up?
const porespyModules = ['Generators', 'Filters', 'Metrics', 'About', 'Contact'];

const LandingPage = () => {
    // useEffect(() => {
    //     console.log(generatorsNames);
    // })

    const [openGenerators, setOpenGenerators] = useState(false);
    const [openFilters, setOpenFilters] = useState(false);
    const [openMetrics, setOpenMetrics] = useState(false);

    const [open, setOpen] = useState(false);
    const [chosenModule, setChosenModule] = useState("Generators");

    const handleClick = (text) => {

        console.log(openGenerators, openFilters, openMetrics);
        // chosenModule state records which module (generators, filters, etc.) is chosen by the user.
        // setChosenModule(text);

        // Switch/Case block checks to see which module is chosen and opens the <Collapse /> component.
        switch (text) {
            case "Generators":
                setOpenGenerators(!openGenerators);
                setOpen(!open);
                break;
            case "Filters":
                setOpenFilters(!openFilters);
                setOpen(!open);
                break; 
            case "Metrics":
                setOpenMetrics(!openMetrics);
                setOpen(!open);
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

        setChosenModule(text);
    };

    const classes = useStyles();
    
    return (
        <div>
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
                                className={classes.root}
                            >
                                {
                                    porespyModules.map((text, index) => (                                        
                                        <div>
                                            <ListItem button onClick={() => handleClick(text)}>
                                                <ListItemText primary={text} />
                                                {(text !== "About" && text !== "Contact") && <KeyboardArrowDownIcon />}
                                            </ListItem>
                                            <Collapse in={(open || openGenerators || openFilters || openMetrics) && chosenModule === text} timeout="auto" unmountOnExit>
                                                <List component="div" disablePadding>
                                                    {
                                                        (text === "Generators") && generatorsNames.map((g) => (
                                                            <ListItem button className={classes.nested}>
                                                                <ListItemText primary={`${g.name}`} />
                                                                <KeyboardArrowDownIcon />
                                                            </ListItem>
                                                        ))
                                                    }
                                                    {
                                                        (text === "Filters") && filtersNames.map((g) => (
                                                            <ListItem button className={classes.nested}>
                                                                <ListItemText primary={`${g.name}`} />
                                                                <KeyboardArrowDownIcon />
                                                            </ListItem>
                                                        ))
                                                    }
                                                    {/*
                                                    <ListItem button className={classes.nested}>
                                                        <ListItemText primary={`${index} -_- ${text}`} />
                                                    </ListItem>
                                                    <ListItem button className={classes.nested}>
                                                        <ListItemText primary={`pitubll`} />
                                                    </ListItem>
                                                    <ListItem button className={classes.nested}>
                                                        <ListItemText primary={`pinkfloyd`} />
                                                    </ListItem>
                                                    */}

                                                </List>

                                                {/*
                                                <List component="div" disablePadding>
                                                    <ListItem button className="collapseMenu">
                                                        (text === "Generators") && generatorsNames.map((g) => (
                                                            <div>
                                                                <List component="nav" disablePadding className="collapseMenuItem">
                                                                    <ListItem button>
                                                                        <ListItemText primary={`${g.name}`} />
                                                                        <KeyboardArrowDownIcon />
                                                                    </ListItem>
                                                                </List>
                                                            </div>
                                                        ))
                                                    {<ListItemText primary={`${index} -_- ${text}`} />}
                                                    </ListItem>
                                                </List>
                                                
                                                */}

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
                            chosenModule === "Contact" && <ContactPage />
                        }

                    </main>
                </div>

            </div>
        </div>
    )
}

export default LandingPage;
