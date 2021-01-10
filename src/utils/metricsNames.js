//
//  metricsNames.js
//  porespy-frontend
//

// metricsNames is an array of objects. Each object is has 2 attributes, name and entries.
// Name is a string with the name of the metric function (ex: "Two Point Correlation Fft")
// Entries is an array with the parameters to that metric function (ex: ["im"])
// To convert name in object to python function name, apply this function: .replace(/\s/g, '_').toLowerCase() 

const metricsNames = [
    {
        name: "Chord Counts",
        entries: [
            "im"
        ]
    }, {
        name: "Chord Length Distribution",
        entries: [
            "im",
            "bins",
            "log",
            "voxel_size",
            "normalization"
        ]
    }, {
        name: "Linear Density",
        entries: [
            "im",
            "bins",
            "voxel_size",
            "log"
        ]
    }, {
        name: "Pore Size Distribution",
        entries: [
            "im",
            "bins",
            "log",
            "voxel_size"
        ]
    }, {
        name: "Radial Density",
        entries: [
            "im",
            "bins",
            "voxel_size"
        ]
    }, {
        name: "Porosity",
        entries: [
            "im"
        ]
    }, {
        name: "Porosity Profile",
        entries: [
            "im",
            "axis"
        ]
    }, {
        name: "Representative Elementary Volume",
        entries: [
            "im",
            "npoints"
        ]
    }, {
        name: "Two Point Correlation Brute Force",
        entries: [
            "im",
            "spacing"
        ]
    }, {
        name: "Two Point Correlation Fourier Transform",
        entries: [
            "im"
        ]
    }, {
        name: "Region Surface Areas",
        entries: [
            "regions",
            "area",
            "voxel_size",
            "strel"
        ]
    }, {
        name: "Region Interface Areas",
        entries: [
            "metricEntry1"
        ]
    }, {
        name: "Mesh Surface Area",
        entries: [
            "mesh",
            "verts",
            "faces"
        ]
    }, {
        name: "Phase Fraction",
        entries: [
            "im",
            "normed"
        ]
    }
];

export { metricsNames };
