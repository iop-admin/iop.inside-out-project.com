<?php

    // important dates page display


    echo '<section>';

    echo '<h3>'.$parentPtype.'</h3>';
    echo '<h3>'.$ptype.'</h3>';

   echo '<h4>Dates There Are No Classes</h4>';

   echo '<ul>';

   $semesterArray = json_decode( json_encode( $obj->semester[ 0 ] ), true );
   
   if(count($semesterArray)> 0){
         foreach ( $semesterArray[no_classes] as $key => $value ) {
              echo '<li>'.$semesterArray[no_classes][$key][start] .' | '.$semesterArray[no_classes][$key][post_title] .' </li>';
         }    
   }else{
         echo '<li>No dates found for this semester.</li>';
   }
  
   echo '</ul>';
   
   echo '</section>';  




   echo '<section>';

   echo '<h4>Other Semester Dates</h4>';

   echo '<ul>';
   
   if(count($semesterArray)> 0){
         foreach ( $semesterArray[other_dates] as $key => $value ) {
              echo '<li>'.$semesterArray[other_dates][$key][start] .' | '.$semesterArray[other_dates][$key][post_title] .' </li>';
         }    
   }else{
         echo '<li>No dates found for this semester.</li>';
   }
  
   echo '</ul>';
   
   echo '</section>';  


   echo '<section>';

   echo '<h4>Important Semester Dates</h4>';

   echo '<ul>';
   
   if(count($semesterArray)> 0){
         foreach ( $semesterArray[campus_closed] as $key => $value ) {
              echo '<li>'.$semesterArray[campus_closed][$key][start] .' | '.$semesterArray[campus_closed][$key][post_title] .' </li>';
         }    
   }else{
         echo '<li>No dates found for this semester.</li>';
   }
  
   echo '</ul>';
   
   echo '</section>';  



?>
