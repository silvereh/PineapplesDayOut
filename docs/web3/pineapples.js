import { ethers } from "./ethers_5_2.min.js";
import { MAX_SUPPLY, PINEAPPLES_ADDRESS, PINEAPPLES_ABI } from "./pineapples_abi.js";

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
	}
}
let pineapplesContract;
let pineapplesMinter;
let userAccount;
let accountBalance;
let totalPrice;
let provider;
let signer;
let salesOpen;
let totalSupply;
let unitPrice;

let getSalesState = () => {
	return pineapplesContract.saleIsActive()
		.then(result => {
			console.log("SalesOpen: ", result);
			salesOpen = result;

			if (result) {
				document.getElementById(SELECTORS.MINT.FORM).style.display = 'block';
				document.getElementById(SELECTORS.COMING).style.display = 'none';
				document.getElementById(SELECTORS.MINT.BUTTON).Disabled = false;

				getTotalSupply();
			}
		});
}

let getTotalSupply = () => {
	return pineapplesContract.totalSupply()
		.then(result => {
			console.log("TotalSupply: ", result);
			totalSupply = result;
			document.getElementById(SELECTORS.PINEAPPLES.REMAINING).innerText = `${new Intl.NumberFormat().format(MAX_SUPPLY - totalSupply)}`;
		});
}

let getPrice = () => {
	return pineapplesContract.price()
		.then(result => {
			console.log("UnitPrice: ", result);
			unitPrice = result;
			totalPrice = num * unitPrice;
		document.getElementById(SELECTORS.PINEAPPLES.PRICE).innerHTML = `${formatUnits(totalPrice).toPrecision(3)}`;
	});
}

let updatePrice = () => {
	let num = parseInt(document.getElementById(SELECTORS.PINEAPPLES.QUANTITY).value, 10);
	if (num < 1 || num > 20) {
		document.getElementById(SELECTORS.ALERT).innerHTML = `<p class="form-control alert-danger">Please, enter a valid number of pineapples.</p>`;
		document.getElementById(SELECTORS.MINT.BUTTON).Disabled = false;
		return;
	}
}

let checkBalance = () => {
	return provider.getBalance(userAccount)
		.then(receipt => {
			accountBalance = receipt;
			console.log("AccountBalance: ", accountBalance);
			if (formatUnits(accountBalance) <= parseFloat(document.getElementById(SELECTORS.PINEAPPLES.PRICE).innerText)) {
				document.getElementById(SELECTORS.MINT.BUTTON).Disabled = true;
				document.getElementById(SELECTORS.ALERT).innerHTML = `<p class="form-control alert-warning">You don't have enough ETH to get juiced.</p>`;
			}
		});
}

let mintPineapples = () => {
	pineapplesMinter = pineapplesContract.connect(signer);
	document.getElementById(SELECTORS.MINT.BUTTON).Disabled = true;
	document.getElementById(SELECTORS.ALERT).innerHTML = `<p class="form-control alert-info">Your transaction is processing, please wait...</p>`;
	return pineapplesMinter.mintPineapples(num, value = totalPrice)
		.then(receipt => {
			document.getElementById(SELECTORS.MINT.BUTTON).Disabled = false;
			document.getElementById(SELECTORS.ALERT).innerHTML = `<p class="form-control alert-success">Congratulations! You just got juiced!</p>`;
		})
		.catch(error => {
			document.getElementById(SELECTORS.MINT.BUTTON).Disabled = false;
			document.getElementById(SELECTORS.ALERT).innerHTML = `<p class="form-control alert-danger">Something went wrong, we couldn't juice you.</p>`;
		});
}

let startApp = () => {
	pineapplesContract = new ethers.Contract(PINEAPPLES_ADDRESS, JSON.stringify(PINEAPPLES_ABI), provider);

	let accountInterval = setInterval(() => {
		getSalesState();
	}, 1000);
}

window.addEventListener('DOMContentLoaded', () => {

	document.getElementById(SELECTORS.PINEAPPLES.REMAINING).innerHTML = `${new Intl.NumberFormat().format(5000)}`;
	if (typeof window.ethereum !== 'undefined') {
		provider = new ethers.providers.Web3Provider(window.ethereum, "any");
		// The Metamask plugin also allows signing transactions to send ether and pay to change state within the blockchain.
		// For this, you need the account signer...
		signer = provider.getSigner();
	}
	else {
		document.getElementById(SELECTORS.ALERT).innerHTML = `<p class="form-control alert-info">Please, <a href="https://metamask.io/download.html" target="_blank" rel="noopener">install MetaMask extention</a> to continue.</p>`;
	}

	startApp();

	document.addEventListener('click', event => {
		event.preventDefault();
		let target = event.target;
		if (target == document.getElementById(SELECTORS.MINT.BUTTON)) {
			mintPineapples();
		}
	});
	document.addEventListener('change', event => {
		event.preventDefault();
		let target = event.target;
		if (target == document.getElementById(SELECTORS.PINEAPPLES.QUANTITY)) {
			updatePrice();
			checkBalance();
		}
	});
	// A Web3Provider wraps a standard Web3 provider, which is what Metamask injects as window.ethereum into each page
	// Force page refreshes on network changes
	provider.on("network", (newNetwork, oldNetwork) => {
		// When a Provider makes its initial connection, it emits a "network"
		// event with a null oldNetwork along with the newNetwork. So, if the
		// oldNetwork exists, it represents a changing network
		if (oldNetwork) {
			window.location.reload();
		}
	});
});
