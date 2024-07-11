// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

contract MetaTransaction {
    event MetaTransactionExecuted(
        address userAddress,
        address payable relayerAddress,
        bytes functionSignature
    );

    mapping(address => uint256) public nonces;

    function executeMetaTransaction(
        address userAddress,
        bytes memory functionSignature,
        bytes32 sigR,
        bytes32 sigS,
        uint8 sigV
    ) public payable returns (bytes memory) {
        bytes32 metaTxHash = keccak256(
            abi.encodePacked(
                nonces[userAddress],
                userAddress,
                functionSignature
            )
        );

        require(
            verify(userAddress, metaTxHash, sigR, sigS, sigV),
            "MetaTransaction: signature verification failed"
        );

        // Increment nonce for user (to avoid re-use)
        nonces[userAddress]++;

        // Append userAddress at the end to extract it from calling context
        bytes memory callData = abi.encodePacked(
            functionSignature,
            userAddress
        );

        (bool success, bytes memory returnData) = address(this).call(callData);
        require(success, "MetaTransaction: function call not successful");

        emit MetaTransactionExecuted(
            userAddress,
            payable(msg.sender),
            functionSignature
        );

        return returnData;
    }

    function verify(
        address user,
        bytes32 metaTxHash,
        bytes32 sigR,
        bytes32 sigS,
        uint8 sigV
    ) public view returns (bool) {
        return
            user ==
            ecrecover(toEthSignedMessageHash(metaTxHash), sigV, sigR, sigS);
    }

    function toEthSignedMessageHash(
        bytes32 hash
    ) public pure returns (bytes32) {
        return
            keccak256(
                abi.encodePacked("\x19Ethereum Signed Message:\n32", hash)
            );
    }
}
