<?php

// course information
$semesterArray = json_decode(json_encode($obj->semester[0]), true);
$syllabusObjects = json_decode(json_encode($obj->syllabus_objects), true);
$onlineInfoObjects = json_decode(json_encode($obj->online_course_information), true);
$gradeInfoObjects = json_decode(json_encode($obj->grading_policy), true);
$requiredResourcesObjects = json_decode(json_encode($obj->required_resources), true);
$prerequisiteCoursesObjects = json_decode(json_encode($obj->prerequisite_courses), true);
$prerequisiteOfObjects = json_decode(json_encode($obj->prerequisite_of), true);

$prerequisiteInfo = '';
if (count($prerequisiteCoursesObjects) > 0) {
    $prerequisiteInfo = $prerequisiteInfo . '<div class="col-sm-12"><strong>Prerequisite Courses</strong></div>';
    $prerequisiteInfo = $prerequisiteInfo . '<div class="col-sm-12"><small>Courses that must be complete/pass before taking this class.</small></div>';
    foreach ($prerequisiteCoursesObjects as $key => $value) {
        $prerequisiteInfo = $prerequisiteInfo . '<div class="col-sm-12">' . $prerequisiteCoursesObjects[$key][course_number] . ' ' . $prerequisiteCoursesObjects[$key][post_title] . '</div>';
    }
}

if (count($prerequisiteOfObjects) > 0) {
    $prerequisiteInfo = $prerequisiteInfo . '<div class="col-sm-12"><strong>Prerequisite Of</strong></div>';
    $prerequisiteInfo = $prerequisiteInfo . '<div class="col-sm-12"><small>Courses that require this course to be completed and passed before taking the class.</small></div>';
    foreach ($prerequisiteOfObjects as $key => $value) {
        $prerequisiteInfo = $prerequisiteInfo . '<div class="col-sm-12">' . $prerequisiteOfObjects[$key][course_number] . ' ' . $prerequisiteOfObjects[$key][post_title] . '</div>';
    }
}

$xInfo = '<div class="container">';
$xInfo = $xInfo . '<div class="row">';
$xInfo = $xInfo . '<div class="col-sm-5 container">';
$xInfo = $xInfo . '<div class="row">';
$xInfo = $xInfo . '<div class="col-sm-12"><strong>Course Details</strong></div>';
$xInfo = $xInfo . '<div class="col-sm-6">Academic Year: </div><div class="col-sm-6">' . $semesterArray[academic_year] . '</div>';
$xInfo = $xInfo . '<div class="col-sm-6">Term: </div><div class="col-sm-6">' . $semesterArray[term] . '</div>';
$xInfo = $xInfo . '<div class="col-sm-6">Course Number: </div><div class="col-sm-6">' . $obj->course_number . '</div>';
$xInfo = $xInfo . '<div class="col-sm-6">Section Number: </div><div class="col-sm-6">' . $obj->section_number . '</div>';
$xInfo = $xInfo . '<div class="col-sm-6">Credit Hours: </div><div class="col-sm-6">' . $obj->credit_hours . '</div>';
$xInfo = $xInfo . '</div>';
$xInfo = $xInfo . '</div>';
$xInfo = $xInfo . '<div class="col-sm-5 container">';
$xInfo = $xInfo . '<div class="row">';
$xInfo = $xInfo . $prerequisiteInfo;
$xInfo = $xInfo . '</div>';
$xInfo = $xInfo . '</div>';
$xInfo = $xInfo . '</div>';
$xInfo = $xInfo . '</div>';

echo semInfoBlk('Course Details', $xInfo);

echo semInfoBlk('Course Description', $obj->content->rendered);

echo semInfoBlk('Rationale of Course', $obj->course_rational);

$instructorInfo = '';
if (count($syllabusObjects) > 0) {
    foreach ($syllabusObjects as $key => $value) {
        if ($syllabusObjects[$key][syllabus_object_focus] == 'conInfo') {
            $instructorInfo = $instructorInfo . $syllabusObjects[$key][post_content];
        }
    }
}

echo semInfoBlk('Professor Information', '<strong>Name<br /></strong><p style="padding-left: 40px;">' . $obj->instructor_display_name . '</p>' . $instructorInfo);

echo semInfoBlk($gradeInfoObjects[0][post_title], $gradeInfoObjects[0][post_content]);

echo semInfoBlk($onlineInfoObjects[0][post_title], $onlineInfoObjects[0][post_content]);

$requiredResources = '';
if (count($requiredResourcesObjects) > 0) {
    foreach ($requiredResourcesObjects as $key => $value) {
        $requiredResources = $requiredResources . '<li>' . $requiredResourcesObjects[$key][post_title] . '</li>';
    }
}

echo semInfoBlk('Required Resources', $requiredResources);
