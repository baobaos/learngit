<?php 
header("Content-Type:text/html;Charset=UTF-8");
//1:接收数据
//2：链接数据库
//3:选择数据库
//4：sql语句
//5:发送
$ID=$_POST['goodsID'];
// echo $ID;
$dbhost="127.0.0.1";
$dbuser="root";
$dbpass="813521";

$con=mysql_connect($dbhost,$dbuser,$dbpass);
if(!$con){
	die("链接失败");
};
mysql_select_db('family_names');
mysql_query('set names utf8');

// $sql="SELECT * FROM list";
//点击当前商品根据id获取对应的的信息
// DELETE FROM 表名称 WHERE 列名称 = 值
$sql="DELETE FROM shop_car WHERE id='$ID'";
$query=mysql_query($sql);
if($query){
	echo 1;
}else{
	echo 0;
}
// 插入数据库
?>