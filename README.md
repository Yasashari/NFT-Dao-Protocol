# NFT-Dao-Protocol


    For educational purpose only, I created this project to improve my skills in web3 development using Solidity, Java Script ,Ether.js,  HTML, CSS.
    If you have a question about something you couldn't understand, or you need a help to fix something, or even you have some additional features 
    please contact me yasashari5@gmail.com
    I'm looking for a real project or a job in a company.

## Guide
    Clone the repo to your pc.
    The smart contract has been used here deoployed on to mumbai testnet. 
    You need to have atleast one TribeG nft to participate DAO event. You can mint TribG nft using this repo.  
    To mint nft ,  you need to have mumbai testnet ether. 

## Why this DAO:

    You guys know some of the nft prices are drastically reduced with time. I mean price may go down beyond the reasonable price. 
    This DAO is aiming to solved that issue. 
    lets think this senario.   Initially NFT markett price is 1 ETH and with the time its price go to 0.1 ETH. 
    Few people gathered and buy that nft and relist 2 ETH. lets think someone buy that nft.
    Once someoney pay 2Eth , then invested people will get their money 
    back with the profit propotional to they invested to buy nft.  
![3](https://user-images.githubusercontent.com/118436384/203768120-572dba9f-ff64-46fe-aa34-a04a6d67859a.PNG)


## How to participate DAO Event :
  
      DAO event is exists only 2 hours period. this 2 hour time period is hardcorded . You can change the timeperiod as you want easily. 
      (for this you need to edit the smart contract)
      You have to hold atleast one TribeG nft to participate dao events.

 ### step 1
 
    Enter the token id which are currenlty listed on nft marketplace and proposed selling price. Then click create proposal button. 
  
 ### step 2
  
    Get the proposal id by clicking check proposal id button. This id is used to voting. 

 ### How to Vote :

    lets think you want to buy proposed nft. then vote 0
    if you do not want to buy it. then vote 1.
    even if you dont have participate crowd funding still you are able to vote.

 ### step 3
    You can send ethers to buy that nft. Enter the proposal id and the amount you are going to send. Then click send button.

 ### step 4
    after 2 hours , you can execute the proposal. if buying vote > dont buying vote , then you can excute the proposal. 
    For that you need to put the proposal id with the current market price of that nft. then click Execute Proposal button.
    Here Dao smart contrat buy proposed nft and relist it. Relisting price is what you set in step 1. 


 ### step 5
    Lets think someone buy that nft. Then participants can get their investment with profits propotional to amount they invest. 

### How to get the your token Id:
    You can get it either using opensea testnet or nftmarketplace repo.
    

## Smart Contract :
    I create this contract from scratch and use Ownable contract from OppenZeppelin.
    Also I use two interface NFTMarketplace and TribGnft. 
        
	
   
