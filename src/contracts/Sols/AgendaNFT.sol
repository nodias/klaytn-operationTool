pragma solidity ^0.5.6;

import "./klaytn-contracts/token/KIP37/KIP37.sol";
import "./klaytn-contracts/token/KIP37/KIP37Burnable.sol";
import "./klaytn-contracts/token/KIP37/KIP37Pausable.sol";
import "./klaytn-contracts/ownership/Ownable.sol";
import "./klaytn-contracts/math/SafeMath.sol";

contract AgendaNFT is Ownable, KIP37, KIP37Burnable, KIP37Pausable {
    using SafeMath for uint256;

    constructor()
        public
        KIP37("https://api.cipher-assembly.com/nfts/brag/agenda/meta/{id}.json")
    {}

    function uri(uint256 _tokenId) external view returns (string memory) {
        uint256 tokenId = _tokenId;
        if (tokenId == 0) {
            return
                "https://api.cipher-assembly.com/nfts/brag/agenda/meta/0.json";
        }

        string
            memory baseURI = "https://api.cipher-assembly.com/nfts/brag/agenda/meta/";
        string memory idstr;

        uint256 temp = tokenId;
        uint256 digits;
        while (temp != 0) {
            digits += 1;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (tokenId != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(tokenId % 10)));
            tokenId /= 10;
        }
        idstr = string(buffer);

        return
            bytes(baseURI).length > 0
                ? string(abi.encodePacked(baseURI, idstr, ".json"))
                : "";
    }

    function mint(uint256 id, uint256 amount) external onlyOwner {
        _mint(msg.sender, id, amount, "");
    }

    function transferMany(address[] calldata tos, uint256[] calldata ids)
        external
    {
        uint256 length = ids.length;
        for (uint256 i = 0; i < length; i = i.add(1)) {
            safeTransferFrom(msg.sender, tos[i], ids[i], 1, "");
        }
    }
}
