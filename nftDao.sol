 //SPDX-License-Identifier:MIT

pragma solidity 0.8.7;

import "@openzeppelin/contracts/access/Ownable.sol";

interface NFTMarketplace{

  function BuyNft(uint tokenId) external payable;

  function ListItem(uint price ,uint tokenId) external payable ;

  function available(uint _tokenId) external view returns (bool);
 
}


interface TribGnft {

   function balanceOf(address owner) external view returns(uint256);
   function tokenOfOwnerByIndex(address owner, uint256 index) external view returns(uint256) ;
   function ownerOf(uint256 tokenId) external view returns (address) ;
   function approve(address to, uint256 tokenId) external ;
}


contract NFTDao is Ownable{

  enum Vote{
    YAY,
    NAY
   }

 struct Proposal {

    uint nftTokenId;
    uint nftprice; // this is used to sell nft on marketplace. i.e. nft selling price
    uint deadline;
    uint yayVotes;
    uint nayVotes;
    bool executed;
    
 }


  mapping(uint=> Proposal) public proposal;
  mapping (uint => bool) public voters;
  mapping(uint=>mapping(address=>uint)) public Fund;
  mapping(uint=>mapping(address=>bool)) public checkWithdraw; // to prevent reentrancy attack
  uint public totalfund ;
  uint public sendamount;
  uint public numProposals;
 
   NFTMarketplace nftmarketplace;
  
   TribGnft tribgnft;
    
  constructor(address _nftmarketplace, address _tirbeg) payable {
     
    nftmarketplace = NFTMarketplace(_nftmarketplace);
    tribgnft = TribGnft(_tirbeg);

  }

  modifier nftHoldersOnly() {
   
   require(tribgnft.balanceOf(msg.sender)>0 , "You need to have atleast a one nft") ;
   _;
  }
 
 modifier activeProposalOnly(uint proposalId){
  require(proposal[proposalId].deadline > block.timestamp, "Proposal Inactive");
  _;
 }

 function createProposal(uint _nftTokenId , uint _nftprice) external nftHoldersOnly returns(uint){
   require(tribgnft.ownerOf(_nftTokenId)==address(nftmarketplace),"NFT not for sale" );
   numProposals++;
  Proposal storage proposalx =  proposal[numProposals];
  proposalx.nftTokenId = _nftTokenId;
  proposalx.nftprice = _nftprice;
  proposalx.deadline = block.timestamp + 120 minutes;
 
  
  
  return numProposals -1 ;
 }

 function crowdfunding(uint proposalId) public payable nftHoldersOnly activeProposalOnly(proposalId) {

   Fund[proposalId][msg.sender]+=msg.value;
   totalfund +=msg.value;
 
 } 

function voteOnProposal(uint proposalId, Vote vote) external 
nftHoldersOnly activeProposalOnly(proposalId){
  
    Proposal storage proposalx =  proposal[proposalId];
    
    uint voterNFTBalance =  tribgnft.balanceOf(msg.sender);
   
    uint numVotes;
   
   for(uint i=0; i<voterNFTBalance ; ++i){
     
      uint tokenId = tribgnft.tokenOfOwnerByIndex(msg.sender,i);
      if(voters[tokenId]==false) {
                numVotes++;
                voters[tokenId]=true;

      }
   }
    
     require(numVotes >0 , "Already Voted");
        if(vote==Vote.YAY){
        proposalx.yayVotes+=numVotes;
         }else{
         proposalx.nayVotes+=numVotes;         
   }
   
 }


 function executeProposal(uint proposalId, uint price) external payable nftHoldersOnly  {
             Proposal storage proposalx= proposal[proposalId];

             if(proposalx.yayVotes > proposalx.nayVotes) {

                    
                    nftmarketplace.BuyNft{value : price}(proposalx.nftTokenId);
                    tribgnft.approve(address(nftmarketplace),proposalx.nftTokenId);
                    nftmarketplace.ListItem{value: 0.0001 ether }(proposalx.nftprice,proposalx.nftTokenId);

               }                         
      
                    proposalx.executed=true;

            }
  function profitshare(uint proposalId) public payable {
  
     require(!checkWithdraw[proposalId][msg.sender] , "You cannot claim again");
     checkWithdraw[proposalId][msg.sender]=true ;
     sendamount = (Fund[proposalId][msg.sender]*proposal[proposalId].nftprice)/totalfund ;
    payable(msg.sender).transfer(sendamount);
  }
  

   function withdrawEther() external onlyOwner{

                   payable(owner()).transfer(address(this).balance);
         }


         
function onERC721Received(address, address, uint256, bytes calldata) external pure 
returns(bytes4){

return bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"));

}


  


      receive() external payable{} 
      fallback() external payable{}

}
