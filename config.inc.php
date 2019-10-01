<?php



// Gather Canvas Variable Information



$resource_link_title = (isset($_POST['resource_link_title']) && !empty($_POST['resource_link_title'])) ? $_POST['resource_link_title'] : '';

define("CANVAS_PAGE_TITLE", $resource_link_title);

$custom_iop_course_id = (isset($_REQUEST['custom_iop_course_id']) && !empty($_REQUEST['custom_iop_course_id'])) ? $_REQUEST['custom_iop_course_id'] : '';

define("CANVAS_IOP_COURSE_ID", $custom_iop_course_id);

$custom_iop_syllabus_id = (isset($_REQUEST['custom_iop_syllabus_id']) && !empty($_REQUEST['custom_iop_syllabus_id'])) ? $_REQUEST['custom_iop_syllabus_id'] : '';

define("CANVAS_IOP_SYLLABUS_ID", $custom_iop_syllabus_id);

$custom_iop_step = (isset($_REQUEST['custom_iop_step']) && !empty($_REQUEST['custom_iop_step'])) ? $_REQUEST['custom_iop_step'] : 'xx';

define("CANVAS_IOP_STEP", $custom_iop_step);

$custom_iop_course_name = (isset($_REQUEST['custom_iop_course_name']) && !empty($_REQUEST['custom_iop_course_name'])) ? $_REQUEST['custom_iop_course_name'] : 'xx';

define("CANVAS_IOP_COURSE_NAME", $custom_iop_course_name);

$custom_iop_course_number = (isset($_REQUEST['custom_iop_course_number']) && !empty($_REQUEST['custom_iop_course_number'])) ? $_REQUEST['custom_iop_course_number'] : 'xx';

define("CANVAS_IOP_COURSE_NUMBER", $custom_iop_course_number);

$custom_iop_title = (isset($_REQUEST['custom_iop_title']) && !empty($_REQUEST['custom_iop_title'])) ? $_REQUEST['custom_iop_title'] : 'xx';

define("CANVAS_IOP_COURSE_TITLE", $custom_iop_title);



// Default: If server isn't defined, do this.

if (!defined('DB_NAME')) {

    define('DB_NAME', 'DBNAME');

}



if (!defined('DB_USER')) {

    define('DB_USER', 'DBUSER');

}



if (!defined('DB_PASSWORD')) {

    define('DB_PASSWORD', 'PASSWORD');

}



if (!defined('DB_HOST')) {

    define('DB_HOST', '127.0.0.1');

}



if (!defined('DB_HOST_SLAVE')) {

    define('DB_HOST_SLAVE', '127.0.0.1');

}



if (!defined('DB_CHARSET')) {

    define('DB_CHARSET', 'utf8');

}



if (!defined('DB_COLLATE')) {

    define('DB_COLLATE', 'utf8_unicode_ci');

}



if (!defined('IOP_SITEURL')) {

    define('IOP_SITEURL', 'https://iop.inside-out-project.com');

}



if (!defined('IOP_HOME')) {

    define('IOP_HOME', 'https://iop.inside-out-project.com');

}



if (!defined('IOP_DEBUG')) {

    define('IOP_DEBUG', false);

}



if (!defined('IOP_CACHE')) {

    define('IOP_CACHE', true);

}



$table_prefix = 'IOP_';



// Do you speak my language? e.g: 'en_GB';

define('LANG', 'en_GB');



// Authentication Unique Keys and Salts.

define('AUTH_KEY', '{2D-o5P8I%%w@i8X50z6W,*aW}f]lZUJU6D)bq-ExD>H-V8Oa&!c!]|xm/|?_5Kp');

define('SECURE_AUTH_KEY', '+DY>XY<sJcanhtH;CJZN-Q8>7l1=Kcs3*qvBF~8JZ=$TI4!wi`d+nD5rgivM$Z0Z');

define('LOGGED_IN_KEY', ' ;ao3|yAAEE&;^<h+Zg@5O-5{xzn_0lfsI 0=YEA+hItSH!mWHB0C*ai~aiMw;(p');

define('NONCE_KEY', 'gb!iu-,dFi{a+f[ZgyNJ@8Dk2sH44z+oa+gTR(vh-O`)Y=R-;|6;vupn#_}TA|9W');

define('AUTH_SALT', 'IW;ppF1G<zl %>]s|CoPn`+}A~~j|Jtn,Z(O+-$6 632<b3A=t8S:EU-mp3I`uKJ');

define('SECURE_AUTH_SALT', '9H0hb$w|Xzzd|#x,|wSi;o0S,<+B^fs[xY6Prkfy1Fhv:T/3+Zt>JAm4M,)G4c-^');

define('LOGGED_IN_SALT', '3+n- v7a&4X)gkY{Oh6]gEPa~3=7HapA;<mN-`L%4q/(l,OZ]w>Y%RAF5.?X_r{?');

define('NONCE_SALT', 'JX)i-<<o|azJVK|pu-t/#[8mA5**3c?coW8+SbzAh1--]]6Sw3(|)+u90;!(,mTL');



if (!defined('ABSPATH')) {

    define('ABSPATH', dirname(__FILE__) . '/');

}



//require_once(ABSPATH . 'wp-settings.php');



define("APP_SERVER", 'https://' . $_SERVER['HTTP_HOST'] . '/');

define("INCLUDE_PATH", APP_SERVER . 'assets/');

define("ASSETS_PATH", APP_SERVER . 'assets/');

define("IMAGES_PATH", ASSETS_PATH . 'images/');

define("IMG_BRAND_PATH", IMAGES_PATH . 'brand/');

define("CSS_PATH", ASSETS_PATH . 'css/');

define("JS_PATH", ASSETS_PATH . 'js/');

define("VENDOR_PATH", ASSETS_PATH . 'vendor/');



$requestOrigin = (isset($_GET['org']) && !empty($_GET['org'])) ? $_GET['org'] : false;

if (!$requestOrigin) {

    define("API_SERVER", 'https://dev01.inside-out-project.com/');

    define("REQORG", 'dev01');

} else {

    define("API_SERVER", 'https://iop.inside-out-project.com/inside/');

    define("REQORG", 'iop');

}

define("APP_CACHE", ABSPATH . 'insights/');

define("DEFAULT_EMPTY_STRING", '<h3>There currently is no information avaible for this section.</h3>');



$x = (isset($_POST['custom_sub_canvas_account_id']) && !empty($_POST['custom_sub_canvas_account_id'])) ? json_encode($_POST) : '{}';

define("CANVAS_INFO", $x);



$currentId = (isset($_GET['id']) && !empty($_GET['id'])) ? $_GET['id'] : 0;



$ptype = str_replace("lp_", "iop_", (isset($_GET['ptype']) && !empty($_GET['ptype'])) ? $_GET['ptype'] : 'home');

$parentPtype = $ptype;



$courseInformation = array("course_overview", "instructor_profile");

$globalInformation = array("semester_information", "student_responsibilities", "semester_information", "important_dates");

// Detailed information for variable data



//if($ptype == 'semester_information' || $ptype == 'course_overview' || $ptype == 'important_dates'){

if ((in_array($ptype, $courseInformation)) || (in_array($ptype, $globalInformation))) {

    $parentPtype = 'syllabus';

    $currentId = CANVAS_IOP_SYLLABUS_ID;

}



$viewPatches = (isset($_GET['viewPatches']) && !empty($_GET['viewPatches'])) ? $_GET['viewPatches'] : false;

$lesson = (isset($_GET['lesson']) && !empty($_GET['lesson'])) ? $_GET['lesson'] : 'all';

$admin = (isset($_GET['admin']) && !empty($_GET['admin'])) ? $_GET['admin'] : false;

$contentView = (isset($_GET['conv']) && !empty($_GET['conv'])) ? $_GET['conv'] : 'all';



$arr = (isset($_GET['so']) && !empty($_GET['so'])) ? $_GET['so'] : '';

$syllObjs = (strlen($arr) > 1) ? explode("-", $arr) : array();



$submitLesson = (isset($_GET['subLes']) && !empty($_GET['subLes'])) ? 1 : 0;



$coArr = (isset($_GET['co']) && !empty($_GET['co'])) ? $_GET['co'] : '';

$courseObjs = (strlen($coArr) > 1) ? explode("-", $coArr) : array();



$exView = (isset($_GET['exView']) && !empty($_GET['exView'])) ? $_GET['exView'] : 'all';

$tqView = (isset($_GET['tqView']) && !empty($_GET['tqView'])) ? $_GET['tqView'] : 'all';



$refFile = (isset($_GET['refFile']) && !empty($_GET['refFile'])) ? true : false;



$helpInformation = DEFAULT_EMPTY_STRING;

$contactInformation = DEFAULT_EMPTY_STRING;

$infoProf = DEFAULT_EMPTY_STRING;



$EDIT_POST_PATH = API_SERVER . 'wp-admin/post.php?post=' . $currentId . '&action=edit';



define("API_AJAX_URL", 'https://dev01.inside-out-project.com/wp-json/iop-app/v1/');

define("API_JSON_PATH", API_SERVER . 'wp-json/wp/v2/');

