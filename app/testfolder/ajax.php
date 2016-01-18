<?php
 
	define("PASSWD", 'password');
 
	$post = (!empty($_POST)) ? true : false;
 
	if($post){
		$name = stripslashes($_POST['name']);
		$passwd = stripslashes($_POST['passwd']);
		$error = false;

		if($_POST['passwd']!==PASSWD){
			$error = 'Inserted password is incorrect';
		}
 
		if(!$error){
			echo '<div class="bg-success">Authorized area</div>';
		}else{
			echo '<div class="bg-danger">'.$error.'</div>';
		}
	}
?>