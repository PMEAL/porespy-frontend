//
//  networksNames.js
//  porespy-frontend
//

// networksNames is an array of objects. Each object is has 2 attributes, name and entries.
// Name is a string with the name of the network function (ex: "")
// Entries is an array with the parameters to that network function (ex: [""])
// To convert name in object to python function name, apply this function: .replace(/\s/g, '_').toLowerCase() 

const networksNames = [
    {
        name: "network1",
        entries: [
            "networkEntry1"
        ]
    }
];

export { networksNames };
