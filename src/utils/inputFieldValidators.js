//
//  inputFieldValidators.js
//  porespy-frontend
//

// Validates if an input field (in MaterialUI's case, a <TextField />) only contains an integer
const integerOnlyField = (e) => {
    const regExp = /[^0-9]/g;
    const integersOnly = e.target.value.replace(regExp, '');
    e.target.value = integersOnly;
    return integersOnly;
}

// Validates if an input field (in MaterialUI's case, a <TextField />) only contains an integer between 0 and 1
const floatOnlyBetweenOneAndZeroField = (e) => {
    const regExpFullDecimal = /^(?:[0](?:\.\d+)?|1(?:\.0+)?)$/g;
    const regExpZeroOrOne = /^[0]\.$/g;
    const regExpDefault = /[^0-1]/g;

    let floatsOnly = "";
    if (regExpFullDecimal.test(e.target.value) || regExpZeroOrOne.test(e.target.value)) {
        floatsOnly = e.target.value;
    } else if (regExpDefault.test(e.target.value)) {
        floatsOnly = e.target.value.slice(0, -1);
    }

    e.target.value = floatsOnly;
    return floatsOnly;
}

export { integerOnlyField, floatOnlyBetweenOneAndZeroField };