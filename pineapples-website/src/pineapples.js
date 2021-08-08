//import { ethers } from "./ethers_5_2.min.js";
//import { MAX_SUPPLY, PINEAPPLES_ADDRESS, PINEAPPLES_ABI } from "./pineapples_abi.js";

const SELECTORS = {
	ALERT: 'alert',
	COMING: 'coming',
	MINT: {
		BUTTON: 'mint-button',
		FORM: 'mint-form',
	},
	PINEAPPLES: {
		REMAINING: 'pineapples-remaining',
		QUANTITY: 'pineapples-quantity',
		PRICE: 'pineapples-price',
	},
	PROGRESS: 'progress',
}
var accounts = []
let provider;
let contract;
let userAccount;
let totalPrice;
let salesOpen;
let totalSupply;
let unitPrice;
let mintQuantity = 0;

function updateProgress(_totalSupply) {
	let progress = 100 * _totalSupply / MAX_SUPPLY;
	document.getElementById(SELECTORS.PROGRESS).style.width = `${progress}%`;
	if (progress >= 25 && !document.querySelector('.dot2').classList.contains('completed')) {
		document.querySelector('.dot2').classList.add('current');
	}
	if (progress >= 50 && !document.querySelector('.dot3').classList.contains('completed')) {
		document.querySelector('.dot3').classList.add('current');
	}
	if (progress >= 75 && !document.querySelector('.dot4').classList.contains('completed')) {
		document.querySelector('.dot4').classList.add('current');
	}
	if (progress >= 100 && !document.querySelector('.dot5').classList.contains('completed')) {
		document.querySelector('.dot5').classList.add('current');
	}
}

async function getAccount() {
	const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
	if ( accounts.length === 0 ) {
		console.log("ERROR: ", error);
		document.getElementById(SELECTORS.ALERT).innerHTML = `<p class="form-control alert-info">Please, <a href="https://metamask.io/download.html" target="_blank" rel="noopener">install MetaMask extention</a> to continue.</p>`;
		return null;
	}
	else if ( accounts[0] !== userAccount ) {
		return accounts[0];
	}
}

async function getSalesState() {
	const result = await contract.saleIsActive();
	salesOpen = result;
	if ( result ) {
		document.getElementById(SELECTORS.MINT.FORM).style.display = 'block';
		document.getElementById(SELECTORS.COMING).style.display = 'none';
		document.getElementById(SELECTORS.MINT.BUTTON).disabled = false;
		getTotalSupply();
	}
	else {
		document.getElementById(SELECTORS.MINT.FORM).style.display = 'none';
		document.getElementById(SELECTORS.COMING).style.display = 'inline';
		document.getElementById(SELECTORS.MINT.BUTTON).disabled = true;
	}
}

async function getTotalSupply() {
	const result = await contract.totalSupply();
	totalSupply = result;
	document.getElementById(SELECTORS.PINEAPPLES.REMAINING).innerText = `${new Intl.NumberFormat().format(MAX_SUPPLY - totalSupply)}`;
	updateProgress(result);
}

async function updatePrice() {
	mintQuantity = parseInt(document.getElementById(SELECTORS.PINEAPPLES.QUANTITY).value, 10);
	if ( mintQuantity < 1 || mintQuantity > 20 ) {
		document.getElementById(SELECTORS.ALERT).innerHTML = `<p class="form-control alert-danger">Please, enter a valid number of pineapples.</p>`;
		document.getElementById(SELECTORS.MINT.BUTTON).disabled = true;
		return false;
	}
	else {
		document.getElementById(SELECTORS.ALERT).innerHTML = "";
		document.getElementById(SELECTORS.MINT.BUTTON).disabled = false;
	}
	const result = await contract.price();
	unitPrice = result;
	totalPrice = unitPrice.mul(mintQuantity);
	document.getElementById(SELECTORS.PINEAPPLES.PRICE).innerHTML = `${ethers.utils.formatUnits(totalPrice)}`;
	return true;
}

async function mintPineapple() {
	let canMint = false;
	document.getElementById(SELECTORS.MINT.BUTTON).disabled = true;
	document.getElementById(SELECTORS.ALERT).innerHTML = `<p class="form-control alert-info">Your transaction is processing, please wait...</p>`;
	userAccount = await getAccount();
	const signer = provider.getSigner();
	const userBalance = await signer.getBalance();
	if ( ethers.utils.formatUnits(userBalance) <= parseFloat(document.getElementById(SELECTORS.PINEAPPLES.PRICE).innerText) ) {
		document.getElementById(SELECTORS.ALERT).innerHTML = `<p class="form-control alert-warning">You don't have enough ETH to get juiced.</p>`;
	}
	else {
		document.getElementById(SELECTORS.ALERT).innerHTML = '';
		canMint = true;
	}
	if ( canMint ) {
		const pineapplesMinter = new ethers.Contract(PINEAPPLES_ADDRESS, JSON.stringify(PINEAPPLES_ABI), signer);
		// Set transaction parameters
		const transactionParameters = {
				from: userAccount
			, value: totalPrice
		};
		return pineapplesMinter.mintPineapple(mintQuantity, transactionParameters);
	}
	return {
		error: "Something went wrong, you cannot complete that transaction."
	}
}

async function startApp() {
	let hasAccountsPermission = null
	try {
		const permissions = await window.ethereum.request( { method: 'wallet_getPermissions' } );
		hasAccountsPermission = permissions.some( p => p.parentCapability === 'eth_accounts' );
	}
	catch ( err ) {
		permissions = null
	}

	if ( hasAccountsPermission !== false ) {
		//assign it to the global variable
		accounts = await window.ethereum.request({ method: 'eth_accounts' });
	}

	contract = new ethers.Contract(PINEAPPLES_ADDRESS, JSON.stringify(PINEAPPLES_ABI), provider);
	contract.on("Transfer", async (from, to, tokenId) => {
		let _from = from.toString().toLowerCase();
		let _to = to.toString().toLowerCase();
		let _userAccount = userAccount.toString().toLowerCase();
		console.log("Transfer From: ", _from);
		console.log("Transfer To: ", _to);
		console.log("User Account: ", _userAccount);
		if ( _from === "0x0000000000000000000000000000000000000000" ) {
			totalSupply ++;
			updateProgress(totalSupply);
			if ( _to === _userAccount ) {
				document.getElementById(SELECTORS.ALERT).innerHTML = `<p class="form-control alert-success">Congratulations! You just got juiced!</p>`;
				document.getElementById(SELECTORS.MINT.BUTTON).disabled = false;
			}
		}
	});
	contract.on("SalesFlipped", async salesState => {
		console.log("SalesFlipped: ", salesState);
		salesOpen = salesState;
	});

	getSalesState();
}

async function init() {
	document.getElementById(SELECTORS.PINEAPPLES.REMAINING).innerHTML = `${new Intl.NumberFormat().format(5000)}`;
	if ( typeof window.ethereum !== 'undefined' ) {
		provider = new ethers.providers.Web3Provider(window.ethereum, "any");
		startApp();
		
		// A Web3Provider wraps a standard Web3 provider, which is what Metamask injects as window.ethereum into each page
		// Force page refreshes on network changes
		provider.on("network", (newNetwork, oldNetwork) => {
			// When a Provider makes its initial connection, it emits a "network"
			// event with a null oldNetwork along with the newNetwork. So, if the
			// oldNetwork exists, it represents a changing network
			if ( oldNetwork ) {
				window.location.reload();
			}
		});
	}
	else {
		document.getElementById(SELECTORS.ALERT).innerHTML = `<p class="form-control alert-info">Please, <a href="https://metamask.io/download.html" target="_blank" rel="noopener">install MetaMask extention</a> to continue.</p>`;
	}

	document.getElementById(SELECTORS.MINT.BUTTON).addEventListener('click', event => {
		let trigger = event.currentTarget;
		let triggerEnabled = !trigger.hasAttribute('disabled');
		if ( triggerEnabled ) {
			updatePrice().then(receipt => {
				if ( receipt ) {
					mintPineapple().then(result => {
						document.getElementById(SELECTORS.MINT.BUTTON).disabled = true;
						document.getElementById(SELECTORS.ALERT).innerHTML = `<p class="form-control alert-info">Transaction pending, please wait...</p>`;
					})
					.catch(error => {
						console.log("ERROR: ", error);
						document.getElementById(SELECTORS.MINT.BUTTON).disabled = false;
						document.getElementById(SELECTORS.ALERT).innerHTML = `<p class="form-control alert-danger">Something went wrong, we couldn't juice you.</p>`;
					});
				}
			});
		}
	});
	document.getElementById(SELECTORS.PINEAPPLES.QUANTITY).addEventListener('change', event => {
		let trigger = event.currentTarget;
		updatePrice();
	});
}
