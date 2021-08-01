<?php  ?>
<style>
	section.dashboard {
		padding: 30px;
		margin-bottom: 0;
	}
	h2 > small {
		font-size: 70%;
	}
	.form-btn {
		flex: 1;
	}
	.input-group > .input-address-comp {
		flex: 1;
	}
	.input-group > .input-address {
		flex: 2;
	}
	.input-group > .form-input {
		flex: 2;
	} 
</style>
<section class="container dashboard">
	<h1>Dashboard</h1>
	<div id="alert"></div>
	<div class="row">
		<div class="col-12">
			<h2 class="m-3">Airdrop <small>(<span id="airdrop-remaining"></span> remaining)</small></h2>
			<div class="input-group">
				<input class="form-control input-address-comp" placeholder="Quantity" type="number" name="airdrop-quantity" id="airdrop-quantity" />
				<input class="form-control input-address" placeholder="Address" type="text" name="airdrop-address" id="airdrop-address" />
				<button class="btn form-btn" id="airdrop-button" type="button">Airdrop Token</button>
			</div>
			<h2 class="m-3">Update Wallets</h2>
			<div class="input-group">
				<select class="form-select input-address-comp" name="wallet-user" id="wallet-user">
					<option selected>Select a user...</option>
					<option value="Alina#4526">Alina#4526</option>
					<option value="vandemlau#0301">vandemlau#0301</option>
					<option value="kashushu">kashushu</option>
					<option value="PineappleHead#4535">PineappleHead#4535</option>
				</select>
				<input class="form-control input-address" type="text" name="wallet-address" id="wallet-address" />
				<button class="btn form-btn" id="wallet-button">Update Address</button>
			</div>
		</div>
		<div class="col">
			<h2 class="m-3">Flip Sales<br/><small>(<span id="sales-state"></span>)</small></h2>
			<button class="btn form-btn w-100" id="sales-button" type="button">Flip Sales</button>
			<h2 class="m-3">Withdraw<br/><small>(<span id="balance"></span> ETH)</small></h2>
			<button class="btn form-btn w-100" id="withdraw" type="button">Withdraw</button>
		</div>
		<div class="col-9">
			<h2 class="m-3">Set Base URI<br/><small>(<span id="baseuri-old"></span>)</small></h2>
			<div class="input-group">
				<input class="form-control form-input" type="text" name="baseuri-new" id="baseuri-new" />
				<button class="btn form-btn" id="baseuri-button" type="button">Set BaseURI</button>
			</div>
			<h2 class="m-3">Update Price<br/><small>(<span id="price-old"></span> ETH)</small></h2>
			<div class="input-group">
				<input class="form-control form-input" type="number" name="price-new" id="price-new" />
				<button class="btn form-btn" id="price-button" type="button">Update Price</button>
			</div>
		</div>
	</div>
</section>
