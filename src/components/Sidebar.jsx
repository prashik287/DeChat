// Sidebar.jsx
import { useEffect, useState } from "react";
import Web3 from "web3";
import ABI from '../contracts/chat.json';

function Sidebar({ onUserSelect, isOpen, toggleSidebar }) {
  const [contacts, setContacts] = useState([]);
  const [nickname, setNickname] = useState("");
  const [wallet, setWallet] = useState("");
  const contractAddress = "0x2b935658030BDeF6c13A034bB629fdDdd34F6273"

  useEffect(() => {

    const fetchContacts = async () => {
      console.log("Fetching contacts");
      if (window.ethereum) {
        try {
          const web3 = new Web3(window.ethereum);
          
          // Check if MetaMask is connected
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          if (accounts.length === 0) {
            alert("Please connect your MetaMask wallet.");
            return;
          }
    
          const contract = new web3.eth.Contract(ABI, contractAddress);
         
          const rs = await contract.methods.getContacts(accounts[0]).call();
          console.log("Contacts:", rs);
          // Ensure the contact format is correct
          setContacts(rs.map(contact => ({ nickname: contact[0], wallet: contact[1] })));
        } catch (error) {
          console.error("Error fetching contacts:", error);
        }
      }
    };

    fetchContacts();

    // Set up interval to fetch contacts every 3 seconds
    const intervalId = setInterval(fetchContacts, 3000);

    return () => clearInterval(intervalId);
  }, [wallet]);

  const addContact = async (e) => {
    e.preventDefault();
  
    if (nickname && wallet) {
      const web3 = new Web3(window.ethereum);
      if (!web3.utils.isAddress(wallet)) {
        alert("Please enter a valid wallet address.");
        return;
      }
  
      const existingContact = contacts.find(contact => contact.wallet === wallet);
      if (!existingContact) {
        try {
          const response = await window.ethereum.request({ method: 'eth_requestAccounts' });
          setContacts(response);
  
          const contract = new web3.eth.Contract(ABI, contractAddress);
          try {
            const r2 = await contract.methods.addContact(nickname, wallet).send({
              from: response[0],
              gas: 500000
            });
            console.log("Transaction successful:", r2);
          } catch (error) {
            console.error("Transaction failed:", error);
            alert(`Transaction failed: ${error.message}`);
          }
  
          setContacts([...contacts, { nickname, wallet }]);
          setNickname("");
          setWallet("");
        } catch (error) {
          console.error("Error adding contact:", error);
          alert("Failed to add contact. Please try again.");
        }
      } else {
        alert("This wallet address is already added.");
      }
    }
  };

  return (
    <>
      {/* Toggle button for small screens */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden p-2 m-2 bg-blue-600 text-white rounded-md fixed inset-0 z-50"
        aria-label="Toggle Sidebar"
      >
        {isOpen ? "Close Sidebar" : "Open Sidebar"}
      </button>

      {/* Sidebar container */}
      <div
        className={`fixed  top-0 left-0 h-full bg-gray-800 text-white transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 ease-in-out w-64 p-4`}
      >
        <h2 className="text-xl font-bold mb-4">Contacts</h2>

        {/* Add New Contact Form */}
        <form onSubmit={addContact} className="mb-4">
          <input
            type="text"
            placeholder="Nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="w-full p-2 mb-2 rounded bg-gray-700 text-white"
          />
          <input
            type="text"
            placeholder="Wallet Address"
            value={wallet}
            onChange={(e) => setWallet(e.target.value)}
            className="w-full p-2 mb-2 rounded bg-gray-700 text-white"
          />
          <button type="submit" className="bg-green-500 w-full p-2 rounded">
            Add Contact
          </button>
        </form>

        {/* Contacts List */}
        <ul>
          {contacts.map((contact, index) => (
            <li
              key={index}
              onClick={() => onUserSelect(contact)}
              className="mb-2 cursor-pointer p-2 bg-gray-700 rounded hover:bg-gray-600"
            >
              <p className="font-bold">{contact.nickname}</p>
              <p className="text-xs">{`${contact.wallet.slice(0, 6)}...${contact.wallet.slice(-4)}`}</p>

            </li>
          ))}
        </ul>
      </div>

      {/* Overlay for small screens */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black opacity-50 lg:hidden"
        ></div>
      )}
    </>
  );
}

export default Sidebar;