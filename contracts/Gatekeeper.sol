// SPDX-License-Identifier: agpl-3.0
pragma solidity >=0.8.0 <0.9.0;

import "./SleepyKoala.sol";

contract Gatekeeper {
    ISleepyKoala immutable NFT;

    constructor(ISleepyKoala nft) {
        NFT = nft;
    }

    function isAllowed(bytes calldata eventData) public view returns (bool) {
        address from = msg.sender;

        // we are assuming sender just has 1 of the nft
        uint256 tokenForOwner = NFT.tokenOfOwnerByIndex(from, 0);
        bool tokenData = NFT.getTokenData(tokenForOwner);
        return tokenData;
    }
}
