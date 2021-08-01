const DASHBOARD = {
	ALERT: 'alert',
	AIRDROP: {
		BUTTON: 'airdrop-button',
		ADDRESS: 'airdrop-address',
		QUANTITY: 'airdrop-quantity',
		REMAINING: 'airdrop-remaining',
	},
	WALLET: {
		USER: 'wallet-user',
		BUTTON: 'wallet-button',
		ADDRESS: 'wallet-address',
	},
	SALES: {
		STATE: 'sales-state',
		BUTTON: 'sales-button',
	},
	BALANCE: 'balance',
	WITHDRAW: 'withdraw',
	BASEURI: {
		NEW: 'baseuri-new',
		OLD: 'baseuri-old',
		BUTTON: 'baseuri-button',
	},
	PRICE: {
		NEW: 'price-new',
		OLD: 'price-old',
		BUTTON: 'price-button',
	},
}
var accounts = []
let provider;
let contract;
let userAccount;

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

async function getSales() {
	const salesState = await contract.saleIsActive();
	const salesStateStr = salesState ? "ON" : "OFF";
	document.getElementById(DASHBOARD.SALES.STATE).innerText = salesStateStr;
}

async function getPrice() {
	const price = await contract.price();
	document.getElementById(DASHBOARD.PRICE.OLD).innerText = `${ethers.utils.formatUnits(price)}`;
}

async function getBaseURI() {
	const baseURI = await contract.getBaseURI();
	document.getElementById(DASHBOARD.BASEURI.OLD).innerText = baseURI;
}

async function getBalance() {
	const balance = await provider.getBalance(PINEAPPLES_ADDRESS);
	document.getElementById(DASHBOARD.BALANCE).innerText = `${ethers.utils.formatUnits(balance)}`;
}

async function getReserve() {
	const reserve = await contract._reserve();
	document.getElementById(DASHBOARD.AIRDROP.REMAINING).innerText = reserve;
}

async function flipSales() {
	userAccount = await getAccount();
	const signer = provider.getSigner();
	try {
		const pineapplesMinter = new ethers.Contract(PINEAPPLES_ADDRESS, JSON.stringify(PINEAPPLES_ABI), signer);
		// Set transaction parameters
		const transactionParameters = {
			from: userAccount
		};
		return pineapplesMinter.flipSaleState(transactionParameters);
	}
	catch (error) {
		return {
			error: "Something went wrong, you cannot complete that transaction."
		}
	}
}

async function withdraw() {
	userAccount = await getAccount();
	const signer = provider.getSigner();
	try {
		const pineapplesMinter = new ethers.Contract(PINEAPPLES_ADDRESS, JSON.stringify(PINEAPPLES_ABI), signer);
		// Set transaction parameters
		const transactionParameters = {
			from: userAccount
		};
		return pineapplesMinter.withdraw(transactionParameters);
	}
	catch (error) {
		return {
			error: "Something went wrong, you cannot complete that transaction."
		}
	}
}

async function setBaseURI(uri) {
	userAccount = await getAccount();
	const signer = provider.getSigner();
	try {
		const pineapplesMinter = new ethers.Contract(PINEAPPLES_ADDRESS, JSON.stringify(PINEAPPLES_ABI), signer);
		// Set transaction parameters
		const transactionParameters = {
			from: userAccount
		};
		return pineapplesMinter.setBaseURI(uri, transactionParameters);
	}
	catch (error) {
		return {
			error: "Something went wrong, you cannot complete that transaction."
		}
	}
}

async function setAddress(user, address) {
	userAccount = await getAccount();
	const signer = provider.getSigner();
	try {
		const pineapplesMinter = new ethers.Contract(PINEAPPLES_ADDRESS, JSON.stringify(PINEAPPLES_ABI), signer);
		// Set transaction parameters
		const transactionParameters = {
			from: userAccount
		};
		return pineapplesMinter.updateAddress(user, address, transactionParameters);
	}
	catch (error) {
		return {
			error: "Something went wrong, you cannot complete that transaction."
		}
	}
}

async function airdrop(address, quantity) {
	userAccount = await getAccount();
	const signer = provider.getSigner();
	try {
		const pineapplesMinter = new ethers.Contract(PINEAPPLES_ADDRESS, JSON.stringify(PINEAPPLES_ABI), signer);
		// Set transaction parameters
		const transactionParameters = {
			from: userAccount
		};
		return pineapplesMinter.airdropPineapple(address, quantity, transactionParameters);
	}
	catch (error) {
		return {
			error: "Something went wrong, you cannot complete that transaction."
		}
	}
}

async function startApp() {
	let hasAccountsPermission = null;
	try {
		const permissions = await window.ethereum.request( { method: 'wallet_getPermissions' } );
		hasAccountsPermission = permissions.some( p => p.parentCapability === 'eth_accounts' );
	}
	catch ( err ) {
		permissions = null;
	}

	if ( hasAccountsPermission !== false ) {
		//assign it to the global variable
		accounts = await window.ethereum.request({ method: 'eth_accounts' });
	}

	contract = new ethers.Contract(PINEAPPLES_ADDRESS, JSON.stringify(PINEAPPLES_ABI), provider);

	getSales();
	getPrice();
	getBaseURI();
	getBalance();
	getReserve();
}

async function initDashboard() {
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
		document.getElementById(DASHBOARD.ALERT).innerHTML = `<p class="form-control alert-info">Please, <a href="https://metamask.io/download.html" target="_blank" rel="noopener">install MetaMask extention</a> to continue.</p>`;
	}

	document.getElementById(DASHBOARD.AIRDROP.BUTTON).addEventListener('click', event => {
		const trigger = event.currentTarget;
		const triggerEnabled = !trigger.hasAttribute('disabled');
		if ( triggerEnabled ) {
			const airdropAddress = document.getElementById(DASHBOARD.AIRDROP.ADDRESS).value;
			const airdropQuantity = document.getElementById(DASHBOARD.AIRDROP.QUANTITY).value;
			airdrop(airdropAddress, airdropQuantity)
			.then(result => {
				getReserve();
			})
			.catch(error => {
				console.log("ERROR: ", error);
				document.getElementById(DASHBOARD.ALERT).innerHTML = `<p class="form-control alert-danger">Something went wrong, the transaction failed.</p>`;
			});
		}
	});
	document.getElementById(DASHBOARD.WALLET.BUTTON).addEventListener('click', event => {
		const trigger = event.currentTarget;
		const triggerEnabled = !trigger.hasAttribute('disabled');
		if ( triggerEnabled ) {
			const walletUser = document.getElementById(DASHBOARD.WALLET.USER).value;
			const walletAddress = document.getElementById(DASHBOARD.WALLET.ADDRESS).value;
			setAddress(walletUser, walletAddress)
			.catch(error => {
				console.log("ERROR: ", error);
				document.getElementById(DASHBOARD.ALERT).innerHTML = `<p class="form-control alert-danger">Something went wrong, the transaction failed.</p>`;
			});
		}
	});
	document.getElementById(DASHBOARD.SALES.BUTTON).addEventListener('click', event => {
		const trigger = event.currentTarget;
		const triggerEnabled = !trigger.hasAttribute('disabled');
		if ( triggerEnabled ) {
			flipSales()
			.then(result => {
				getSales();
			})
			.catch(error => {
				console.log("ERROR: ", error);
				document.getElementById(DASHBOARD.ALERT).innerHTML = `<p class="form-control alert-danger">Something went wrong, the transaction failed.</p>`;
			});
		}
	});
	document.getElementById(DASHBOARD.WITHDRAW).addEventListener('click', event => {
		const trigger = event.currentTarget;
		const triggerEnabled = !trigger.hasAttribute('disabled');
		if ( triggerEnabled ) {
			withdraw()
			.then(result => {
				getBalance();
			})
			.catch(error => {
				console.log("ERROR: ", error);
				document.getElementById(DASHBOARD.ALERT).innerHTML = `<p class="form-control alert-danger">Something went wrong, the transaction failed.</p>`;
			});
		}
	});
	document.getElementById(DASHBOARD.BASEURI.BUTTON).addEventListener('click', event => {
		const trigger = event.currentTarget;
		const triggerEnabled = !trigger.hasAttribute('disabled');
		if ( triggerEnabled ) {
			const newBaseURI = document.getElementById(DASHBOARD.BASEURI.NEW).value;
			setBaseURI(newBaseURI)
			.then(result => {
				getBaseURI();
			})
			.catch(error => {
				console.log("ERROR: ", error);
				document.getElementById(DASHBOARD.ALERT).innerHTML = `<p class="form-control alert-danger">Something went wrong, the transaction failed.</p>`;
			});
		}
	});
	document.getElementById(DASHBOARD.PRICE.BUTTON).addEventListener('click', event => {
		const trigger = event.currentTarget;
		const triggerEnabled = !trigger.hasAttribute('disabled');
		if ( triggerEnabled ) {
			const newPrice = document.getElementById(DASHBOARD.PRICE.NEW).value;
			setBaseURI(newPrice)
			.then(result => {
				getPrice();
			})
			.catch(error => {
				console.log("ERROR: ", error);
				document.getElementById(DASHBOARD.ALERT).innerHTML = `<p class="form-control alert-danger">Something went wrong, the transaction failed.</p>`;
			});
		}
	});
}
