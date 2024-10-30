const Hello = artifacts.require("Hello"); // Use artifacts.require with the contract name

module.exports = function(deployer) {
    deployer.deploy(Hello, "Hello, World!"); // Pass the constructor argument if needed
};