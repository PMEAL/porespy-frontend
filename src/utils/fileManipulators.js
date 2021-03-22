//
//  fileManipulators.js
//  porespy-frontend
//

import moment from 'moment';

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


    // const byteCharacters = atob(blob);
    // const byteNumbers = new Array(byteCharacters.length);

    // for (let i=0; i < blob.length; i++) {
    //     byteNumbers[i] = byteCharacters.charCodeAt(i);
    // }

    // const byteArray = new Uint8Array(byteNumbers);
    // const url = window.URL.createObjectURL(new Blob([byteArray, { type: 'image/tif' }]));


    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
}

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

const csvToURL = (content) => {
    const csvContent = `data:text/csv;charset=utf-8,${content}`
    const url = encodeURI(csvContent);
    return url;
}

export { 
    windowDownload 
};
