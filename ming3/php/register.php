<?php
header('content-type:text/html; charset= utf-8');
	$name = $_POST['name'];
	$pass = $_POST['pass'];
	$figure=$_POST['figure'];
	$dbhost = 'localhost';  
	$dbuser = 'root';            // mysql用户名
	$dbpass = '813521';
mysql_connect($dbhost,$dbuser,$dbpass);
// echo $conn;

mysql_query("set names utf8");
mysql_select_db('family_names');
$sql="SELECT * FROM user WHERE user_name='".$name."'";
$retval = mysql_query($sql);
$num=mysql_num_rows($retval);  //获取行数
// echo $num;
//echo $pass;
if($num){
      echo "用户已存在";
//    echo 1;
}else{
    $sql2="INSERT INTO user (user_name,user_pass) VALUES('$name','$pass')";
    mysql_query($sql2);

//     echo 0;
};


?>