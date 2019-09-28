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

$aid = '277564'; //assignment id

$teacher_url = urlencode( 'http://inside-out-project.com' ); //pulled from the last name in the

$student_url = urlencode( $_SERVER['HTTP_HOST'] ); //pulled from the last name in the

//$surl = urlencode( utf8_decode('https://inside-out-project.com') ); //pulled from the last name in the



$course = '11228';

 $content = 'sfgsdgdf';



$embAssign = urlencode('<p><iframe src="https://repl.it/student_embed/assignment/2801784/4d892a93611ac31543426f3046121499" width="100%" height="600px"></iframe></p>');



// https://racc.instructure.com/api/v1/courses/11228/assignments/277564/submissions/16533?submission[grade]50&submission[workflow_state]=submitted&access_token=5647~12BRcy4M3F3RZni6eQCj2CQ9aG0MUIaSimEqKMVBllHkhOnmqy4WPbpIs3xY72me&submission[posted_grade]=50'





	$postdata = array(

		"access_token" => "5647~12BRcy4M3F3RZni6eQCj2CQ9aG0MUIaSimEqKMVBllHkhOnmqy4WPbpIs3xY72me",

		"submission[posted_grade]" => $grade,

		"preview_url" => $student_url,

		"comment[text_comment]" => $student_url,

		"submission[workflow_state]" => "submitted",

		"submission[submission_type]" => "online_text_entry",

		"comment[text_comment]" => "Great Job!",

		"submission[posted_grade]" => $grade,

		"oauth_consumer_key" => "5647~a48hsnMyuh7i6qsdkUzErAIAXqdw8DV1d2GxmYJlCSiKWNJLW8GO5zmrApc3jWzm",

		"oauth_nonce" => "OVdXzdWp7iVONgUW2bSlFMilRlhBr7fbKaungiH1AI",

		"oauth_signature" => "Vfn9%2Ft1dMNz68qLE2REkiat5Vi8%3D",

		"oauth_signature_method" => "HMAC-SHA1",

		"oauth_timestamp" => "1555799317",

		"oauth_version" => "1.0"



	);

	$data_string = json_encode($postdata);





$curl = curl_init();



curl_setopt_array( $curl, array(

     CURLOPT_URL => "https://racc.instructure.com/api/v1/courses/$course/assignments/$aid/submissions/$sid",

		 // CURLOPT_URL => "https://racc.instructure.com/api/lti/v1/tools/10512/ext_grade_passback",

     CURLOPT_RETURNTRANSFER => true,

     CURLOPT_ENCODING => "",

     CURLOPT_MAXREDIRS => 10,

     CURLOPT_TIMEOUT => 30,

     CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,

     CURLOPT_CUSTOMREQUEST => "POST",

     CURLOPT_POSTFIELDS => $data_string,

     CURLOPT_HTTPHEADER => array(

          "Content-Type: application/json",

          'data: {"username":"xyz","password":"xyz"}',

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

fwrite( $file, $fgfgf.' | '.json_encode($response));

fclose( $file );







curl_close( $curl );



if ( $err ) {

     //echo "cURL Error #:" . $err;

} else {

     //echo $response;

}





?>

