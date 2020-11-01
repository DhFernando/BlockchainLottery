import web3 from './web3'
const address =  // contract address here 
const abi = // your Abi here

export default new web3.eth.Contract(abi , address);