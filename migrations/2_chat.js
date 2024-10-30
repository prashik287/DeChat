const Chat = artifacts.require("Chat"); // Use artifacts.require with the contract name

module.exports = function(deployer) {
    deployer.deploy(Chat, "Hello, World!"); // Pass the constructor argument if needed
};

// Note: This script is only meant for deploying the contract.