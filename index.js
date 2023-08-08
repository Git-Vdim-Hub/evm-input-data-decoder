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

const input_data = "Oxfb3bdb41000000000000000000000000000000000000000000000000000002ba7def30000000000000000000000000000000000000000000000000000000000000000080000000000000000000000000977223ef93b8490e8e6d2dc28567360f489a3ee10000000000000000000000000000000000000000000000000000000060172bfa0000000000000000000000000000000000000000000000000000000000000002000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc20000000000000000000000001f6bd8766f8a8aa58f7441c8dd3709afa3a56202";

const result = decodeInput(input_data);
console.log(result);

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