<?php

//composer
require( dirname( __DIR__ ) . DIRECTORY_SEPARATOR . 'vendor' . DIRECTORY_SEPARATOR . 'autoload.php' );
use Web3\Contract;

class Route{
	public function construct(){
	}
	
	public function GET(){
		if( !isset( $_GET['TokenID'] ) )
			$this->_404();


		$TokenID = (int)$_GET['TokenID'];
		$res = $this->getToken( $TokenID );
		if( !empty( $res->num_rows ) )
			$this->emitToken( $res->fetch_assoc() );



		$supply = $this->getContractSupply();
		$tokenBI = new \phpseclib\Math\BigInteger( $TokenID );
		if( $supply->compare( $tokenBI ) < 0 )
			$this->_404();


		$res = $this->mysqli()->query( "UPDATE metadata SET IsMinted = 1 WHERE TokenID = {$TokenID}" );
		var_dump( $res );
			
		$res = $this->getToken( $TokenID );
		if( !empty( $res->num_rows ) )
			$this->emitToken( $res->fetch_assoc() );
		else
			$this->_404();
	}

	private function _404(){
		header( 'Content-Type: application/json', true, 404 );
		echo '{"code":404,"error":"Not Found"}';
		exit;		
	}
	
	private function emitToken( $token ){
		$token = $this->formatToken( $token );
		header( 'Content-Type: application/json' );
		echo json_encode( $token, JSON_UNESCAPED_SLASHES );
		exit;
	}
	
	private function formatToken( $token ){
		$tokenID = $token['TokenID'];
		unset( $token['TokenID'], $token['IsMinted'] );
		$token['Url'] = "https://pineapplesdayout.com/tokens/{$token['Url']}";
		
		$data = array(
			"description"  => "Pineapples Day Out is a collection of 5000 programmatically, randomly generated NFTs based on 109 different traits such as skins, crowns, accessories, and others, on the Ethereum blockchain.", 
			"external_url" => "https://pineapplesdayout.com", 
			"image"        => "https://pineapplesdayout.com/assets/pineapple.jpeg",
			// "image"        => "https://pineapplesdayout.com/tokens/{$token['Image']}",
			"name"         => "Pineapple #{$tokenID}"// ,
			// "attributes"   => array(
			// 	array( 
			// 		"trait_type" => "Background", 
			// 		"value"      => $token["Background"]
			// 	),
			// 	array( 
			// 		"trait_type" => "Skin", 
			// 		"value"      => $token["Skin"]
			// 	),
			// 	array( 
			// 		"trait_type" => "Mouth", 
			// 		"value"      => $token["Mouth"]
			// 	),
			// 	array( 
			// 		"trait_type" => "Eyes", 
			// 		"value"      => $token["Eyes"]
			// 	),
			// 	array( 
			// 		"trait_type" => "Crown", 
			// 		"value"      => $token["Crown"]
			// 	),
			// 	array( 
			// 		"trait_type" => "Footwear", 
			// 		"value"      => $token["Footwear"]
			// 	),
			// 	array( 
			// 		"trait_type" => "Accessories", 
			// 		"value"      => $token["Accessories"]
			// 	)
			// )
		);
		
		return $data;
	}

	private function getContractSupply(){
		require( 'ABI.php' );
		// $CONTRACT = '0xad548be055e0b86f1b2a3036387f4378df3fedbb'; // RINKEBY
		// $CONTRACT = '0x22e1fe9f1c8642fddabd6eb921211eebf1268bbe'; // ROPSTEN
		$CONTRACT = '0x2d491e11b49935255f71ba1195dc916fef3816e5';
		// $INFURA = 'https://rinkeby.infura.io/v3/d864e7c7bfca4b6792b60fd582724bf8'; // RINKEBY
		// $INFURA = 'https://ropsten.infura.io/v3/d864e7c7bfca4b6792b60fd582724bf8'; // ROPSTEN
		$INFURA = 'https://mainnet.infura.io/v3/d864e7c7bfca4b6792b60fd582724bf8';

		$supply = new \phpseclib\Math\BigInteger( -1 );
		$contract = new Contract( $INFURA, $ABI );
		// $contract->at( $CONTRACT )->call( 'ownerOf', array(), function( $err, $value ){
		// $contract->at( $CONTRACT )->call( 'tokenByIndex', array(), function( $err, $value ){
		// $contract->at( $CONTRACT )->call( 'tokenURI', array(), function( $err, $value ){
		$contract->at( $CONTRACT )->call( 'totalSupply', array(), function( $err, $values ) use( &$supply ){
			if( $err ){
				error_log( "{$err}" );
			}
			else{
				$supply = $values[0];
			}
		});

		return $supply;
	}

	private function getToken( $TokenID ) {
		return $this->mysqli()->query( "SELECT * FROM metadata WHERE IsMinted = 1 AND TokenID = {$TokenID} LIMIT 1" );
	}

	private function mysqli(){
		static $mysqli;

		if( empty( $mysqli ) ){
			$mysqli = new mysqli( '135.148.83.212', 'piddly314', 'mDee9$g2Wf4', 'pdotest' );
		}

		return $mysqli;
	}
}

try{
	$method = $_SERVER['REQUEST_METHOD'];
	$route = new Route();
	if( method_exists( $route, $method ) ){
		$route->{$method}();
	}
	else{
		header( 'Content-Type: application/json', true, 501 );
		echo '{"code":501,"error":"Not Implemented"}';
		exit;
	}
}
catch( Exception $err ){
	error_log( "{$err}" );
	header( 'Content-Type: application/json', true, 500 );
	echo '{"code":500,"error":"Internal Server Error"}';
}
