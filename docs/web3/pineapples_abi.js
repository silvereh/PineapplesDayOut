const MAX_SUPPLY = 5000;
const PINEAPPLES_ADDRESS = '0x2d491e11b49935255f71ba1195dc916fef3816e5';
// const PINEAPPLES_ADDRESS = "0xad548be055e0b86f1b2a3036387f4378df3fedbb"; // RINKEBY
// const PINEAPPLES_ADDRESS = "0x22e1fe9f1c8642fddabd6eb921211eebf1268bbe"; // ROPSTEN
const PINEAPPLES_ABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "bool",
				"name": "saleIsActive",
				"type": "bool"
			}
		],
		"name": "SalesFlipped",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "getPrice",
		"outputs": [
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
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_numberOfTokens",
				"type": "uint256"
			}
		],
		"name": "mintPineapple",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "price",
		"outputs": [
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
		"name": "saleIsActive",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
];

// export {MAX_SUPPLY, PINEAPPLES_ADDRESS, PINEAPPLES_ABI};
