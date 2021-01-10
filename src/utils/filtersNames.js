//
//  filtersNames.js
//  porespy-frontend
//

// filtersNames is an array of objects. Each object is has 2 attributes, name and entries.
// Name is a string with the name of the filter function (ex: "Local Thickness")
// Entries is an array with the parameters to that filter function (ex: ["im", "sizes", "mode"])
// To convert name in object to python function name, apply this function: .replace(/\s/g, '_').toLowerCase() 

const filtersNames = [{
        name: "Apply Chords",
        entries: [
            "im",
            "spacing",
            "axis",
            "trim_edges",
            "label"
        ]
    }, {
        name: "Apply Chords 3D",
        entries: [
            "im",
            "spacing",
            "trim_edges"
        ]
    }, {
        name: "Apply Padded",
        entries: [
            "im",
            "pad_width",
            "func",
            "pad_val"
        ]
    }, {
        name: "Chunked Func",
        entries: [
            "func",
            "overlap",
            "divs",
            "cores",
            "im_arg",
            "strel_arg"
        ]
    }, {
        name: "Distance Transform Lin",
        entries: [
            "im",
            "axis",
            "both"
        ]
    }, {
        name: "Fill Blind Pores",
        entries: [
            "im",
            "conn"
        ]
    }, {
        name: "Find Disconnected Voxels",
        entries: [
            "im",
            "conn"
        ]
    }, {
        name: "Find Dt Artifacts",
        entries: [
            "dt"
        ]
    }, {
        name: "Find Peaks",
        entries: [
            "dt",
            "r_max",
            "footprint"
        ]
    }, {
        name: "Flood",
        entries: [
            "im",
            "regions",
            "mode"
        ]
    }, {
        name: "Hold Peaks",
        entries: [
            "im",
            "axis"
        ]
    }, {
        name: "Local Thickness",
        entries: [
            "im",
            "sizes",
            "mode"
        ]
    }, {
        name: "NPhase Border",
        entries: [
            "im",
            "include_diagonals"
        ]
    }, {
        name: "Porosimetry",
        entries: [
            "im",
            "sizes",
            "inlets",
            "access_limited",
            "mode",
            "fft"
        ]
    }, {
        name: "Prune Branches",
        entries: [
            "skel",
            "branch_points",
            "iterations"
        ]
    }, {
        name: "Reduce Peaks",
        entries: [
            "peaks"
        ]
    }, {
        name: "Region Size",
        entries: [
            "im"
        ]
    }, {
        name: "Snow Partitioning",
        entries: [
            "im",
            "dt",
            "r_max",
            "sigma",
            "return_all",
            "mask",
            "randomize"
        ]
    }, {
        name: "Snow Partitioning N",
        entries: [
            "im",
            "r_max",
            "sigma",
            "return_all",
            "mask",
            "randomize",
            "alias"
        ]
    }, {
        name: "Snow Partitioning Parallel",
        entries: [
            "im",
            "overlap",
            "divs",
            "mode",
            "num_workers",
            "crop",
            "zoom_factor",
            "r_max",
            "sigma",
            "return_all"
        ]
    }, {
        name: "Trim Disconnected Blobs",
        entries: [
            "im",
            "inlets",
            "strel"
        ]
    }, {
        name: "Trim Extrema",
        entries: [
            "im",
            "h",
            "mode"
        ]
    }, {
        name: "Trim Floating Solid",
        entries: [
            "im",
            "conn"
        ]
    }, {
        name: "Trim Nonpercolating Paths",
        entries: [
            "im",
            "inlet_axis",
            "outlet_axis",
            "inlets",
            "outlets"
        ]
    }, {
        name: "Trim Nearby Peaks",
        entries: [
            "peaks",
            "dt"
        ]
    }, {
        name: "Trim Saddle Points",
        entries: [
            "peaks",
            "dt",
            "max_iters",
            "verbose"
        ]
    }, {
        name: "Trim Small Clusters",
        entries: [
            "im",
            "size"
        ]
    }
];

export { filtersNames };
