<?php







$grade = rand( 5, 100 );



$submission_status = 'submitted'; //pulled from the last name in the





/*

$sid = $data[ 'student' ][ 'last_name' ]; //pulled from the last name in the

$aid = substr( $data[ 'assignment' ][ 'name' ], -6 ); //assignment id

$teacher_url = urlencode( utf8_decode( $data[ 'submission' ][ 'teacher_url' ] ) ); //pulled from the last name in the

$student_url = urlencode( utf8_decode( $data[ 'submission' ][ 'student_url' ] ) ); //pulled from the last name in the

$course = ( isset( $_GET[ 'course' ] ) && !empty( $_GET[ 'course' ] ) ) ? $_GET[ 'course' ] : 'na';

*/

// $aid = '295182'; //assignment id

$aid = $_POST['custom_sub_canvas_assignment_id'];

$teacher_url = urlencode( 'http://inside-out-project.com' ); //pulled from the last name in the

$student_url = urlencode( $_SERVER['HTTP_HOST'] ); //pulled from the last name in the

//$surl = urlencode( utf8_decode('https://inside-out-project.com') ); //pulled from the last name in the



$studentId = '16533';



$course = $_POST['custom_sub_canvas_course_id'];

// $course = '16533';

 $content = 'sfgsdgdf';

/*

$embAssign = urlencode('<p><iframe src="https://repl.it/student_embed/assignment/2801784/4d892a93611ac31543426f3046121499" width="100%" height="600px"></iframe></p>');

*/





	$postdata = array(

		"access_token" => "5647~On8bD2DAi0F3n5DSQ1Rd976mBUQ180nGEyRMoLNMJY5xtwo4WxjoIgy6XPo0OVK6",

		//"submission[posted_grade]" => $grade,

		"preview_url" => $student_url,

		"comment[text_comment]" => $student_url,

		"submission[workflow_state]" => "submitted",

		"submission[submission_type]" => "online_text_entry",

		"comment[text_comment]" => "Great Job!",

		//"submission[posted_grade]" => $grade,

		"oauth_consumer_key" => $_POST['oauth_consumer_key'],

		"oauth_nonce" => $_POST['oauth_nonce'],

		"oauth_signature" => $_POST['oauth_signature'],

		"oauth_signature_method" => $_POST['oauth_signature_method'],

		"oauth_timestamp" => $_POST['oauth_timestamp'],

		"oauth_version" => "1.0"



	);

	$data_string = json_encode($postdata);



	$throwLink = 'https://racc.instructure.com/api/v1/courses/12336/assignments/327447/submissions/16533?submission[grade]50&submission[workflow_state]=submitted&submission[posted_grade]=50&access_token=5647~On8bD2DAi0F3n5DSQ1Rd976mBUQ180nGEyRMoLNMJY5xtwo4WxjoIgy6XPo0OVK6';

	//$throwLink = "https://racc.instructure.com/api/v1/courses/$course/assignments/$aid/submissions/$studentId";

	//$throwLink = "https://racc.instructure.com/api/lti/v1/tools/10595/ext_grade_passback";

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

					'Content-Length: ' . strlen($data_string)

     ),

) );



$response = curl_exec( $curl );

$err = curl_error( $curl );

curl_setopt($curl, CURLOPT_HEADER, true);

curl_setopt($curl, CURLOPT_NOBODY, true);

$header_data= curl_getinfo($curl);



$fgfgf = json_encode($header_data);



$file = fopen( 'webhooks-results.json', 'w' );

fwrite( $file, $fgfgf.' | '.json_encode($response.responseText));

fclose( $file );







curl_close( $curl );



if ( $err ) {

     echo "cURL Error #:" . $err;

} else {

	echo $throwLink;

     echo $response;

}





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

