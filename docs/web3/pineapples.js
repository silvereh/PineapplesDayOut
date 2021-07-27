import { ethers } from "./ethers_5_2.min.js";
import { MAX_SUPPLY, PINEAPPLES_ADDRESS, PINEAPPLES_ABI } from "./pineapples_abi.js";

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
let provider;
let signer;

let salesOpen = () => {
	let result = pineapplesContract.saleIsActive;
	console.log("SalesOpen: ", result);
	return result;
}

let totalSupply = () => {
	let result = pineapplesContract.totalSupply();
	console.log("TotalSupply: ", result);
	return result;
}

let getPrice = () => {
	result = pineapplesContract.price;
	console.log("Price: ", result);
	return result;
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
	return provider.getBalance(userAccount)
		.then(receipt => {
			accountBalance = receipt;
			console.log("AccountBalance: ", accountBalance);
			if (formatUnits(accountBalance) <= parseFloat(ELMTS.PINEAPPLES.PRICE.innerText)) {
				ELMTS.MINT.BUTTON.Disabled = true;
				ELMTS.ALERT.innerHTML = `<p class="form-control alert-warning">You don't have enough ETH to get juiced.</p>`;
			}
		});
}

let mintPineapples = () => {
	pineapplesMinter = pineapplesContract.connect(signer);
	ELMTS.MINT.BUTTON.Disabled = true;
	ELMTS.ALERT.innerHTML = `<p class="form-control alert-info">Your transaction is processing, please wait...</p>`;
	return pineapplesMinter.mintPineapples(num, value = totalPrice)
		.then(receipt => {
			ELMTS.MINT.BUTTON.Disabled = false;
			ELMTS.ALERT.innerHTML = `<p class="form-control alert-success">Congratulations! You just got juiced!</p>`;
		})
		.catch(error => {
			ELMTS.MINT.BUTTON.Disabled = false;
			ELMTS.ALERT.innerHTML = `<p class="form-control alert-danger">Something went wrong, we couldn't juice you.</p>`;
		});
}

let startApp = () => {
	pineapplesContract = new ethers.Contract(PINEAPPLES_ADDRESS, JSON.stringify(PINEAPPLES_ABI), provider);

	let accountInterval = setInterval(() => {
		if (salesOpen()) {
			ELMTS.MINT.FORM.Display = 'block';
			ELMTS.COMING.Display = 'none';
			ELMTS.MINT.BUTTON.Disabled = false;
			ELMTS.PINEAPPLES.REMAINING.innerText = `${new Intl.NumberFormat().format(MAX_SUPPLY - totalSupply())}`;
		}
	}, 1000);
}

window.addEventListener('DOMContentLoaded', () => {
	ELMTS.PINEAPPLES.REMAINING.innerHTML = `${new Intl.NumberFormat().format(5000)}`;
	if (typeof window.ethereum !== 'undefined') {
		provider = new ethers.providers.Web3Provider(window.ethereum, "any");
		// The Metamask plugin also allows signing transactions to send ether and pay to change state within the blockchain.
		// For this, you need the account signer...
		signer = provider.getSigner();
	}
	else {
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
