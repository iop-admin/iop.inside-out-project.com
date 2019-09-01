<?php

// important dates page display

$prerequisiteCourses = '';
$prerequisiteCoursesArray = json_decode( json_encode( $obj->prerequisite_courses ), true );
if(count($prerequisiteCoursesArray)> 0){
    foreach ( $prerequisiteCoursesArray as $key => $value ) {
        $prerequisiteCourses = $prerequisiteCourses.'    |   '.$prerequisiteCoursesArray[$key][post_content];
    }    
}else{
    echo '<li>There are no Prerequisite Courses</li>';
}


?>
<section class="syllabus">
    <header>
        <h2>READING AREA COMMUNITY COLLEGE</h2>
        <h2>Course Syllabus</h2>
    </header>
    <article>
        <h3>MASTER SECTION</h3>
        <ol type="I">
            <li>
                <h4>BASIC COURSE INFORMATION</h4>
                <ol type="A">
                    <li><span class="inoLable">Course Title:</span> <?php echo $obj->title->rendered; ?></li>
                    <li><span class="inoLable">Course Number:</span> <?php echo $obj->course_number; ?></li>
                    <li><span class="inoLable">Credit Hours:</span> <?php echo $obj->credit_hours; ?></li>
                    <li><span class="inoLable">Prerequisite(s):</span> <?php echo $prerequisiteCourses; ?></li>
                </ol>
            </li>
            <li>
                <h4>COURSE DESCRIPTION</h4>
                <ol type="A">
                    <li class="content"><?php echo $obj->content->rendered; ?></li>
                </ol>
            </li>
            <li>
                <h4>RATIONALE OF COURSE</h4>
                <ol type="A">
                    <li class="content"><?php echo $obj->course_rational; ?></li>
                </ol>
            </li>
            <li>
                <h4>COURSE COMPETENCIES</h4>
                <p>Upon successful completion of this course, the student should be able to:</p>
                <ol type="A">
                    <?php
                        $courseCompetencies = '';
                        $courseCompetenciesArray = json_decode( json_encode( $obj->course_competencies ), true );
                        if(count($courseCompetenciesArray)> 0){
                            foreach ( $courseCompetenciesArray as $key => $value ) {
                                echo '<li>'.$courseCompetenciesArray[$key][post_title].'</li>';
                            }    
                        }else{
                            echo '<li>There are no Prerequisite Courses</li>';
                        }
                    ?>
                </ol>
            </li>
        </ol>
    </article>
    <article>
        <h3>INDIVIDUAL INSTRUCTOR SECTION</h3>
        <ol type="I">
            <li><h4>BASIC COURSE INFORMATION</h4>
                <ol type="A">
                    <li><span class="inoLable">Course Title:</span> <?php echo $obj->title->rendered; ?></li>
                    <li><span class="inoLable">Course Number:</span> <?php echo $obj->course_number; ?></li>
                    <li><span class="inoLable">Credit Hours:</span> <?php echo $obj->credit_hours; ?></li>
                    <li><span class="inoLable">Prerequisite(s):</span> <?php echo $prerequisiteCourses; ?></li>
                    <li><span class="inoLable">Instructor:</span> <?php echo $obj->instructor_display_name; ?></li>
                    <li><span class="inoLable">Term and Academic Year:</span> <?php echo $obj->semester[ 0 ]->term; ?>
                        <?php echo $obj->semester[ 0 ]->academic_year; ?></li>
                </ol>
            </li>
            <li><h4>INSTRUCTIONAL MATERIALS</h4>
                <p>Upon successful completion of this course, the student should be able to:</p>
                <ol type="A">
                    <?php
                        $requiredResources = '';
                        $requiredResourcesArray = json_decode( json_encode( $obj->required_resources ), true );
                        if(count($requiredResourcesArray)> 0){
                            foreach ( $requiredResourcesArray as $key => $value ) {
                                echo '<li>'.$requiredResourcesArray[$key][post_title].'</li>';
                            }    
                        }else{
                            echo '<li>There are no resources required</li>';
                        }
                    ?>
                </ol>
            </li>
            <li><h4>COURSE COMPETENCIES and PERFORMANCE OBJECTIVES</h4>
                <p>Upon successful completion of this course, the student should be able to:</p>
                <ol type="A">
                    <?php
                        $courseCompetenciesArray = json_decode( json_encode( $obj->course_competencies ), true );
                        if(count($courseCompetenciesArray)> 0){
                            foreach ( $courseCompetenciesArray as $key => $value ) {
                                echo '<li><strong>Competency:</strong> '.$courseCompetenciesArray[$key][post_title];
                                $performanceObjArray = json_decode( json_encode( $courseCompetenciesArray[$key][performance_obj] ), true );
                                if(count($performanceObjArray)> 0){
                                    echo '<ul><li>Performance Objectives:</li>';
                                    foreach ( $performanceObjArray as $key => $value ) {
                                        echo '<li>'.$performanceObjArray[$key][post_title].'</li>';
                                    }
                                    echo '</ul>';
                                }
                                echo '</li>';
                            }    
                        }else{
                            echo '<li>There are no Prerequisite Courses</li>';
                        }
                    ?>
                </ol>
            </li>
            <li><h4>GRADING POLICY</h4>
                <ol type="A">
                    <li class="content"><?php echo $obj->grading_policy[0]->post_content; ?></li>
                </ol>
            </li>
            <li><h4>ATTENDANCE POLICY</h4>
                <ol type="A">
                    <li class="content"><?php echo $obj->attendance_policy[0]->post_content; ?></li>
                </ol>
            </li>
            <li><h4>CLASSROOM ETIQUETTE POLICY</h4>
                <ol type="A">
                    <li class="content"><?php echo $obj->classroom_etiquette_policy[0]->post_content; ?></li>
                </ol>
            </li>
            <li><h4>OTHER INFORMATION</h4>
                <ol type="A">
                    <?php
                        $syllabusObjectsArray = json_decode( json_encode( $obj->syllabus_objects ), true );
                        if(count($syllabusObjectsArray)> 0){
                            foreach ( $syllabusObjectsArray as $key => $value ) {
                                echo '<li><strong>'.$syllabusObjectsArray[$key][post_title].'</strong><p>'.$syllabusObjectsArray[$key][post_content].'</p></li>';
                            }    
                        }else{
                            echo '<li>There are no resources required</li>';
                        }
                    ?>
                </ol>
            </li>
            <li><h4>ONLINE COURSE INFORMATION</h4>
                <ol type="A">
                    <li class="content"><?php echo $obj->online_course_information[0]->post_content; ?></li>
                </ol>
            </li>
            <li><h4>ASSIGNMENT & LECTURE SCHEDULE</h4>
                <ol type="A">
                    <li class="content"><?php echo $obj->assignment_and_lecture_schedule[0]->post_content; ?></li>
                </ol>
            </li>
            <li><h4>STUDENT RESPONSIBILITIES</h4>
                <ol type="A">
                    <li class="content"><?php echo $obj->student_responsibilities[0]->post_content; ?></li>
                </ol>
            </li>
        </ol>
    </article>
    <footer>Last updated <?php echo $fileUpdateTime; ?></footer>
</section>

<style>
    .syllabus header {
        text-align: center;
    }

    .syllabus header h2:nth-of-type(2) {
        font-size: 1rem !important;
    }
    span.inoLable {
    width: 200px;
    display: -webkit-inline-box;
    padding: 6px;
    font-weight: 600;
}
.syllabus h4 {
    margin-top: 20px;
}
.syllabus li.content {
    list-style: none;
    margin-right: 10%;
}
    .syllabus footer {
        text-align: right;
        font-size: small;
        text-decoration: overline;
        font-weight: 500;
        color: #999;
    }
</style>