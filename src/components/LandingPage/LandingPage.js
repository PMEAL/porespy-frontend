//
//  LandingPage.js
//  porespy-frontend
//

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
import Collapse from '@material-ui/core/Collapse';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

// Will probably move these into the abstracted component that renders the component based on the user's selection
import Blobs from '../Generators/Blobs/Blobs';
import LocalThickness from '../Filters/LocalThickness/LocalThickness';
import AboutPage from '../AboutPage/AboutPage';
import ContactPage from '../ContactPage/ContactPage';
import RenderGenerator from '../RenderGenerator/RenderGenerator';
import RenderFilter from '../RenderFilter/RenderFilter';
import RenderMetric from '../RenderMetric/RenderMetric';

import { generatorsNames } from '../../utils/generatorsNames';
import { filtersNames } from '../../utils/filtersNames';
import { metricsNames } from '../../utils/metricsNames';
// import { networksNames } from '../../utils/networksNames';

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
    const [openGenerators, setOpenGenerators] = useState(false);
    const [openFilters, setOpenFilters] = useState(false);
    const [openMetrics, setOpenMetrics] = useState(false);

    const [chosenModule, setChosenModule] = useState("Generators");
    const [chosenGenerator, setChosenGenerator] = useState("Blobs");
    const [chosenFilter, setChosenFilter] = useState("Apply Chords");
    const [chosenMetric, setChosenMetric] = useState("Chord Counts");
    // const [chosenNetwork, setChosenNetwork] = useState(""); // should a default to the chosenNetwork state variable.

    const handleClick = (text) => {        
        // Switch/Case block checks to see which module is chosen and opens the <Collapse /> component.
        switch (text) {
            case "Generators":
                setOpenGenerators(!openGenerators);
                break;
            case "Filters":
                setOpenFilters(!openFilters);
                break; 
            case "Metrics":
                setOpenMetrics(!openMetrics);
                break;
            default:
                break;
        }
        
        // chosenModule state records which module (generators, filters, etc.) is chosen by the user.
        if (text) {
            setChosenModule(text);
        }
    };

    const handleFunctionClick = (text, chosenFunc) => {
        switch (text) {
            case "Generators":
                setChosenGenerator(chosenFunc);
                break;
            case "Filters":
                setChosenFilter(chosenFunc);
                break;
            case "Metrics":
                setChosenMetric(chosenFunc);
                break;
            default:
                break;
        }

        if (text) {
            setChosenModule(text);
        }
    }

    const renderSubMenus = (text, modules) => (
        modules.map((g) => (
            <ListItem button className={classes.nested} onClick={() => handleFunctionClick(text, g.name)}>
                <ListItemText primary={`${g.name}`} />
            </ListItem>
        ))
    )

    const classes = useStyles();
    
    return (
        <div>
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
                                porespyModules.map((text) => (                                        
                                    <div>
                                        <ListItem button onClick={() => handleClick(text)}>
                                            <ListItemText primary={text} />
                                            {(text !== "About" && text !== "Contact") && <KeyboardArrowDownIcon />}
                                        </ListItem>
                                        <Collapse 
                                            in={((text === "Generators" && openGenerators)
                                                || (text === "Filters" && openFilters)
                                                || (text === "Metrics" && openMetrics))} 
                                            timeout="auto" 
                                            unmountOnExit
                                        >
                                            <List component="div" disablePadding>
                                                {(text === "Generators") && renderSubMenus(text, generatorsNames)}
                                                {(text === "Filters") && renderSubMenus(text, filtersNames)}
                                                {(text === "Metrics") && renderSubMenus(text, metricsNames)}
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
                        A python library of image analysis tools used to extract information from 3D images of porous materials. (Maybe change the landing message?)
                    </div>
                    {
                        // TODO: these will probably follow a certain pattern, so make these into a component with 2 props (chosenModule, chosenFunction), then render the component?
                        // chosenModule === "Generators" && chosenGenerator === "Blobs" && <Blobs />
                        chosenModule === "Generators" && <RenderGenerator chosenFunction={chosenGenerator} />
                    }
                    {
                        chosenModule === "Filters" && <RenderFilter chosenFunction={chosenFilter} />
                    }
                    {
                        chosenModule === "Metrics" && <RenderMetric chosenFunction={chosenMetric} />
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
    )
}

export default LandingPage;
