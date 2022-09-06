import React, { useState, useEffect } from 'react';
let Web3 = require("web3");
const alchemyapi_url = "https://eth-rinkeby.alchemyapi.io/v2/1YRsY55AxFPKvZt7ekvgBg-yywM9g1TU";
const infuraapi_url = "https://rinkeby.infura.io/v3/4521b5a40d0d45428de0b40fca371a2b";
var web3 = new Web3(infuraapi_url);

const ABI = `[
	{
		"inputs": [],
		"name": "get",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "myVar",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_newVar",
				"type": "uint256"
			}
		],
		"name": "set",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]`;

const Bytecode = "608060405234801561001057600080fd5b5061017f806100206000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c806360fe47b1146100465780636d4ce63c14610062578063c6b9154014610080575b600080fd5b610060600480360381019061005b91906100cc565b61009e565b005b61006a6100a8565b6040516100779190610108565b60405180910390f35b6100886100b1565b6040516100959190610108565b60405180910390f35b8060008190555050565b60008054905090565b60005481565b6000813590506100c681610132565b92915050565b6000602082840312156100e2576100e161012d565b5b60006100f0848285016100b7565b91505092915050565b61010281610123565b82525050565b600060208201905061011d60008301846100f9565b92915050565b6000819050919050565b600080fd5b61013b81610123565b811461014657600080fd5b5056fea2646970667358221220e714859b151f37e92977950a65fe3d635dbfc34f2a30541c045cffdf27106c9464736f6c63430008070033";

function App() {

  const [message, setMessage] = useState("Click The Deploy Button!");

  const handleDeploy1 = async () => {

    const now_user = await window.ethereum
      .request({ method: "eth_requestAccounts" })
      .catch((err) => {
        console.error(err);
      });

    try {
      const contract = await new web3.eth.Contract(JSON.parse(ABI))
        .deploy({
          data: Bytecode,
          arguments: [0] // Constructor Arguments
        })
        .send({ from: now_user[0] });
      setMessage("✅ - Check your transaction on https://rinkeby.etherscan.io/tx/" + contract);
    } catch (error) {
      setMessage("😥 - Something wrong: " + error.message);
    }
  };

  const handleDeploy2 = async () => {

    const now_user = await window.ethereum
      .request({ method: "eth_requestAccounts" })
      .catch((err) => {
        console.error(err);
      });

    try {
      const contract = await new web3.eth.sendTransaction({
        from: now_user[0],
        data: Bytecode,
      });
      setMessage("✅ - Check your transaction on https://rinkeby.etherscan.io/tx/" + contract);

    } catch (error) {
      setMessage("😥 - Something wrong: " + error.message);
    }
  };

  const handleDeploy3 = async () => {
    const now_user = await window.ethereum
      .request({ method: "eth_requestAccounts" })
      .catch((err) => {
        console.error(err);
      });

    const contractInstance = new web3.eth.Contract(JSON.parse(ABI));
    const deployTxObject = contractInstance.deploy({
      data: Bytecode,
      arguments: [0],
    });
    const transactionParameters = {
      from: now_user[0],
      data: deployTxObject.encodeABI(), 
    };

    try {
      const createTransaction = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionParameters],
      });
      setMessage("✅ - Check your transaction on https://rinkeby.etherscan.io/tx/" + createTransaction);
    } catch (error) {
      setMessage("😥 - Something wrong: " + error.message);
    }
  };

  const handleDeploy4 = async () => {
    const now_user = await window.ethereum
      .request({ method: "eth_requestAccounts" })
      .catch((err) => {
        console.error(err);
      });
    
    web3 = new Web3(window.web3.currentProvider);
    console.log(window.web3.currentProvider);
    // web3 = new Web3(window.ethereum);

    try {
      const contract = await new web3.eth.Contract(JSON.parse(ABI))
        .deploy({
          data: Bytecode,
          arguments: [0] // Constructor Arguments
        })
        .send({ from: now_user[0] });

      console.log(contract);
      setMessage("✅ - View your Contract on https://rinkeby.etherscan.io/address/" + contract._address);
    } catch (error) {
      setMessage("😥 - Something wrong: " + error.message);
    }
  };

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: "black"
    }}>
      <button onClick={() => handleDeploy4()}> Deploy</button>
      <p style={{
        color: 'white'
      }}>{message}</p>
    </div>
  );
}

export default App;
