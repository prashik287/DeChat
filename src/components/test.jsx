import React, { useState } from 'react';
import Web3 from 'web3';
import ABI from '../contracts/abi.json';

function Test() {
  const [message, setMessage] = useState('Devv');

  const handleClick = async () => {
    // Initialize web3 with WebSocket provider
    const web3 = new Web3('ws://127.0.0.1:7545/');
    
    // Set the contract instance
    const contract = new web3.eth.Contract(ABI, "0x5dB4dd6e8dBF10Ba7d46f42b309085c155D37e96");

    try {
      // Use call() for reading state
      const response = await contract.methods.getMessage().call();
      console.log(response);
      setMessage(response);
    } catch (error) {
      console.error('Error fetching message:', error);
    }
  };

  return (
    <div>
      <div className="space-x-2 space-y-4">
        <p>{message}</p>
        <button className="bg-blue-600 p-4" onClick={handleClick}>
          Click Me
        </button>
      </div>
    </div>
  );
}

export default Test;
