const Web3 = require('web3');
const web3 = new Web3();

const functionNames = [
    "swapETHForExactTokens(uint256,address[],address,uint256)",
    "swapExactETHForTokens(uint256,address[],address,uint256)",
    "swapExactTokensForTokens(uint256,uint256,address[],address,uint256)",
    "swapTokensForExactTokens(uint256,uint256,address[],address,uint256)",
    "swapExactTokensForETH(uint256,uint256,address[],address,uint256)",
    "swap(string,address,uint256,bytes)",
    "swap(uint256)",
    "swapExactTokensForTokensSupportingFeeOnTransferTokens(uint256,uint256,address[],address,uint256)",
    "swapExactTokensForETHSupportingFeeOnTransferTokens(uint256,uint256,address[],address,uint256)",
    "swapExactTempleForStable(uint256,uint256,address,address,uint256)"
];

// const functionNames = [
//     "swapETHForExactTokens(uint256 amountOut, address[] path, address to, uint256 deadline)",
//     "swapExactETHForTokens(uint256 amountOutMin, address[] path, address to, uint256 deadline)",
//     "swapETHForExactTokens(uint256,address[],address,uint256)",
//     "swap(address caller,tuple desc,tuple[] calls)",
//     "swapExactTokensForTokens(uint256 amountIn, uint256 amountOutMin, address[] path, address to, uint256 deadline)",
//     "swapTokensForExactTokens(uint256 amountOut, uint256 amountInMax, address[] path, address to, uint256 deadline)",
//     "swapExactTokensForETH(uint256 amountIn, uint256 amountOutMin, address[] path, address to, uint256 deadline)",
//     "swap(string aggregatorId, address tokenFrom, uint256 amount, bytes data)",
//     "swap(uint256 _tokenId)",
//     "swapExactTokensForTokensSupportingFeeOnTransferTokens(uint256 amountIn, uint256 amountOutMin, address[]path, address to, uint256 deadline) ",
//     "swapExactTokensForETHSupportingFeeOnTransferTokens(uint256 amountIn, uint256 amountOutMin, address[] path, address to, uint256 deadline)",
//     "swapExactTempleForStable(uint256 amountIn, uint256 amountOutMin, address stable, address to, uint256 deadline)",
//     "swapAndStartBridgeTokensViaStargate(tuple _bridgeData,tuple[] _swapData,tuple _stargateData)",
// ];



const inputData = "0x791ac9470000000000000000000000000000000000000000000012e62d3c879d5da38c2700000000000000000000000000000000000000000000000006d82d5f94768a3400000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000977223ef93b8490e8e6d2dc28567360f489a3ee10000000000000000000000000000000000000000000000000000000061859e9b0000000000000000000000000000000000000000000000000000000000000002000000000000000000000000c40af1e4fecfa05ce6bab79dcd8b373d2e436c4e000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";

let isMatched = false;

functionNames.forEach(functionName => {
    if (functionName === "" || functionName.indexOf('(') === -1) {
        console.log(`Skipping ${functionName}`);
        return;
    }

    // Extract types from the function signature
    const types = functionName.split('(')[1].split(')')[0].split(',');

    // Calculate the method ID
    const methodID = web3.utils.sha3(functionName).substring(0, 10);

    // Check if the method ID matches the first 4 bytes of the input data
    if (inputData.startsWith(methodID)) {
        isMatched = true;
        const decoded = web3.eth.abi.decodeParameters(types, inputData.slice(10));
        console.log(`Decoded Parameters for ${functionName}:`, decoded);
    }
});

if (!isMatched) {
    console.log('Method ID does not match for any function');
}
