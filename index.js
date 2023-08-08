const axios = require('axios');

const url = "https://api.etherscan.io/api?module=account&action=txlist&address=0x2EEA5c2d40143849631DE787cf274b6DFe6A8bBd&startblock=0&endblock=99999999&sort=asc&apikey=YourApiKeyToken";

fetchAndProcessApiResponse(url);

async function fetchAndProcessApiResponse(apiUrl) {
    try {
        const response = await axios.get(apiUrl);
        return decodeInput(response?.data?.result);
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

    console.log(processedResults);
    // return processedResults;

}


function consoleLogDecodedInput() {
    console.log(decodeInput())
}

function getContractAddress(decodedInput, walletAddress) {
    console.log("Pikachu")
    return "contract address will be output from here"
}

module.exports = {
    decodeInput,
    consoleLogDecodedInput,
    getContractAddress,
    fetchAndProcessApiResponse
}