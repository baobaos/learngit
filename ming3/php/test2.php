<?php 
header('content-type:text/html; charset= utf-8');
//$classname=$_POST['classname'];

// 链接数据库

$host='localhost';
$dbuser='root';
$dbpass='813521';
$conn=mysql_connect($host,$dbuser,$dbpass);
if(!$conn){
die('数据库连接失败'.mysql_error($conn));
}

// echo '链接成功';
// 设置编码
 mysql_query("set names 'utf8'");

// 选择数据库
mysql_select_db('family_names');

$sql="SELECT * FROM new_week";

// echo $sql;

// 发送sql语句

$query=mysql_query($sql);

//echo $query;

$arr=array();

while ($row=mysql_fetch_array($query)) {
	array_push($arr, $row);

}
 
$string=json_encode($arr);
echo $string;


  ?>