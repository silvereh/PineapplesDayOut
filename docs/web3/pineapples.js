window.addEventListener('DOMContentLoaded', () => {
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
	let userAccount;

	ELMTS.PINEAPPLES.REMAINING.innerHTML = `${new Intl.NumberFormat().format(5000)}`;

	let salesOpen = () => {
		return pineapplesContract.methods.saleIsActive().call();
	}

	let totalSupply = () => {
		return pineapplesContract.methods.totalSupply().call();
	}

	let getPrice = () => {
		return pineapplesContract.methods.getPrice().call();
	}

	let startApp = () => {
		pineapplesContract = web3js.eth.Contract(PINEAPPLES_ABI, PINEAPPLES_ADDRESS);
		if (salesOpen()) {
			ELMTS.MINT.FORM.Display = 'block';
			ELMTS.COMING.Display = 'none';
			ELMTS.MINT.BUTTON.enable();
			ELMTS.PINEAPPLES.REMAINING.innerText = `${new Intl.NumberFormat().format(MAX_SUPPLY - totalSupply())}`;
		}

		let accountInterval = setInterval(() => {
			// Check if account has changed
			if (web3.eth.accounts[0] !== userAccount) {
				userAccount = web3.eth.accounts[0];
			}
			// Refresh pineapples left
			ELMTS.PINEAPPLES.REMAINING.innerText = `${new Intl.NumberFormat().format(MAX_SUPPLY - totalSupply())}`;
			updatePrice();
		}, 100);
	}

	let updatePrice = () => {
		let num = parseInt(ELMTS.PINEAPPLES.QUANTITY.value, 10);
		if (num < 1 || num > 20) {
			ELMTS.ALERT.innerHTML = `<p class="form-control alert-danger">Please, enter a valid amount of pineapples.</p>`;
			ELMTS.MINT.BUTTON.enable();
			return;
		}

		let total = num * getPrice();
		ELMTS.PINEAPPLES.PRICE.innerHTML = `${total.toPrecision(3)}`;
	}

	let checkBalance = () => {
		return web3.eth.getBalance(userAccount)
			.on('receipt', receipt => {
				if (receipt <= parseFloat(ELMTS.PINEAPPLES.PRICE.innerText)) {
					ELMTS.MINT.BUTTON.disable();
					ELMTS.ALERT.innerHTML = `<p class="form-control alert-warning">You don't have enough ETH to process this transaction.</p>`;
				}
			})
			.on('error', error => {
				ELMTS.ALERT.innerHTML = `<p class="form-control alert-info">Please, <a href="https://metamask.io/download.html" target="_blank" rel="noopener">install MetaMask extention</a> to continue.</p>`;
			});
	}

	let mintPineapples = () => {
		ELMTS.MINT.BUTTON.disable();
		ELMTS.ALERT.innerHTML = `<p class="form-control alert-info">Your transaction is processing, please wait...</p>`;
		return pineapplesContract.methods.mintPineapples(num)
			.send({
				from: userAccount,
				value: web3js.utils.toWei('0.02', 'ether')
			})
			.on('receipt', receipt => {
				ELMTS.MINT.BUTTON.enable();
				ELMTS.ALERT.innerHTML = `<p class="form-control alert-success">Congratulations! You just got yourself some pineapples!</p>`;
			})
			.on('error', error => {
				ELMTS.MINT.BUTTON.enable();
				ELMTS.ALERT.innerHTML = `<p class="form-control alert-danger">Something went wrong during transaction processing, we couldn't buy your pineapples.</p>`;
			});
	}

	if (typeof web3 !== 'undefined') {
		web3js = new Web3(web3.currentProvider);
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
});