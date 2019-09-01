<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


$fileJson = array();

	header('Access-Control-Allow-Origin: *');
	require_once( 'config.inc.php' );

	array_push($fileJson, APP_CACHE, $currentId);

	delete_files(APP_CACHE,$currentId);



	function delete_files($dir,$currentId) {
		global $fileJson;
	  foreach(glob($dir . '/*') as $file) {
	    if(is_dir($file)){
			delete_files($file,$currentId);
		} else {
			if($currentId === 0 || strpos($file,$currentId)){
				array_push($fileJson, $file);
				unlink($file);	
			}
		}
	  }
	}

	$rt = json_encode($fileJson, JSON_FORCE_OBJECT);

	echo $rt;
?>
