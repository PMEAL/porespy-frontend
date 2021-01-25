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
import axios from 'axios';

import { Switch, Route, Link, BrowserRouter } from 'react-router-dom';

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


// How inputs to each generator should look like. Must do shape manually (split into 3: x,y, z.).

/*

'array' = np.array

{'RSA': {'im': {'default': '', 'type': 'array'},
'mode': {'default': '"contained"', 'type': 'str'},
'n_max': {'default': 'null', 'type': 'int'},
'radius': {'default': 'null', 'type': 'int'},
'volume_fraction': {'default': '1', 'type': 'int'}},
'blobs': {'blobiness': {'default': '1', 'type': 'int'},
  'kwargs': {'default': 'null', 'type': 'null'},
  'porosity': {'default': '0.5', 'type': 'float'},
  'shape': {'default': 'null', 'type': 'typing.List[int]'}},
'bundle_of_tubes': {'shape': {'default': 'null', 'type': 'typing.List[int]'},
            'spacing': {'default': 'null', 'type': 'int'}},
'cylinders': {'length': {'default': 'null', 'type': 'float'},
      'max_iter': {'default': '3', 'type': 'int'},
      'ncylinders': {'default': 'null', 'type': 'int'},
      'phi_max': {'default': '0', 'type': 'float'},
      'porosity': {'default': 'null', 'type': 'float'},
      'radius': {'default': 'null', 'type': 'int'},
      'shape': {'default': 'null', 'type': 'typing.List[int]'},
      'theta_max': {'default': '90', 'type': 'float'}},
'insert_shape': {'center': {'default': 'null', 'type': 'null'},
         'corner': {'default': 'null', 'type': 'null'},
         'element': {'default': 'null', 'type': 'null'},
         'im': {'default': 'null', 'type': 'null'},
         'mode': {'default': '"overwrite"', 'type': 'null'},
         'value': {'default': '1', 'type': 'null'}},
'lattice_spheres': {'lattice': {'default': '"sc"', 'type': 'str'},
            'offset': {'default': '0', 'type': 'int'},
            'radius': {'default': 'null', 'type': 'int'},
            'shape': {'default': 'null', 'type': 'typing.List[int]'}},
'line_segment': {'X0': {'default': 'null', 'type': 'null'},
         'X1': {'default': 'null', 'type': 'null'}},
'overlapping_spheres': {'iter_max': {'default': '10', 'type': 'int'},
                'porosity': {'default': 'null', 'type': 'float'},
                'radius': {'default': 'null', 'type': 'int'},
                'shape': {'default': 'null',
                          'type': 'typing.List[int]'},
                'tol': {'default': '0.01', 'type': 'float'}},
'perlin_noise': {'frequency': {'default': '2', 'type': 'typing.List[int]'},
         'octaves': {'default': '3', 'type': 'int'},
         'persistence': {'default': '0.5', 'type': 'float'},
         'porosity': {'default': 'null', 'type': 'null'},
         'shape': {'default': 'null', 'type': 'typing.List[int]'}},
'polydisperse_spheres': {'dist': {'default': 'null', 'type': 'null'},
                 'nbins': {'default': '5', 'type': 'int'},
                 'porosity': {'default': 'null', 'type': 'float'},
                 'r_min': {'default': '5', 'type': 'int'},
                 'shape': {'default': 'null',
                           'type': 'typing.List[int]'}},
'voronoi_edges': {'flat_faces': {'default': 'true', 'type': 'bool'},
          'ncells': {'default': 'null', 'type': 'int'},
          'radius': {'default': 'null', 'type': 'int'},
          'shape': {'default': 'null', 'type': 'typing.List[int]'}}} 
*/



// Width of menu in pixels
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

// porespyModules contains the menu names that are then called with .map() to create on the UI.
const porespyModules = ['Generators', 'Filters', 'Metrics', 'About', 'Contact'];

const LandingPage = ({ page }) => {
    const [openGenerators, setOpenGenerators] = useState(false);
    const [openFilters, setOpenFilters] = useState(false);
    const [openMetrics, setOpenMetrics] = useState(false);

    const [chosenModule, setChosenModule] = useState("Generators");
    const [chosenGenerator, setChosenGenerator] = useState("Blobs");
    const [chosenFilter, setChosenFilter] = useState("Apply Chords");
    const [chosenMetric, setChosenMetric] = useState("Chord Counts");
    const [renderPage, setRenderPage] = useState(page);
    // const [chosenNetwork, setChosenNetwork] = useState(""); // should a default to the chosenNetwork state variable.

    const backendRootEndpoint = "http://localhost:8000/";

    useEffect(() => {
        axios.get(`${backendRootEndpoint}porespyfuncs/1/`)
        .then(({ data: { porespy_funcs } }) => {
            //porespy_funcs will return all of the libraries needed for each generator/filter/metrics.
            // TODO: must add backendRootEndpoint to redux
            console.log(porespy_funcs);
        }).catch((e) => {
            // TODO: better error catching method.
            console.log(e);
        });

    }, []);

    const handleClick = (text) => {        
        // Switch/Case block checks to see which module is chosen and opens the <Collapse /> component by calling setOpenGenerators(), setOpenFilters(), and setOpenMetrics()
        // This block also calls setRenderPage() to render the correct page from the router ("/", "/about", "/contact")
        switch (text) {
            case "Generators":
                setOpenGenerators(!openGenerators);
                setRenderPage("");
                break;
            case "Filters":
                setOpenFilters(!openFilters);
                setRenderPage("");
                break; 
            case "Metrics":
                setOpenMetrics(!openMetrics);
                setRenderPage("");
                break;
            case "About":
                setRenderPage("about");
                break;
            case "Contact":
                setRenderPage("contact");
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

                <BrowserRouter>
                    <Drawer
                        className={classes.drawer}
                        variant="permanent"
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true
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
                                            <ListItem 
                                                button 
                                                key={text} 
                                                component={Link} 
                                                to={text === "About" || text === "Contact" ? `/${text.toLowerCase()}` : `/`} 
                                                onClick={() => handleClick(text)}
                                            >
                                                <ListItemText primary={text} />
                                                {(text !== "About" && text !== "Contact") && <KeyboardArrowDownIcon />}
                                            </ListItem>
                                            <Collapse 
                                                in={((text === "Generators" && openGenerators) || (text === "Filters" && openFilters) || (text === "Metrics" && openMetrics))} 
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
                            Porous Media Image Analysis in Python
                        </div>

                        {/* The following 3 conditional render statements and the <switch></switch> element display the components based on which boolean is true */}
                        {/* Rendering the <AboutPage /> and <ContactPage /> is in the <switch></switch> element to preserve the routing ("/about", "/contact") */}
                        { chosenModule === "Generators" && renderPage === "" && <RenderGenerator chosenFunction={chosenGenerator} />}
                        { chosenModule === "Filters" && renderPage === "" && <RenderFilter chosenFunction={chosenFilter} /> }
                        { chosenModule === "Metrics" && renderPage === "" && <RenderMetric chosenFunction={chosenMetric} /> }                        
                        <Switch>
                            <Route path="/about" render={() => (chosenModule === "About" || renderPage === "about") && <AboutPage />} />
                            <Route path="/contact" render={() => (chosenModule === "Contact" || renderPage === "contact") && <ContactPage />} />
                        </Switch>                        
                    </main>
                </BrowserRouter>
            </div>
        </div>
    )
}

export default LandingPage;
