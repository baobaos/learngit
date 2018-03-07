<?php 
header("Content-Type:text/html;Charset=UTF-8");
//1:接收数据
//2：链接数据库
//3:选择数据库
//4：sql语句
//5:发送
// $name=$_POST['typeName'];
$dbhost="127.0.0.1";
$dbuser="root";
$dbpass="813521";
session_start();
$pro=$_SESSION['stu_id'];
// echo $pro;
$con=mysql_connect($dbhost,$dbuser,$dbpass);
if(!$con){
	die("链接失败");
};
mysql_select_db('family_names');
mysql_query('set names utf8');
$sql="select * from shop_car where user_id='$pro'";
$query=mysql_query($sql);
$arr=array();
while ($row=mysql_fetch_array($query)) {
	array_push($arr, $row);
};
$string=json_encode($arr);
echo $string;
?>