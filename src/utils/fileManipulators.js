//
//  fileManipulators.js
//  porespy-frontend
//

import moment from 'moment';

const windowDownload = (blob) => {
    const byteCharacters = atob(blob);
    const byteNumbers = new Array(byteCharacters.length);
    const currentTime = moment().format("Y-MM-DD_HH-mm-ss");

    for (let i=0; i < blob.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    const url = window.URL.createObjectURL(new Blob([byteArray, { type: 'image/tif' }]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `myBlob_${currentTime}.tif`);
    document.body.appendChild(link);
    link.click();
}

export { 
    windowDownload 
};
