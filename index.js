const axios = require('axios');

const url = "https://api.etherscan.io/api?module=account&action=txlist&address=0x2EEA5c2d40143849631DE787cf274b6DFe6A8bBd&startblock=0&endblock=99999999&sort=asc&apikey=YourApiKeyToken";

fetchAndProcessApiResponse(url);

async function fetchAndProcessApiResponse(apiUrl) {
    try {
        const response = await axios.get(apiUrl);
        consoleLogDecodedInput(response?.data?.result);
        getContractAddress(response?.data?.result);
        return response?.data?.result;
    } catch (error) {
        throw new Error('Failed to fetch or process API response: ' + error.message);
    }
}

function decodeInput(resultArray) {

    const processedResults = [];

    for (const obj of resultArray) {
        const inputField = obj.input;
        const methodId = inputField.substring(0, 10);
        const restOfInput = inputField.substring(10);

        const resultItem = [methodId];

        for (let i = 0; i < restOfInput.length; i += 64) {
            resultItem.push(restOfInput.substring(i, i + 64));
        }

        processedResults.push(resultItem);
    }

    return processedResults;

}


function consoleLogDecodedInput(resultArray) {
    console.log(decodeInput(resultArray));
}

function getContractAddress(apiResponseArray) {
    const contractAddresses = [];

    for (const apiResponse of apiResponseArray) {
        const input = apiResponse.input;
        const contractAddressStartIndex = input.lastIndexOf('000000000000000000000000') + '000000000000000000000000'.length;
        const contractAddressHex = input.substring(contractAddressStartIndex, contractAddressStartIndex + 40);
        const contractAddress = '0x' + contractAddressHex;
        contractAddresses.push(contractAddress);
    }

    console.log("CA", contractAddresses);
    return contractAddresses;
}

module.exports = {
    decodeInput,
    consoleLogDecodedInput,
    getContractAddress,
    fetchAndProcessApiResponse
}