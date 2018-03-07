<?php
header('content-type:text/html; charset= utf-8');
	$name = $_POST['name'];
	$pass = $_POST['pass'];
	
	// 1:链接数据库
// mysql服务器主机地址
$dbhost = 'localhost';  
$dbuser = 'root';            // mysql用户名
$dbpass = '813521';         
 // mysql用户名密码
$conn = mysql_connect($dbhost,$dbuser,$dbpass);
// // echo $conn;
if(!$conn)
{
  die('连接失败: ' . mysql_error($conn));
}
// 设置编码，防止中文乱码
mysql_query("set names utf8");
//2.选择数据库
mysql_select_db('family_names');
//3.sql语句
$sql="SELECT * FROM user WHERE user_name='".$name."'";
// echo $sql;
//4发送sql语句
$retval = mysql_query($sql);
// $retval1 = mysqli_query($conn,$sql1);
// print_r($retval);
// 获取数据库的值
 $num=mysql_num_rows($retval);
// $num1=mysqli_num_rows($retval1);

if($num){
   $result=mysql_fetch_array($retval);
// echo $pass;
    if($result['user_pass']==$pass){
      session_start();
      $_SESSION['stu_id']=$result['id'];
    	echo  "{code:1,message:'登录成功',id:".$result['id'].",name:".$result['user_name']."}";
    }else{
         echo  "{code:2,message:'密码错误'}";
   }
}else{
    echo  "{code:0,message:'账号不存在'}";
};

?>