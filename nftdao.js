let provider = new ethers.providers.Web3Provider(window.ethereum);
let signer;

// connect metamask with dapp
async function connectmetamask() {
  // metamask requires reqesting permission to connect users accounts
  await provider.send("eth_requestAccounts", []);
  signer = await provider.getSigner();
  console.log("Account address: ", await signer.getAddress());
}

const nftDaoAddr = "0xd38fBfd84527E0c4A528D2238e573732284580d3";

const nftDaoAbi = [
  "function totalfund() view returns(uint)",
  "function createProposal(uint _nftTokenId , uint _nftprice) external returns(uint)",
  "function crowdfunding(uint proposalId) public payable ",
  "function voteOnProposal(uint proposalId, Vote vote) external ",
  "function executeProposal(uint proposalId, uint price) external payable ",
  "function profitshare(uint proposalId) public payable",
  "function withdrawEther() external ",
  "function numProposals() view returns(uint)",
];

const nftDaoAbiJson = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_nftTokenId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_nftprice",
        type: "uint256",
      },
    ],
    name: "createProposal",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "proposalId",
        type: "uint256",
      },
    ],
    name: "crowdfunding",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "proposalId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    name: "executeProposal",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_nftmarketplace",
        type: "address",
      },
      {
        internalType: "address",
        name: "_tirbeg",
        type: "address",
      },
    ],
    stateMutability: "payable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "proposalId",
        type: "uint256",
      },
    ],
    name: "profitshare",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "fallback",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "proposalId",
        type: "uint256",
      },
      {
        internalType: "enum NFTDao.Vote",
        name: "vote",
        type: "uint8",
      },
    ],
    name: "voteOnProposal",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdrawEther",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "checkWithdraw",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "Fund",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "numProposals",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "onERC721Received",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "proposal",
    outputs: [
      {
        internalType: "uint256",
        name: "nftTokenId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "nftprice",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "yayVotes",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "nayVotes",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "executed",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "sendamount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalfund",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "voters",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const nftDao = new ethers.Contract(nftDaoAddr, nftDaoAbi, provider);

async function check() {
  let x = await nftDao.totalfund();
  console.log(x.toString());
}

async function create_proposal() {
  let id = document.getElementById("input1").value;
  let price = document.getElementById("input2").value;
  let priceinEth = price * 1e18;
  console.log(priceinEth.toString());
  await nftDao.connect(signer).createProposal(id, priceinEth.toString());
}

async function proposalid() {
  let numproposal = await nftDao.numProposals();
  console.log(numproposal.toString());
}

async function proposalmapping() {
  const nftDaoj = new ethers.Contract(nftDaoAddr, nftDaoAbiJson, provider);

  let p = await nftDaoj.proposal(2);
  console.log(p.toString());
}

async function vote() {
  let proposalid = document.getElementById("input3").value;
  let vote = document.getElementById("input4").value;
  const nftDaoj = new ethers.Contract(nftDaoAddr, nftDaoAbiJson, provider);
  await nftDaoj.connect(signer).voteOnProposal(proposalid, vote);
}

async function crowdfund() {
  let proposalid = document.getElementById("input5").value;
  let amount = document.getElementById("input6").value;
  let amountinEth = amount * 1e18;

  await nftDao.connect(signer).crowdfunding(proposalid, { value: amountinEth.toString() });
}

async function execute() {
  let proposalid = document.getElementById("input7").value;
  let price = document.getElementById("input8").value;
  let priceinEth = price * 1e18;
  console.log(proposalid, priceinEth.toString());
  await nftDao.connect(signer).executeProposal(proposalid, priceinEth);
}

async function profit() {
  let proposalid = document.getElementById("input9").value;
  await nftDao.connect(signer).profitshare(proposalid);
}

async function sendEther() {
  await signer.sendTransaction({
    to: "0xd38fBfd84527E0c4A528D2238e573732284580d3",
    value: ethers.utils.parseEther("0.001"),
  });
}
