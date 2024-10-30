import React, { useEffect, useState } from 'react';
import { BrowserProvider } from 'ethers';
import ABI from '../contracts/chat.json';
import Web3 from 'web3';


function Navbar() {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState("");
  const contractAddress = "0xd97ED268e8ee7B0b6b104299166325720dFd2B9c";

  const connect = async () => {
    try {
      const provider = new BrowserProvider(window.ethereum);
      let accounts = await provider.send("eth_requestAccounts", []);
      
      const web3 = new Web3('ws://127.0.0.1:7545/');
      const contract = new web3.eth.Contract(ABI, contractAddress);

      await contract.methods.registerUser("User").send({ from: accounts[0] });
      const add1 = accounts[0];
      const add2 = `${add1.slice(0, 6)}...${add1.slice(-4)}`;
      setIsConnected(true);
      setAddress(add2);
    } catch (err) {
      console.error("Failed to connect to Metamask:", err);
    }
  }

  useEffect(() => {
    const setSession = async () => {
      const provider = new BrowserProvider(window.ethereum);
      let accounts = await provider.send("eth_requestAccounts", []);
      const add1 = accounts[0];
      const add2 = `${add1.slice(0, 6)}...${add1.slice(-4)}`;
      setIsConnected(true);
      setAddress(add2);
    };

    setSession();
    const intervalId = setInterval(setSession, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className='fixed top-0 bg-blue-600 w-full  left-0 h-20 flex justify-end items-center p-2'>
      {
        isConnected ? (
          <button type="button" className='bg-black p-4'>{address}</button>
        ) : (
          <button type="button" className='bg-black p-4' onClick={connect}>Connect</button>
        )
      }
    </div>
  );
}

export default Navbar;
