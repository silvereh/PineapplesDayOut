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
		<?php include('./includes/favicon.php'); ?>
		<!-- Social Media Embeds -->
		<?php include('./includes/socials.php'); ?>
		<!-- Styles -->
		<?php include('./includes/styles.php'); ?>
		<script language="JavaScript" type="text/javascript" src="/src/pineapples_abi.js" async></script>
		<script language="JavaScript" type="text/javascript" src="/src/pineapples.js" async></script>
	</head>
	<body data-spy="scroll" data-target="#navigation" data-offset="350">
		<!-- Header -->
		<?php include('./includes/header.php'); ?>
		<!-- Home -->
		<?php include('./content/home.php'); ?>
		<!-- About -->
		<?php include('./content/about.php'); ?>
		<!-- Roadmap -->
		<?php include('./content/roadmap.php'); ?>
		<!-- Rarities -->
		<?php include('./content/rarities.php'); ?>
		<!-- Team -->
		<?php include('./content/team.php'); ?>
		<!-- Footer -->
		<?php include('./includes/footer.php'); ?>
	</body>
</html>