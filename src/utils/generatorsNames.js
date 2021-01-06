//
//  generatorsNames.js
//  porespy-frontend
//

// generatorsNames is an array of objects. Each object is has 2 attributes, name and entries.
// Name is a string with the name of the generator function (ex: "Blobs")
// Entries is an array with the parameters to that generator function (ex: ["shape", "porosity", "blobiness"])

const generatorsNames = [{
        name: "Blobs",
        entries: [
            "shape",
            "porosity",
            "blobiness"
        ]
    }, {
        name: "Bundle of Tubes",
        entries: [
            "shape",
            "spacing"
        ]
    }, {
        name: "Cylinders",
        entries: [
            "shape",
            "radius",
            "ncylinders",
            "porosity",
            "phi_max",
            "theta_max",
            "length",
            "max_iter"
        ]
    }, {
        name: "Insert Shape",
        entries: [
            "im",
            "element",
            "center",
            "corner",
            "value",
            "mode"
        ]
    }, {
        name: "Lattice Spheres",
        entries: [
            "shape",
            "radius",
            "offset",
            "lattice"
        ]
    }, {
        name: "Line Segment",
        entries: [
            "X0",
            "X1"
        ]
    }, {
        name: "Overlapping Spheres",
        entries: [
            "shape",
            "radius",
            "porosity",
            "iter_max",
            "tol"
        ]
    }, {
        name: "Perlin Noise",
        entries: [
            "shape",
            "porosity",
            "octaves",
            "frequency",
            "persistence"
        ]
    }, {
        name: "Polydisperse Spheres",
        entries: [
            "shape",
            "porosity",
            "dist",
            "nbins",
            "r_min"
        ]
    }, {
        name: "RSA",
        entries: [
            "im",
            "radius",
            "volume_fraction",
            "n_max",
            "mode"
        ]
    }, {
        name: "Voronoi Edges",
        entries: [
            "shape",
            "radius",
            "ncells",
            "flat_faces"
        ]
    }
];

export { generatorsNames };
