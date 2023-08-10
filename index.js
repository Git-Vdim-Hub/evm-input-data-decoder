function decodeInput(input_data) {
    const methodId = input_data.slice(0, 10);
    const params = [];

    for (let i = 10; i < input_data.length; i += 64) {
        params.push(input_data.slice(i, i + 64));
    }

    return {
        methodId: methodId,
        params: params
    };
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
    getContractAddress
}