const input = "0xfb3bdb410000000000000000000000000000000000000000000002f6f10780d22cc000000000000000000000000000000000000000000000000000000000000000000080000000000000000000000000977223ef93b8490e8e6d2dc28567360f489a3ee10000000000000000000000000000000000000000000000000000000060691d920000000000000000000000000000000000000000000000000000000000000002000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc20000000000000000000000009f9c8ec3534c3ce16f928381372bfbfbfb9f4d24" // Example input for a "transfer" function

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

    // Check for `approve(address _spender, uint256 _value)`
    if (input_data.startsWith('0x095ea7b3')) {
        const tokenAddress = '0x' + input_data.slice(34, 74);
        return tokenAddress;
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