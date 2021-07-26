// import { ethers } from "./ethers_5_2.min.js";

window.addEventListener('DOMContentLoaded', () => {
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