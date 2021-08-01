// SPDX-License-Identifier: MIT
pragma solidity 0.7.6;
import "./Ownable.sol";
import "./ERC721.sol";

/**
* @dev Contract module defining the Pineapples Day Out ERC721 NFT Token.
* There is a total supply of 5,000 pineapples to be minted, each pineapple cost .02 ETH.
* 120 of the pineapples are reserved for presale and promo purposes.
*/
contract PineapplesDayOut is ERC721, Ownable {
  using Strings for uint256;

  string _baseTokenURI;
  uint256 public price = 20000000000000000;   // .02 ETH
  bool public saleIsActive = false;
  // Reserve 120 Pineapples for team - Giveaways/Prizes/Presales etc
  uint public _reserve = 116;
  
  mapping (string => address) public team;
  
  constructor(address _t1, address _t2, address _t3, address _t4, string memory baseURI) ERC721("PineapplesDayOut", "PDO") {
    setBaseURI(baseURI);

    team["Alina#4526"] = _t1;
    team["vandemlau#0301"] = _t2;
    team["kashushu"] = _t3;
    team["PineappleHead#4535"] = _t4;

    // team gets the first 4 pineapples
    _safeMint( team["Alina#4526"], 0);
    _safeMint( team["vandemlau#0301"], 1);
    _safeMint( team["kashushu"], 2);
    _safeMint( team["PineappleHead#4535"], 3);
  }
  /** 
   * Mint a number of tigers straight in target wallet.
   * @param _to: The target wallet address, make sure it's the correct wallet.
   * @param _numberOfTokens: The number of tokens to mint.
   * @dev This function can only be called by the contract owner as it is a free mint.
   */
  function airdropPineapple(address _to, uint _numberOfTokens) public onlyOwner {
    require(_numberOfTokens <= _reserve, "Not enough Pineapples left in reserve");
    uint totalSupply = totalSupply();
    require(totalSupply + _numberOfTokens < 5001, "Purchase would exceed max supply of Pineapples");
    for(uint i = 0; i < _numberOfTokens; i++) {
      uint mintIndex = totalSupply + i;
      _safeMint(_to, mintIndex);
    }
    _reserve -= _numberOfTokens;
  }
  /** 
   * Mint a number of tigers straight in the caller's wallet.
   * @param _numberOfTokens: The number of tokens to mint.
   */
  function mintPineapple(uint _numberOfTokens) public payable {
    require(saleIsActive, "Sale must be active to mint a Pineapple");
    require(_numberOfTokens < 21, "Can only mint 20 tokens at a time");
    uint totalSupply = totalSupply();
    require(totalSupply + _numberOfTokens + _reserve < 5001, "Purchase would exceed max supply of Pineapples");
    require(msg.value >= price * _numberOfTokens, "Ether value sent is not correct");
    for(uint i = 0; i < _numberOfTokens; i++) {
      uint mintIndex = totalSupply + i;
      _safeMint(msg.sender, mintIndex);
    }
  }
  function flipSaleState() public onlyOwner {
    saleIsActive = !saleIsActive;
    emit SalesFlipped(saleIsActive);
  }
  function setBaseURI(string memory baseURI) public onlyOwner {
    _baseTokenURI = baseURI;
  }
  // Might wanna adjust price later on.
  function setPrice(uint256 _newPrice) public onlyOwner() {
    price = _newPrice;
  }
  function withdraw() public onlyOwner {
    uint balance = address(this).balance / 10;
    uint _remains = address(this).balance - balance;
    uint _each = _remains / 4;
    require(payable(team["Alina#4526"]).send(_each));
    require(payable(team["vandemlau#0301"]).send(_each));
    require(payable(team["kashushu"]).send(_each));
    require(payable(team["PineappleHead#4535"]).send(_each));
    msg.sender.transfer(balance);
  }
  function updateAddress(string memory _id, address _new) public onlyOwner() {
    team[_id] = _new;
  }
  function getBaseURI() public view returns(string memory) {
    return _baseTokenURI;
  }
  function getPrice() public view returns(uint256){
    return price;
  }
  function tokenURI(uint256 tokenId) public override view returns(string memory) {
    return string(abi.encodePacked(_baseTokenURI, tokenId.toString()));
  }
  function tokensOfOwner(address _owner) external view returns(uint256[] memory ) {
    uint256 tokenCount = balanceOf(_owner);
    if (tokenCount == 0) {
      // Return an empty array
      return new uint256[](0);
    } else {
      uint256[] memory result = new uint256[](tokenCount);
      for (uint i = 0; i < tokenCount; i++) {
        result[i] = tokenOfOwnerByIndex(_owner, i);
      }
      return result;
    }
  }
  /**
    * @dev Emitted when `saleIsActive` switches.
    */
  event SalesFlipped(bool saleIsActive);
}
