<?php ?>

<section class="home text-center d-flex" id="home">
	<div class="home-wrap">
		<div id="alert"></div>
		<h1 class="sr-only">Pineapples Day Out</h1>
		<img class="logo" src="./assets/Logo.png" alt="Pineapples Day Out" aria-hidden="true" >
		<div class="text-center">
			<div class="mint-form" id="mint-form" style="display: none;">
				<label class="d-block" >Mint your pineapples here, there are only <span id="pineapples-remaining">5000</span> pineapples left.<br>
					<select class="form-control" name="pineapples-quantity" id="pineapples-quantity">
						<option value="0" selected>Select a number of pineapples to mint</option>
						<option value="1">1</option>
						<option value="2">2</option>
						<option value="3">3</option>
						<option value="4">4</option>
						<option value="5">5</option>
						<option value="6">6</option>
						<option value="7">7</option>
						<option value="8">8</option>
						<option value="9">9</option>
						<option value="10">10</option>
						<option value="11">11</option>
						<option value="12">12</option>
						<option value="13">13</option>
						<option value="14">14</option>
						<option value="15">15</option>
						<option value="16">16</option>
						<option value="17">17</option>
						<option value="18">18</option>
						<option value="19">19</option>
						<option value="20">20</option>
					</select>
				</label>
				<label class="d-block">
					You will pay <span id="pineapples-price">0.000</span> ETH for this transaction.
				</label>
				<button class="btn btn-mint" id="mint-button">Juice Me!</button>
			</div>
			<button class="btn btn-mint" disabled id="coming">Coming Soon</button>
		</div>
	</div>
</section>
