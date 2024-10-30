// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Chat {
    struct Message {
        string content;
        address sender;
        address receiver;
    }

    struct Contacts {
        string nickname;
        address contactAdd;
    }

    // Mapping address to message for separate inbox for every user
    mapping(address => Message[]) private inbox;

    // Mapping address to contact for separate contact list for every user
    mapping(address => Contacts[]) private contactList;

    // Send message
    function sendMessage(address _receiver, string memory _content) public {
        Message memory message = Message({
            content: _content,
            sender: msg.sender, // Use msg.sender instead of _sender
            receiver: _receiver
        });
        inbox[_receiver].push(message);
    }

    // Get all user messages
    function getMessages() public view returns (Message[] memory) {
        return inbox[msg.sender];
    }

    // Get messages filtered by sender
    function getMessagesFromSender(address _sender) public view returns (Message[] memory) {
        Message[] memory allMsg = inbox[msg.sender];
        uint256 count = 0;

        // Count messages from the specified sender
        for (uint256 i = 0; i < allMsg.length; i++) {
            if (allMsg[i].sender == _sender) {
                count++;
            }
        }

        // Create an array to hold messages from the sender
        Message[] memory messagesFromSender = new Message[](count);
        uint256 index = 0;

        // Populate the array with messages from the specified sender
        for (uint256 i = 0; i < allMsg.length; i++) {
            if (allMsg[i].sender == _sender) {
                messagesFromSender[index] = allMsg[i];
                index++;
            }
        }

        return messagesFromSender;
    }

    // Add new contact
    function addContact(string memory _nickname, address _contactAdd) public {
        // Ensure the contact is not already in the contact list
        for (uint256 i = 0; i < contactList[msg.sender].length; i++) {
            require(contactList[msg.sender][i].contactAdd != _contactAdd, "Contact already exists");
        }

        // Add the new contact
        contactList[msg.sender].push(Contacts({
            nickname: _nickname,
            contactAdd: _contactAdd
        }));
    }

    // Get contacts for the caller
    function getContacts(address _user) public view returns (Contacts[] memory) {
        return contactList[_user];
    }
}
