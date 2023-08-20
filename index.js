const Web3 = require('web3');

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

function consoleLogDecodedInput(input) {
    console.log(decodeInput(input))
}

function getContractAddress(input_data) {

    // Check for swapETHForExactTokens(uint256 amountOut, address[] path, address to, uint256 deadline)
    if (input_data.startsWith('0xfb3bdb41')) {
        const tokenAddress = '0x' + input_data.slice(-40);
        if (tokenAddress) {
            return { "CA": tokenAddress };
        }
        else {
            return "This dependency unable to find the token contract address in the given input data";
        }
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
            return { "CA": tokenAddress };
        } else {
            return "This dependency unable to find the token contract address in the given input data";
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
            return { "CA": tokenAddress };
        } else {
            return "This dependency unable to find the token contract address in the given input data";
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
        if (tokenAddress) {
            return { "CA": tokenAddress };
        } else {
            return "This dependency unable to find the token contract address in the given input data";
        }
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
            if (tokenAddress) {
                return { "CA": tokenAddress };
            } else {
                return "This dependency unable to find the token contract address in the given input data";
            }
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

        if (tokenAddress) {
            return { "CA": tokenAddress };
        } else {
            return "This dependency unable to find the token contract address in the given input data";
        }
    }

    // check for swapExactTokensForTokensSupportingFeeOnTransferTokens(uint256 amountIn, uint256 amountOutMin, address[] path, address to, uint256 deadline)
    if (input_data.startsWith("0x5c11d795")) {
        const params = Web3.eth.abi.decodeParameters(
            ['uint256', 'uint256', 'address[]', 'address', 'uint256'],
            '0x' + input_data.slice(10)
        );

        if (params[2] && Array.isArray(params[2]) && params[2].length > 0) {
            const tokenAddress = params[2][0]; // First address in the path array
            if (tokenAddress) {
                return { "CA": tokenAddress };
            } else {
                return "This dependency unable to find the token contract address in the given input data";
            }
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
            if (tokenAddress) {
                return { "CA": tokenAddress };
            } else {
                return "This dependency unable to find the token contract address in the given input data";
            }
        }
    }

    // check for swapExactTempleForStable(uint256 amountIn, uint256 amountOutMin, address stable, address to, uint256 deadline)
    if (input_data.startsWith("0xe94e36b9")) {
        const params = Web3.eth.abi.decodeParameters(
            ['uint256', 'uint256', 'address', 'address', 'uint256'],
            '0x' + input_data.slice(10)
        );

        const tokenAddress = params[2]; // Address of the 'stable' parameter
        if (tokenAddress) {
            return { "CA": tokenAddress };
        } else {
            return "This dependency unable to find the token contract address in the given input data";
        }
    }

    // If you have additional function signatures, add them here...

    // If none of the known function signatures are found
    return "This dependency unable to find the token contract address in the given input data";
}

function consoleLogGetContractAddress(input) {
    console.log(getContractAddress(input));
}

module.exports = {
    decodeInput,
    consoleLogDecodedInput,
    getContractAddress,
    consoleLogGetContractAddress
}