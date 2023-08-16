const Web3 = require('web3');

const input = "0xa9059cbb000000000000000000000000d29d9809dca47c042cf05e81ed89bf3575a19ed20000000000000000000000000000000000000000000000015feb38d41d13ceea" // Example input for a "transfer" function

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

    // Check for swapETHForExactTokens(uint256 amountOut, address[] path, address to, uint256 deadline)
    if (input_data.startsWith('0xfb3bdb41')) {
        const tokenAddress = '0x' + input_data.slice(-40);
        return tokenAddress;
    }

    // Check for swapTokensForExactTokens(uint256 amountOut, uint256 amountInMax, address[] path, address to, uint256 deadline)
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

    // Check for swapExactETHForTokens(uint256 amountOutMin, address[] path, address to, uint256 deadline)
    if (input_data.startsWith("0x7ff36ab5")) {
        const params = Web3.eth.abi.decodeParameters(
            [
                'uint256',
                'address[]',
                'address',
                'uint256'
            ],
            '0x' + input_data.slice(10)
        );

        if (Array.isArray(params['1']) && params['1'].length > 0) {
            const tokenAddress = params['1'][params['1'].length - 1]; // Last address in path
            return tokenAddress;
        } else {
            console.log("Unable to find the token contract address in the given input data");
        }
    }


    //swapExactTokensForTokens(uint256 amountIn, uint256 amountOutMin, address[] path, address to, uint256 deadline)

    if (input_data.startsWith("0x38ed1739")) {

        const params = Web3.eth.abi.decodeParameters(
            [
                'uint256',
                'uint256',
                'address[]',
                'address',
                'uint256'
            ],
            '0x' + input_data.slice(10)
        );

        // params will now contain the values for amountIn, amountOutMin, path, to, and deadline
        const tokenAddress = params[2][params[2].length - 1]; // Last address in path may be the token contract address
        return tokenAddress;
    }

    // Check for swapExactTokensForETH(uint256 amountIn, uint256 amountOutMin, address[] path, address to, uint256 deadline)
    if (input_data.startsWith("0x18cbafe5")) {
        const params = Web3.eth.abi.decodeParameters(
            ['uint256', 'uint256', 'address[]', 'address', 'uint256'],
            '0x' + input_data.slice(10) // Remove the method ID
        );

        // Check if the path array exists and is not empty
        if (params[2] && Array.isArray(params[2]) && params[2].length > 0) {
            const tokenAddress = params[2][0]; // First address in path is the token contract address
            return tokenAddress;
        }
    }

    //check for swap(string aggregatorId, address tokenFrom, uint256 amount, bytes data)
    if (input_data.startsWith("0x5f575529")) {
        const params = Web3.eth.abi.decodeParameters(
            [
                'string',
                'address',
                'uint256',
                'bytes'
            ],
            '0x' + input_data.slice(10) // Remove the method ID
        );

        // params now contain the values for aggregatorId, tokenFrom, amount, and data
        const tokenAddress = params[1];

        return tokenAddress;
    }

    // check for swapExactTokensForTokensSupportingFeeOnTransferTokens(uint256 amountIn, uint256 amountOutMin, address[] path, address to, uint256 deadline)
    if (input_data.startsWith("0x5c11d795")) {
        const params = Web3.eth.abi.decodeParameters(
            ['uint256', 'uint256', 'address[]', 'address', 'uint256'],
            '0x' + input_data.slice(10)
        );

        if (params[2] && Array.isArray(params[2]) && params[2].length > 0) {
            const tokenAddress = params[2][0]; // First address in the path array
            return tokenAddress;
        }
    }


    //check for swapExactTokensForETHSupportingFeeOnTransferTokens(uint256 amountIn, uint256 amountOutMin, address[] path, address to, uint256 deadline)
    if (input_data.startsWith("0x791ac947")) {
        const params = Web3.eth.abi.decodeParameters(
            ['uint256', 'uint256', 'address[]', 'address', 'uint256'],
            '0x' + input_data.slice(10)
        );

        if (params[2] && Array.isArray(params[2]) && params[2].length > 0) {
            const tokenAddress = params[2][0]; // First address in the path array
            return tokenAddress;
        }
    }

    // check for swapExactTempleForStable(uint256 amountIn, uint256 amountOutMin, address stable, address to, uint256 deadline)
    if (input_data.startsWith("0xe94e36b9")) {
        const params = Web3.eth.abi.decodeParameters(
            ['uint256', 'uint256', 'address', 'address', 'uint256'],
            '0x' + input_data.slice(10)
        );

        const tokenAddress = params[2]; // Address of the 'stable' parameter
        return tokenAddress;
    }

    // Check for `transfer(address _to, uint256 _value)`
    // if (input_data.startsWith('0xa9059cbb')) {
    //     const tokenAddress = '0x' + input_data.slice(34, 74);
    //     return tokenAddress;
    // }

    // Check for `setApprovalForAll(address operator, bool authorized)`
    // if (input_data.startsWith('0xa22cbfa3')) {
    //     const tokenAddress = '0x' + input_data.slice(34, 74);
    //     return tokenAddress;
    // }



    // If you have additional function signatures, add them here...

    // If none of the known function signatures are found
    return null;
}

if (tokenAddress) {
    console.log('Token Contract Address:', tokenAddress);
} else {
    console.log('Dependency does not support this transaction');
}


module.exports = {
    decodeInput,
    consoleLogDecodedInput,
    getContractAddress
}