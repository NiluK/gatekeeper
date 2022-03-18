// SPDX-License-Identifier: agpl-3.0
pragma solidity >=0.8.0 <0.9.0;

contract Gatekeeper {
    constructor() {}

    address nftAddress = "0xD90855960eF8276C6361C85EaaEFEa501Ab30c72";

    function allowed(bytes calldata eventData) public view returns (bool) {
        address from = msg.sender;

        // if has access
        return true;
        // TODO does not have access
        // return false
    }
}
