<?php

// important dates page display
$semesterArray = json_decode(json_encode($obj->semester[0]), true);
$syllabusObjects = json_decode(json_encode($obj->syllabus_objects), true);

if (count($syllabusObjects) > 0) {
    foreach ($syllabusObjects as $key => $value) {
        echo semInfoBlk($syllabusObjects[$key][post_title], $syllabusObjects[$key][post_content]);
    }
}

if (count($semesterArray) > 0) {
    $bldr = '';
    foreach ($semesterArray[no_classes] as $key => $value) {
        $bldr = $bldr . '<li>' . $semesterArray[no_classes][$key][start] . ' | ' . $semesterArray[no_classes][$key][post_title] . ' </li>';
    }
}
echo semInfoBlk('Dates There Are No Classes', $bldr);

if (count($semesterArray) > 0) {
    $bldr = '';
    foreach ($semesterArray[other_dates] as $key => $value) {
        $bldr = $bldr . '<li>' . $semesterArray[other_dates][$key][start] . ' | ' . $semesterArray[other_dates][$key][post_title] . ' </li>';
    }
}
echo semInfoBlk('Other Semester Dates', $bldr);

if (count($semesterArray) > 0) {
    $bldr = '';
    foreach ($semesterArray[campus_closed] as $key => $value) {
        $bldr = $bldr . '<li>' . $semesterArray[campus_closed][$key][start] . ' | ' . $semesterArray[campus_closed][$key][post_title] . ' </li>';
    }
}
echo semInfoBlk('Important Semester Dates', $bldr);
