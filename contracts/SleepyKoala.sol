// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

interface ISleepyKoala is IERC721, IERC721Enumerable {
    function mint(address holder, bool data) external returns (uint256);

    function getTokenData(uint256 tokenId) external view returns (bool);

    function setTokenData(uint256 tokenId, bool data) external returns (bool);

    function invertTokenData(uint256 tokenId) external returns (bool);
}

contract SleepyKoala is ISleepyKoala, ERC721Enumerable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;

    mapping(uint256 => bool) private _tokenData;

    constructor() ERC721("SleepyKoala", "KOL") {}

    function mint(address holder, bool data) public returns (uint256) {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _safeMint(holder, newItemId);
        _setTokenData(newItemId, data);

        return newItemId;
    }

    function _setTokenData(uint256 tokenId, bool data) private {
        _tokenData[tokenId] = data;
    }

    function setTokenData(uint256 tokenId, bool data) external returns (bool) {
        _setTokenData(tokenId, data);
        return data;
    }

    function invertTokenData(uint256 tokenId) external returns (bool) {
        bool data = getTokenData(tokenId);
        bool newData = !data;
        _setTokenData(tokenId, newData);
        return newData;
    }

    function getTokenData(uint256 tokenId) public view returns (bool) {
        return _tokenData[tokenId];
    }
}
