//
//  fileManipulators.js
//  porespy-frontend
//

import moment from 'moment';

// downloads the content passed in, naming the file with the genType and the correct fileType.
const windowDownload = (content, genType, fileType) => {
    const currentTime = moment().format("Y-MM-DD_HH-mm-ss");
    let fileName;
    let url;
    switch (fileType) {
        case "image":
            url = imageBytesToURL(content);
            fileName = `my${genType}_${currentTime}.tif`;
            break;
        case "csv":
            url = csvToURL(content);
            fileName = `my${genType}_${currentTime}.csv`;
            break;
        default:
            break;
    }

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
}

// converts imageBytes into a URL for the DOM to render (hidden from the user).
// useful when needing to convert a Generator/Filter image into a URL for downloading.
const imageBytesToURL = (content) => {
    const byteCharacters = atob(content);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i=0; i < content.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    const url = window.URL.createObjectURL(new Blob([byteArray, { type: 'image/tif' }]));
    return url;
}

// converts csv string into a URL for the DOM to render (hidden from the user).
// useful when needing to convert the csv data from a metrics module into a URL for downloading.
const csvToURL = (content) => {
    const csvContent = `data:text/csv;charset=utf-8,${content}`
    const url = encodeURI(csvContent);
    return url;
}

export { 
    windowDownload 
};
