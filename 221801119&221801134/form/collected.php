<html>
<head>
    <meta http-equiv="Content-Type" content="text/html;charset=utf-8"> 
</head>
<?php
$pid=$_GET['pid'];
$userid=$_GET['userid'];
$c=$_GET['c'];
$view=$_GET['view'];
$conn = new mysqli('localhost','root','','paperdb');
$conn->query("SET NAMES utf8");
if($c==0){
    $sql = "update userPaper set collect='$c' where pid = '$pid' and userid='$userid' ";
    $sql2 = "update userPaper set folder='' where pid = '$pid' and userid='$userid' ";
}
else{
    $sql = "update userPaper set collect='$c'  where pid = '$pid' and userid='$userid' ";
    $sql2 = "update userPaper set folder='默认收藏夹' where pid = '$pid' and userid='$userid' ";
}
$conn->query($sql);
$conn->query($sql2);
if($c==0)
    echo '<script>alert("取消收藏成功！");</script>';
else
    echo '<script>alert("已添加到默认收藏夹！");</script>';
if($view==1)
    echo '<script>window.location.href="../view/manage.php";</script>';
else 
    echo '<script>window.location.href="../view/collect.php";</script>';
?>