import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import axios from 'axios';
import './LocalThickness.css';

const LocalThickness = () => {
    // These filters are taken from here:
    // https://github.com/PMEAL/porespy/blob/dev/porespy/filters/__funcs__.py
    // These are filters that have "im" as a parameter and remaining parameters have default values.
    
    //  TODO: ask what filters will be actually used?
    const filters = [
        "Trim Small Clusters",
        "Hold Peaks",
        "Distance Transform Lin",
        "Snow Partitioning",
        "Snow Partitioning N",
        "Find Disconnected Voxels",
        "Fill Blind Pores",
        "Trim Floating Solid",
        "Trim Nonpercolating Paths",
        "Trim Extrema",
        "Flood",
        "Region Size",
        "Apply Chords",
        "Apply Chords 3D",
        "Local Thickness",
        "Porosimetry",
        "Trim Disconnected Blobs",
        "NPhase Border",
        "Snow Partitioning Parallel",
        "Chunked Snow",
        "Pad"
    ];

    const handleChange = (e) => {
        // For now, this function displays the chosen Filter value to the console.
        // It is the same as the checkbox label, but the spaces are replaced with empty strings
        console.log(e.target.name);
    }

    // const useStyles = makeStyles((theme) => ({
    //     root: {
    //       display: 'flex',
    //       flexDirection: 'row'
    //     },
    //     formControl: {
    //       margin: theme.spacing(3),
    //     },
    // }));

    // const classes = useStyles();

    return (
        <div>
            <div className="filters">
                <FormControl component="fieldset">
                    <FormLabel component="legend">Filters</FormLabel>
                        <FormGroup>
                            {
                                filters.map((filter) => {
                                    const filterPythonName = filter.replace(/\s/g, '_').toLowerCase();
                                    return (
                                        <FormControlLabel 
                                            control={<Checkbox name={filterPythonName}/>}
                                            label={filter}
                                            onChange={(e) => handleChange(e)}
                                        />
                                    )
                                })
                            }
                        </FormGroup>
                </FormControl>
            </div>
        </div>
    )
}

export default LocalThickness;
