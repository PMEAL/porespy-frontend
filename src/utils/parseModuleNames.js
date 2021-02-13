//
//  parseModuleNames.js
//  porespy-frontend
//

const parseName = (name) => {
    const nameSplit = name.replace(/_/gm, " ").split(" ");

    for (let i=0; i < nameSplit.length; i++) {
        nameSplit[i] = nameSplit[i][0].toUpperCase() + nameSplit[i].substring(1);
    }

    return nameSplit.join(" ").trim();
}

export { parseName };