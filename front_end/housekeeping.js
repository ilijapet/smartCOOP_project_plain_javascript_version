
// Chain list
const NetworkID = {
  1: "MAINNET",
  3: "ROPSTEN",
  4: "RINKEBY",
  5: "GOERLI",
  42: "KOVAN",
  56: "BSC",
  97: "BSC_TESTNET",
  128: "HECO",
  256: "HECO_TESTNET",
  250: "OPERA",
  10: "OPTIMISTIC_ETHEREUM",
  69: "OPTIMISTIC_KOVAN",
  137: "POLYGON",
  1337: "GANACHE",
  80001: "POLYGON_MUMBAI",
  42161: "ARBITRUM_ONE",
}

// Contract address
const SCaddress = "0x623dAcE62F32Ff542cf63441351B6CE098C29D18";

// Contract ABI
const ABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "contractAddress",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "cooperant",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "kilograms",
        "type": "uint256"
      }
    ],
    "name": "DepositFruits",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "NewMember",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "stateMutability": "nonpayable",
    "type": "fallback"
  },
  {
    "inputs": [],
    "name": "becomeCoopMember",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "coopTokenContractAddress",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "cooperants",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "feePayed",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "kg",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_kg",
        "type": "uint256"
      }
    ],
    "name": "depositFruitsToCOOP",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_salje",
        "type": "address"
      }
    ],
    "name": "getUserAccountBalance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "withdraw",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  }
]



const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
const coopContract = new web3.eth.Contract(ABI, SCaddress);
coopContract.setProvider(web3.givenProvider);

