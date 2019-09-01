<?php

require_once 'include/core/header.inc.php';
/*
if ( $admin ) {
echo '<div id="wpadminbar" style="display:none;"></div>';
}

switch($ptype) {
case 'iop_course':
case 'iop_lesson':
case 'iop_assignment':
case 'iop_course':
echo '<section>';
$json = file_get_contents( API_SERVER . 'wp-json/wp/v2/users/1' );
$obj = json_decode( $json );
echo '<h2 id="meet-your-instructor-slash-professor">' . $obj->name . '</h2>';
$description = nl2br( stripcslashes( $obj->description ) );
echo '<div>' . $description . '</div>';
echo '</section>';
break;
case 'sylObjs':
$array = json_decode( json_encode( $obj->syllabuses[ 0 ]->syllabus_objects ), true );
$arrlength = count( $syllObjs );
for ( $x = 0; $x < $arrlength; $x++ ) {
echo '<h2>' . $array[ $syllObjs[ $x ] ][ post_title ]. '</h2>';
echo '<div style="margin-left:20px;">' . $array[ $syllObjs[ $x ] ][ post_content ]. '</div>';
}
break;
default:
echo '<section>';
echo '<div class="content-item-description"></div>';
echo '</section>';
}

if($ptype == 'iop_course' || $ptype == 'iop_lesson' || $ptype == 'iop_assignment' || $ptype == 'lp_course' || $ptype == 'lp_lesson' || $ptype == 'lp_assignment'){

echo '<section>';
//echo '<div class="learning_objectives"></div>';
switch ( $contentView ) {

case "seminf":

echo '<h2>' . $obj->syllabuses[ 0 ]->course_number . ' | ' . $obj->syllabuses[ 0 ]->post_title . '</h2>';

if(count( $syllObjs ) > 0){

for ( $x = 0; $x < count( $syllObjs ); $x++ ) {
echo '<h3 style="margin-left:15px;">' . $syllabusObjectsArray[ $syllObjs[ $x ] ][ post_title ]. '</h3>';
echo '<div style="margin-left:30px;">' . $syllabusObjectsArray[ $syllObjs[ $x ] ][ post_content ]. '</div>';
}

}

if(count( $courseObjs ) > 0){

for ( $x = 0; $x < count( $courseObjs ); $x++ ) {
echo '<h3 style="margin-left:15px;">' . $courseObjectsArray[ $courseObjs[ $x ] ][ post_title ]. '</h3>';
echo '<div style="margin-left:30px;">' . $courseObjectsArray[ $courseObjs[ $x ] ][ post_content ]. '</div>';
}

}

break;

case "courseObjs":

$array = json_decode( json_encode( $obj->syllabuses[ 0 ]->course_objects ), true );

$arrlength = count( $courseObjs );

for ( $x = 0; $x < $arrlength; $x++ ) {
echo '<h2>' . $array[ $courseObjs[ $x ] ][ post_title ]. '</h2>';
echo '<div style="margin-left:20px;">' . $array[ $courseObjs[ $x ] ][ post_content ]. '</div>';
}

break;

case "introInfo":

echo '<h2>' . $obj->syllabuses[ 0 ]->course_number . ' | ' . $obj->syllabuses[ 0 ]->post_title . '</h2>';

echo $obj->syllabuses[ 0 ]->post_content;

echo $obj->syllabuses[ 0 ]->course_rational;

break;

default:

echo '<h2 id="' . $obj->slug . '">' . $obj->title->rendered . '</h2>';
//echo $content;
echo $obj->content->rendered;
if($obj->code_example){
$result = rawurlencode($obj->code_example);
//echo '<div id="lesson_example_wrapper" class="lo_example_wrapper"><div class="example-title">Consider the following example:</div><iframe src="https://trinket.io/tools/1.0/jekyll/embed/html#code='.$result.'" width="100%" height="200" allowfullscreen="" class="lazy lazyloaded"></iframe></div>';

$codeEx = str_replace('{{ASSIGNMENT_DATE}}',date("l jS \of F Y") .' Class Assignment',$obj->code_example);

$codeEx = str_replace('<title></title>','<title>' . $obj->title->rendered .' Code Example</title>',$codeEx);

echo '<script type="text/javascript">(function(d,l,s,i,c){function n(e){e=e.nextSibling;return (!e||e.nodeType!=3)?e:n(e);};function r(f){/in/.test(d.readyState) ? setTimeout(function(){r(f);},9):f()};l=d.getElementsByTagName(\'script\');s=l[l.length-1];r(function(){i=n(s),c=n(i);i.setAttribute(\'src\',\'https://trinket.io/tools/1.0/jekyll/embed/html#code=\'+encodeURIComponent(c.nodeValue.replace(/^\s+|\s+$/g,\'\')));});})(document)</script><iframe width="100%" height="400" frameborder="0" marginwidth="0" marginheight="0" class="lazyload" allowfullscreen></iframe><!-- '.$codeEx.' -->';
}
}

}
 */




$keyVal = ($parentPtype !== $ptype)? $parentPtype : $ptype;

switch ($keyVal) {

     case "syllabus":
          include($_SERVER['DOCUMENT_ROOT'].'/include/page_parts/'.$ptype.'.php');
         break;

     case "blue":
         echo "blue!";
         break;
     case "iop_lesson":
     case "lp_lesson":
     default:
          include($_SERVER['DOCUMENT_ROOT'].'/include/page_parts/main_video_div.php');
          echo '<div class="actionItemsTtl rsvp deep-dark-blue-text"><i class="fas fa-bolt"></i> Action Items:</div>';
          echo '<section>';
          echo '<div class="content-item-description"></div>';
          echo '</section>';
}





require_once 'include/core/footer.inc.php';
