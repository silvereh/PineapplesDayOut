<?php
?>
<!DOCTYPE html>
<html>
	<head>
		<!-- Basic Metadata -->
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta name="author" content="Pineapples Day Out">
		<meta name="description" content="Pineapples Day Out is a collection of 5000 programmatically, randomly generated NFTs based on 109 different traits such as skins, crowns, accessories, and others, on the Ethereum blockchain.">
		<title>Pineapples Day Out</title>
		<!-- Favicon -->
		<?php include('../includes/favicon.php'); ?>
		<!-- Styles -->
		<?php include('../includes/styles.php'); ?>
	</head>
	<body data-spy="scroll" data-target="#navigation" data-offset="350">
		<!-- Header -->
		<?php include('../includes/header.php'); ?>
		<!-- Dashboard -->
		<?php include('../content/dashboard.php'); ?>
		<!-- Footer -->
		<?php include('../includes/footer.php'); ?>
		<script language="JavaScript" type="text/javascript" src="/src/dashboard.js?q=<?=time();?>"></script>
		<script language="JavaScript" type="text/javascript">
			window.addEventListener( 'DOMContentLoaded', function(){
				initDashboard();
			});
		</script>
	</body>
</html>