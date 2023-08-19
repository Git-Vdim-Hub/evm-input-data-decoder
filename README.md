# Evm-Input-Data-Decoder

This npm package helps decode Ethereum transaction input data and extracts token contract addresses from well-known function signatures. The library uses Web3.js under the hood, allowing users to interpret the ABI-encoded data to make sense of contract interactions.


## Features

- Decode Input: Extracts method id and parameters from ABI encoded data.
- Get Contract Address: Identifies and extracts the token contract address from a variety of well-known function signatures.



## Installation

Install evm-input-data-decoder with npm

```bash
  npm install evm-input-data-decoder --save
```

## Usage/Examples

```javascript
//Initialize
const Web3 = require('web3');

//input data you want to decode
const input = "0x7ff36ab5000000000000000000000000000000000000000000002d7c2e7091125587a8df0000000000000000000000000000000000000000000000000000000000000080000000000000000000000000977223ef93b8490e8e6d2dc28567360f489a3ee100000000000000000000000000000000000000000000000000000000601892860000000000000000000000000000000000000000000000000000000000000002000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc20000000000000000000000003affcca64c2a6f4e3b6bd9c64cd2c969efd1ecbe" // Example input for a "transfer" function

// Decode Input Data
consoleLogDecodedInput()

// Get Contract Address
consoleLogGetContractAddress()

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
            '0x' + input_data.slice(10)
        );
        const pathArray = params['2']; 
        const tokenAddress = pathArray[pathArray.length - 1];
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
            const tokenAddress = params['1'][params['1'].length - 1]; 
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
        const tokenAddress = params[2][params[2].length - 1];
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
            '0x' + input_data.slice(10) 
        );

        if (params[2] && Array.isArray(params[2]) && params[2].length > 0) {
            const tokenAddress = params[2][0]; 
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
            '0x' + input_data.slice(10)
        );
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
            const tokenAddress = params[2][0];
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
            const tokenAddress = params[2][0];
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

        const tokenAddress = params[2];
        if (tokenAddress) {
            return { "CA": tokenAddress };
        } else {
            return "This dependency unable to find the token contract address in the given input data";
        }
    }
    return "This dependency unable to find the token contract address in the given input data";
}

function consoleLogGetContractAddress() {
    console.log(getContractAddress(input));
}

module.exports = {
    decodeInput,
    consoleLogDecodedInput,
    getContractAddress,
    consoleLogGetContractAddress
}

```
## Appendix

This section provides a detailed breakdown of the main functions and utility functions available in the package.

#### `decodeInput(input_data)`
Purpose:

To decode Ethereum transaction input data.

Parameters:

input_data (String): The ABI encoded input data from a transaction.

Returns:

An object containing:
methodId: A string representing the first 10 characters of the input data which usually represents the function signature.

params: An array containing parameters that have been extracted from the input data.

#### `getContractAddress(input_data)`
Purpose:

To identify and extract the token contract address from well-known function signatures within the provided ABI encoded data. 

Parameters:

input_data (String): The ABI encoded input data from a transaction.

Returns:

One of the following:
An object with a single key, "CA", that maps to the token contract address in the format "0x...token address...".

An error message stating the inability of the dependency to find the token contract address in the given input data.

### Utility Functions:
#### `consoleLogDecodedInput()`
Purpose:

To decode the ABI encoded input data and print the results to the console.

Usage:

Call the function directly without any parameters to see the decoded input printed to the console.
#### `consoleLogGetContractAddress()`
Purpose:

To decode the ABI encoded input data to identify and extract the token contract address and then print either the address or an error message to the console.

Usage:

Call the function directly without any parameters to see the extracted token contract address or the relevant error message printed to the console.

## Contributing

Contributions are always welcome!

## License

[MIT](https://choosealicense.com/licenses/mit/)


## Disclaimer

Please make sure to test this library extensively before using it in a production environment. Ensure the decoded data and extracted addresses align with your expectations.