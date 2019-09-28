<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Document</title>
     <script>
          var reqInfoObj = <?php echo json_encode($_REQUEST); ?>;
     </script>
</head>
<body>
<?php
/*
foreach ( $_REQUEST as $key => $value ) {
     echo '<p>' . $key . ' = ' . $value . '</p>';
}
*/

$grade = rand( 5, 100 );

$submission_status = 'submitted'; //pulled from the last name in the

$content = 'sfgsdgdf';


$course = ( isset( $_POST[ 'custom_sub_canvas_course_id' ] ) && !empty( $_POST[ 'custom_sub_canvas_course_id' ] ) ) ? $_POST[ 'custom_sub_canvas_course_id' ] : 'na';

$studentId = ( isset( $_POST[ 'user_id' ] ) && !empty( $_POST[ 'user_id' ] ) ) ? $_POST[ 'user_id' ] : 'na';

$assignment_id = ( isset( $_POST[ 'custom_sub_canvas_assignment_id' ] ) && !empty( $_POST[ 'custom_sub_canvas_assignment_id' ] ) ) ? $_POST[ 'custom_sub_canvas_assignment_id' ] : 'na';
     
$throwLink = "https://racc.instructure.com/api/v1/courses/$course/assignments/$assignment_id/submissions/".$_POST[ 'user_id' ];
     
     
$postdata = array(

     "access_token" => "5647~On8bD2DAi0F3n5DSQ1Rd976mBUQ180nGEyRMoLNMJY5xtwo4WxjoIgy6XPo0OVK6",

     "submission[posted_grade]" => $grade,

     "preview_url" => "https://inside-out-project.com",
     
     //"grader_id" => $_POST[ 'user_id' ],

     "comment[text_comment]" => "text_comment",

     "submission[workflow_state]" => "submitted",

     "submission[submission_type]" => "online_url",

     "submission[url]" => "https://inside-out-project.com",
     
     "comment[text_comment]" => "Great Job!",

     "oauth_consumer_key" => $_POST[ 'oauth_consumer_key' ],

     "oauth_nonce" => $_POST[ 'oauth_nonce' ],

     "oauth_signature" => $_POST[ 'oauth_signature' ],

     "oauth_signature_method" => $_POST[ 'oauth_signature_method' ],

     "oauth_timestamp" => $_POST[ 'oauth_timestamp' ],

     "oauth_version" => $_POST[ 'oauth_version' ]


);

$data_string = json_encode( $postdata );

$curl = curl_init();

curl_setopt_array( $curl, array(

     CURLOPT_URL => $throwLink,

     CURLOPT_RETURNTRANSFER => true,

     CURLOPT_ENCODING => "",

     CURLOPT_MAXREDIRS => 10,

     CURLOPT_TIMEOUT => 30,

     CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,

     CURLOPT_CUSTOMREQUEST => "POST",

     CURLOPT_POSTFIELDS => $data_string,

     CURLOPT_HTTPHEADER => array(

          "Content-Type: application/json",

          "cache-control: no-cache",

          'Content-Length: ' . strlen( $data_string )

     ),

) );


$response = curl_exec( $curl );

$err = curl_error( $curl );

curl_setopt( $curl, CURLOPT_HEADER, true );

curl_setopt( $curl, CURLOPT_NOBODY, true );

$header_data = curl_getinfo( $curl );

$fgfgf = json_encode( $header_data );

$file = fopen( 'lti-testing-assignment.json', 'w' );

fwrite( $file, $fgfgf . ' | ' . json_encode( $response . responseText ) );

fclose( $file );


curl_close( $curl );


if ( $err ) {

     echo "cURL Error #:" . $err;

} else {

     echo $throwLink;

     echo $response;

}

     //echo "<script>var reqInfo =  ".json_encode($_REQUEST)."</script>";
?>
<?php
/*







$.ajax({

	method: 'POST',

     dataType: "json",

	headers: {

		'Content-Type': 'application/json'

	},

	url:'/api/v1/courses/11228/assignments/277564/submissions/16533',

	data: {

		"access_token" : "5647~12BRcy4M3F3RZni6eQCj2CQ9aG0MUIaSimEqKMVBllHkhOnmqy4WPbpIs3xY72me",

		"submission" : {

			"posted_grade" : 52,

			"grade" : 52,

			"submission_type" :"url",

			"workflow_state" : "pending_review",

			"url" : "https://google.com",

			"attempt" : 6

		},

		"comment" : {

			"text_comment" : "Comeon"

		},

		"seconds_late": 300,

		"points_deducted": 12.3,

		"late": true

	}

}).done(function(r) {

     console.log(r)

}).error(function(r) {

     console.log(r.responseText)

})







*/


?>
</body>
</html>
