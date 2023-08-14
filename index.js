const Web3 = require('web3');

const input = "0x7ff36ab500000000000000000000000000000000000000000000048fd9b015d231b091770000000000000000000000000000000000000000000000000000000000000080000000000000000000000000977223ef93b8490e8e6d2dc28567360f489a3ee10000000000000000000000000000000000000000000000000000000061b2b7e40000000000000000000000000000000000000000000000000000000000000002000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc200000000000000000000000056a86d648c435dc707c8405b78e2ae8eb4e60ba4" // Example input for a "transfer" function

consoleLogDecodedInput();

const tokenAddress = getContractAddress(input);

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
    console.log(decodeInput(input))
}

function getContractAddress(input_data) {
    let tokenAddress = null;
    // Check for `swapETHForExactTokens`
    if (input_data.startsWith('0xfb3bdb41')) {
        const tokenAddress = '0x' + input_data.slice(-40);
        return tokenAddress;
    }

    // Handle swapTokensForExactTokens
    if (input_data.startsWith("0x8803dbee")) {
        const params = Web3.eth.abi.decodeParameters(
            [
                'uint256', // amountOut
                'uint256', // amountInMax
                'address[]', // path
                'address', // to
                'uint256' // deadline
            ],
            '0x' + input_data.slice(10) // Remove the method ID
        );

        // params will now contain the values for amountOut, amountInMax, path, to, and deadline
        const pathArray = params['2']; // This will give you the array containing the addresses
        const tokenAddress = pathArray[pathArray.length - 1]; // Last address in path may be the token contract address

        if (tokenAddress) {
            return tokenAddress;
        } else {
            console.log("Unable to find the token contract address in the given input data");
            return null;
        }
    }

    // Check for method ID matching swapExactETHForTokens
    if (input_data.startsWith("0x7ff36ab5")) {
        const params = Web3.eth.abi.decodeParameters(
            [
                'uint256',
                'address[]',
                'address',
                'uint256'
            ],
            '0x' + input_data.slice(10) // Remove the method ID
        );

        if (Array.isArray(params['1']) && params['1'].length > 0) {
            const tokenAddress = params['1'][params['1'].length - 1]; // Last address in path
            return tokenAddress;
        } else {
            console.log("Unable to find the token contract address in the given input data");
        }
    }

    // Check for `transfer(address _to, uint256 _value)`
    if (input_data.startsWith('0xa9059cbb')) {
        const tokenAddress = '0x' + input_data.slice(34, 74);
        return tokenAddress;
    }

    // Check for `setApprovalForAll(address operator, bool authorized)`
    if (input_data.startsWith('0xa22cbfa3')) {
        const tokenAddress = '0x' + input_data.slice(34, 74);
        return tokenAddress;
    }




    // If you have additional function signatures, add them here...

    // If none of the known function signatures are found
    return null;
}

if (tokenAddress) {
    console.log('Token Contract Address:', tokenAddress);
} else {
    console.log('Unable to find the token contract address in the given input data');
}


module.exports = {
    decodeInput,
    consoleLogDecodedInput,
    getContractAddress
}