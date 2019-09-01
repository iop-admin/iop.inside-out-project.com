<?php

	require_once( $_SERVER[ DOCUMENT_ROOT ] . 'include/utilities/cache-clear.php' );

	echo '<h3>Deleting Cached Files:</h3>';

	delete_files(APP_CACHE);

	function delete_files($dir) {
		echo '<ul><li>'.$dir;
	  foreach(glob($dir . '/*') as $file) {
	    if(is_dir($file)){
				delete_files($file);
			} else {
				echo '<li>'.$file.'</li>';
				unlink($file);
			}
	  }

		echo '</li></ul>';
		//rmdir($dir);
	}

?>
