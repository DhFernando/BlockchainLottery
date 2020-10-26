// import Web3 from 'web3';

// // const web3 = new Web3(window.web3.currentProvider)

// let web3;
// if (window.ethereum) {
//     web3 = new Web3(window.ethereum);
//     try { 
//        window.ethereum.enable()
//     } catch(e) {
//        // User has denied account access to DApp...
//     }
//  }
//  // Legacy DApp Browsers
//  else if (window.web3) {
//      web3 = new Web3(web3.currentProvider);
//  }
//  // Non-DApp Browsers
//  else {
//      alert('You have to install MetaMask !');
//  }
 
//  export default web3;


import Web3 from 'web3'

    const provider = new Web3.providers.HttpProvider('http://localhost:7545')
    // const web3 = new Web3(provider || Web3.givenProvider); 
    // window.ethereum.enable()


const web3 = new Web3(window.ethereum || provider)
    window.ethereum.enable().catch(error => {
        // User denied account access
        console.log(error)
    })
    
export default web3 