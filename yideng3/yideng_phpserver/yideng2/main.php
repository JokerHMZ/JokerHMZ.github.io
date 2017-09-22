<?php
	header("Content-Type:application/json");
	$tags_id = $_REQUEST['id'];
	$conn = mysqli_connect('localhost','root','','tags') ;
	$sql = "SET NAMES UTF8";
	mysqli_query($conn, $sql);
	$sql = "SELECT count FROM tagnumber WHERE id='$tags_id'";   
	$result = mysqli_query($conn, $sql);
	$row = mysqli_fetch_array($result);
	$count=$row['count']+1;
	$sql = "UPDATE tagnumber SET count='$count' WHERE id='$tags_id'";
	$result = mysqli_query($conn, $sql);
	$output=[];
	if($row){
		$output=['id'=>1];
	}else{
		$output=['id'=>-1];
	}
	echo json_encode($output)
?>