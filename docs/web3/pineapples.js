// import { ethers } from "https://cdn.ethers.io/lib/ethers-5.1.esm.min.js";

window.addEventListener('DOMContentLoaded', () => {
	const MAX_SUPPLY = 5000;
	const PINEAPPLES_ADDRESS = "0xad548be055e0b86f1b2a3036387f4378df3fedbb";
	const PINEAPPLES_ABI = `[
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "_t1",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "_t2",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "_t3",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "_t4",
					"type": "address"
				},
				{
					"internalType": "string",
					"name": "baseURI",
					"type": "string"
				}
			],
			"stateMutability": "nonpayable",
			"type": "constructor"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "address",
					"name": "owner",
					"type": "address"
				},
				{
					"indexed": true,
					"internalType": "address",
					"name": "approved",
					"type": "address"
				},
				{
					"indexed": true,
					"internalType": "uint256",
					"name": "tokenId",
					"type": "uint256"
				}
			],
			"name": "Approval",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "address",
					"name": "owner",
					"type": "address"
				},
				{
					"indexed": true,
					"internalType": "address",
					"name": "operator",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "bool",
					"name": "approved",
					"type": "bool"
				}
			],
			"name": "ApprovalForAll",
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
			"name": "_reserve",
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
					"internalType": "address",
					"name": "_to",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "_numberOfTokens",
					"type": "uint256"
				}
			],
			"name": "airdropPineapple",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "to",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "tokenId",
					"type": "uint256"
				}
			],
			"name": "approve",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "owner",
					"type": "address"
				}
			],
			"name": "balanceOf",
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
			"name": "baseURI",
			"outputs": [
				{
					"internalType": "string",
					"name": "",
					"type": "string"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "flipSaleState",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "tokenId",
					"type": "uint256"
				}
			],
			"name": "getApproved",
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
			"name": "getBaseURI",
			"outputs": [
				{
					"internalType": "string",
					"name": "",
					"type": "string"
				}
			],
			"stateMutability": "view",
			"type": "function"
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
					"internalType": "address",
					"name": "owner",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "operator",
					"type": "address"
				}
			],
			"name": "isApprovedForAll",
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
			"name": "name",
			"outputs": [
				{
					"internalType": "string",
					"name": "",
					"type": "string"
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
			"inputs": [
				{
					"internalType": "uint256",
					"name": "tokenId",
					"type": "uint256"
				}
			],
			"name": "ownerOf",
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
			"name": "renounceOwnership",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "from",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "to",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "tokenId",
					"type": "uint256"
				}
			],
			"name": "safeTransferFrom",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "from",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "to",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "tokenId",
					"type": "uint256"
				},
				{
					"internalType": "bytes",
					"name": "_data",
					"type": "bytes"
				}
			],
			"name": "safeTransferFrom",
			"outputs": [],
			"stateMutability": "nonpayable",
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
			"inputs": [
				{
					"internalType": "address",
					"name": "operator",
					"type": "address"
				},
				{
					"internalType": "bool",
					"name": "approved",
					"type": "bool"
				}
			],
			"name": "setApprovalForAll",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "string",
					"name": "baseURI",
					"type": "string"
				}
			],
			"name": "setBaseURI",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "_newPrice",
					"type": "uint256"
				}
			],
			"name": "setPrice",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "bytes4",
					"name": "interfaceId",
					"type": "bytes4"
				}
			],
			"name": "supportsInterface",
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
			"name": "symbol",
			"outputs": [
				{
					"internalType": "string",
					"name": "",
					"type": "string"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "index",
					"type": "uint256"
				}
			],
			"name": "tokenByIndex",
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
					"internalType": "address",
					"name": "owner",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "index",
					"type": "uint256"
				}
			],
			"name": "tokenOfOwnerByIndex",
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
					"name": "tokenId",
					"type": "uint256"
				}
			],
			"name": "tokenURI",
			"outputs": [
				{
					"internalType": "string",
					"name": "",
					"type": "string"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "_owner",
					"type": "address"
				}
			],
			"name": "tokensOfOwner",
			"outputs": [
				{
					"internalType": "uint256[]",
					"name": "",
					"type": "uint256[]"
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
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "from",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "to",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "tokenId",
					"type": "uint256"
				}
			],
			"name": "transferFrom",
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
					"internalType": "address",
					"name": "_old",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "_new",
					"type": "address"
				}
			],
			"name": "updateAddress",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "withdraw",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		}
	]`;
	// A Web3Provider wraps a standard Web3 provider, which is what Metamask injects as window.ethereum into each page
	const PROVIDER = new ethers.providers.Web3Provider(window.ethereum, "any");
	// Force page refreshes on network changes
	PROVIDER.on("network", (newNetwork, oldNetwork) => {
		// When a Provider makes its initial connection, it emits a "network"
		// event with a null oldNetwork along with the newNetwork. So, if the
		// oldNetwork exists, it represents a changing network
		if (oldNetwork) {
			window.location.reload();
		}
	});
	// The Metamask plugin also allows signing transactions to send ether and pay to change state within the blockchain.
	// For this, you need the account signer...
	const SIGNER = PROVIDER.getSigner();
	const ELMTS = {
		ALERT: document.getElementById('alert'),
		COMING: document.getElementById('coming'),
		MINT: {
			BUTTON: document.getElementById('mint-button'),
			FORM: document.getElementById('mint-form'),
		},
		PINEAPPLES: {
			REMAINING: document.getElementById('pineapples-remaining'),
			QUANTITY: document.getElementById('pineapples-quantity'),
			PRICE: document.getElementById('pineapples-price'),
		}
	}
	let pineapplesContract;
	let pineapplesMinter;
	let userAccount;
	let accountBalance;
	let totalPrice;

	ELMTS.PINEAPPLES.REMAINING.innerHTML = `${new Intl.NumberFormat().format(5000)}`;

	let salesOpen = () => {
		return pineapplesContract.saleIsActive;
	}

	let totalSupply = () => {
		return pineapplesContract.totalSupply();
	}

	let getPrice = () => {
		return pineapplesContract.price;
	}

	let startApp = () => {
		pineapplesContract = new ethers.Contract(PINEAPPLES_ABI, PINEAPPLES_ADDRESS, PROVIDER);

		if (salesOpen()) {
			ELMTS.MINT.FORM.Display = 'block';
			ELMTS.COMING.Display = 'none';
			ELMTS.MINT.BUTTON.Disabled = false;
			ELMTS.PINEAPPLES.REMAINING.innerText = `${new Intl.NumberFormat().format(MAX_SUPPLY - totalSupply())}`;
		}

		let accountInterval = setInterval(() => {
			// Check if account has changed
			SIGNER.getAddress()
				.on('receipt', receipt => {
					if (receipt !== userAccount) {
						userAccount = receipt;
					}
				});

			userAccount.getBalance()
				.on('receipt', receipt => {
					accountBalance = receipt;
				});

			// Refresh pineapples left
			ELMTS.PINEAPPLES.REMAINING.innerText = `${new Intl.NumberFormat().format(MAX_SUPPLY - totalSupply())}`;
			updatePrice();
		}, 100);
	}

	let updatePrice = () => {
		let num = parseInt(ELMTS.PINEAPPLES.QUANTITY.value, 10);
		if (num < 1 || num > 20) {
			ELMTS.ALERT.innerHTML = `<p class="form-control alert-danger">Please, enter a valid number of pineapples.</p>`;
			ELMTS.MINT.BUTTON.Disabled = false;
			return;
		}

		totalPrice = num * getPrice();
		ELMTS.PINEAPPLES.PRICE.innerHTML = `${formatUnits(totalPrice).toPrecision(3)}`;
	}

	let checkBalance = () => {
		return PROVIDER.getBalance(userAccount)
			.on('receipt', receipt => {
				accountBalance = receipt;
				if (formatUnits(accountBalance) <= parseFloat(ELMTS.PINEAPPLES.PRICE.innerText)) {
					ELMTS.MINT.BUTTON.Disabled = true;
					ELMTS.ALERT.innerHTML = `<p class="form-control alert-warning">You don't have enough ETH to get juiced.</p>`;
				}
			});
	}

	let mintPineapples = () => {
		pineapplesMinter = pineapplesContract.connect(SIGNER);
		ELMTS.MINT.BUTTON.Disabled = true;
		ELMTS.ALERT.innerHTML = `<p class="form-control alert-info">Your transaction is processing, please wait...</p>`;
		return pineapplesMinter.mintPineapples(num, value = totalPrice)
			.on('receipt', receipt => {
				ELMTS.MINT.BUTTON.Disabled = false;
				ELMTS.ALERT.innerHTML = `<p class="form-control alert-success">Congratulations! You just got juiced!</p>`;
			})
			.on('error', error => {
				ELMTS.MINT.BUTTON.Disabled = false;
				ELMTS.ALERT.innerHTML = `<p class="form-control alert-danger">Something went wrong, we couldn't juice you.</p>`;
			});
	}

	// if (typeof web3 !== 'undefined') {
	if (typeof window.ethereum === 'undefined') {
		ELMTS.ALERT.innerHTML = `<p class="form-control alert-info">Please, <a href="https://metamask.io/download.html" target="_blank" rel="noopener">install MetaMask extention</a> to continue.</p>`;
	}

	startApp();

	document.addEventListener('click', event => {
		event.preventDefault();
		let target = event.target;
		if (target == ELMTS.MINT.BUTTON) {
			mintPineapples();
		}
	});
	document.addEventListener('change', event => {
		event.preventDefault();
		let target = event.target;
		if (target == ELMTS.PINEAPPLES.QUANTITY) {
			updatePrice();
		}
	});
});