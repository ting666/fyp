import Web3 from 'web3'

if (window.ethereum) {
    window.web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
    try {
        // Reqeust account access if needed
        window.ethereum.request({ method: "eth_requestAccounts" })
    } catch (err) {
        console.log(err)
    }
} else {
    console.log("Plase install MetaMask")
}

export default web3

// typeof window !== 'undefined' && typeof window.ethereum != 'undefined'