<?php



     require_once( 'config.inc.php' );



     require_once( 'include/core/functions.inc.php' );



     if (in_array($ptype, $globalInformation)){

          $iopCourseDir = APP_CACHE . 'iop_global/';

          $cachefile =  $iopCourseDir  . '' . $ptype . '.html';

          $jsFileWritePath = $iopCourseDir.$ptype . '.js';

          $jsDatafile = 'https://'.$_SERVER[ HTTP_HOST ].'/insights/iop_global/' . $ptype.'.js';

     }else{

          $iopCourseDir = APP_CACHE . '/iop_course/'.CANVAS_IOP_COURSE_ID.'/' . $ptype;

          $cachefile =  $iopCourseDir  . '/' . $currentId . '.html';

          $jsFileWritePath = $iopCourseDir.'/'.$currentId . '.js';

          $jsDatafile = 'https://'.$_SERVER[ HTTP_HOST ].'/insights/iop_course/'.CANVAS_IOP_COURSE_ID.'/' . $ptype.'/'.$currentId.'.js';

     }



     if (!file_exists($iopCourseDir)) {

          mkdir($iopCourseDir, 0777, true);

     }





     $cachetime = 18000;



     $file_last_mod_time = filemtime($cachefile);



     $etag = 'brianscachecontrolegtag';



     $cacheControl = 'private, max-age='.$cachetime.', must-revalidate';



     $lastModified = 'Sat, 22 Jun 2019 07:30:00 GMT';



     if ( file_exists( $cachefile ) && time() - $cachetime < filemtime( $cachefile) && !$refFile ) {

          $canVars = 'const canInf = '.CANVAS_INFO;

          $fc = str_replace( '//CANVAS_INFO', $canVars, file_get_contents( $cachefile ) );

          header('Cache-Control: ' . $cacheControl);

          header('ETag: ' . $etag);

          header('Last-Modified: Sat, 22 Jun 2019 07:30:00 GMT' . $lastModified);

          echo $fc;

          exit;

     }





     ob_start();



     $cssfile = CSS_PATH . 'custom.css';     



     $jsfile = JS_PATH . 'custom.js';



     $obj = getPageData( $ptype, $currentId, $iopCourseDir, $jsFileWritePath );



?>



<!DOCTYPE html>

<html lang="en">

     <?php

          header('Cache-Control: ' . $cacheControl );

          header('ETag: ' . $etag);

          header('Last-Modified: Sat, 1 Jun 2019 07:30:00 GMT' . $lastModified);

     ?>

<head>



     <meta name="viewport" content="width=device-width, initial-scale=1.0">

     <base href="<?php echo APP_SERVER; ?>">

     <title>|

          <? echo CANVAS_PAGE_TITLE; ?>

     </title>

     <link rel="apple-touch-icon" sizes="180x180" href="<?php echo IMG_BRAND_PATH; ?>apple-touch-icon.png">

     <link rel="icon" type="image/png" sizes="32x32" href="<?php echo IMG_BRAND_PATH; ?>favicon-32x32.png">

     <link rel="icon" type="image/png" sizes="192x192" href="<?php echo IMG_BRAND_PATH; ?>android-chrome-192x192.png">

     <link rel="icon" type="image/png" sizes="16x16" href="<?php echo IMG_BRAND_PATH; ?>favicon-16x16.png">

		 <!--

     <link rel="manifest" href="manifest.json">

	 -->

     <link rel="mask-icon" href="<?php echo IMG_BRAND_PATH; ?>safari-pinned-tab.svg" color="#000000">

     <meta name="msapplication-TileColor" content="#da532c">

     <meta name="theme-color" content="#ffffff">

     <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.0/css/all.min.css" integrity="sha256-zuYfqYVhondYLhMhEA58/2PA/prdFq3gT72DxNwSD4M=" crossorigin="anonymous"/>

     <link rel='stylesheet' id='glossary-hint-css' href='https://dev01.inside-out-project.com/wp-content/plugins/glossary-by-codeat/public/assets/css/tooltip-classic.css?ver=1.7.17' type='text/css' media='all'/>

		 <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha256-YLGeXaapI0/5IgZopewRJcFXomhRMlYYjugPLSyNjTY=" crossorigin="anonymous"/>

		 <link rel="stylesheet" href="<?php echo CSS_PATH; ?>custom.css"/>



     <?php



          date_default_timezone_set( "America/New_York" );

          $fileUpdateTime = date( 'D, M Y h:i:s a', time() );

     ?>

     <script>

          //CANVAS_INFO

                    var CANVAS_PAGE_TITLE = '<?php echo CANVAS_PAGE_TITLE; ?>';

                    var CANVAS_IOP_COURSE_ID = '<?php echo CANVAS_IOP_COURSE_ID; ?>';

                    var CANVAS_IOP_SYLLABUS_ID = '<?php echo CANVAS_IOP_SYLLABUS_ID; ?>';

                    var CANVAS_IOP_STEP = '<?php echo CANVAS_IOP_STEP; ?>';

                    var CANVAS_IOP_COURSE_NAME = '<?php echo CANVAS_IOP_COURSE_NAME; ?>';

                    var CANVAS_IOP_COURSE_NUMBER = '<?php echo CANVAS_IOP_COURSE_NUMBER; ?>';

                    var CANVAS_IOP_COURSE_TITLE = '<?php echo CANVAS_IOP_COURSE_TITLE; ?>';

  				var ENVIRONMENT = '<?php echo ENVIRONMENT; ?>';

  				var ABSPATH = '<?php echo ABSPATH; ?>';

  				var APP_SERVER = '<?php echo APP_SERVER; ?>';

  				var API_PATH = '<?php echo API_SERVER; ?>wp-json/wp/v2/<?php echo $ptype; ?>/<?php echo $currentId; ?>';

  				var currentServer = '<?php echo APP_SERVER; ?>';

  				var currentId = <?php echo $currentId; ?>;

  				var ptype = '<?php echo $ptype; ?>';

  				var lastUpdate = '<?php echo $fileUpdateTime; ?>';

  				var nwPath = '//<?php echo $_SERVER[ HTTP_HOST ].'/?id='.$currentId.'&ptype='.$ptype.''; ?>';

  				var editPostLink = '<?php echo $EDIT_POST_PATH; ?>';

  				// var priObj = <?php //echo json_encode($obj); ?>;

  				var submitLesson = <?php echo $submitLesson; ?>;

     </script>

    <!--   -->

         <script src="<?php echo $jsDatafile; ?>"></script>

     

</head>

<body>

    <?php 

          include($_SERVER['DOCUMENT_ROOT'].'/include/page_parts/communications_dialog.php');

          include($_SERVER['DOCUMENT_ROOT'].'/include/page_parts/resource_display.php');

          include($_SERVER['DOCUMENT_ROOT'].'/include/page_parts/lesson_resources_div.php');

          include($_SERVER['DOCUMENT_ROOT'].'/include/page_parts/settings_resources_div.php');

          include($_SERVER['DOCUMENT_ROOT'].'/include/page_parts/comments_resources_div.php');

          include($_SERVER['DOCUMENT_ROOT'].'/include/page_parts/information_modal.php');

     ?>



     <div class="main-content">

          <?php include($_SERVER['DOCUMENT_ROOT'].'/include/page_parts/content_header.php'); ?>

