<?php
header('content-type:text/html; charset= utf-8');
	$shang = $_POST['shang_id'];
	$user = $_POST['user'];
	$picture=$_POST['tu'];
	$shang_name=$_POST['name'];
	$price=$_POST['price'];
	$numb=$_POST['numbe'];
	
	$dbhost = 'localhost';  
	$dbuser = 'root';            // mysql用户名
	$dbpass = '813521';
mysql_connect($dbhost,$dbuser,$dbpass);
// echo $conn;
//echo $numb;
mysql_query("set names utf8");
mysql_select_db('family_names');
$sql="INSERT INTO shop_car (shop_picture,shop_name,shop_xi,shop_price,user_id,pin_id,state,productQuantity) VALUES('$picture','$shang_name','左右会场','$price','$user','$shang','代购买','$numb')";
$retval = mysql_query($sql);



?>