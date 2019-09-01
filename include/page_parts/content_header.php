<?php



    // content header in main page



?>



<div id="course-item-content-header">

    <div id="headerMainTitle">Title Here</div>

    <div id="headerMenu">

        <button id="nwBtn" href="" title="Open this page in a new window." name="nwBtn"><i class="fas fa-expand-arrows-alt"></i></button>

        <button id="leEditLinkBtn" href="" title="Edit this lesson." onclick="window.open('<?php echo $EDIT_POST_PATH; ?>', '_blank')" name="editLessonBtn"><i class="fas fa-pen-square"></i></button>

        <button id="clearCacheBtn" href="" title="Delete this from cache" onclick="clearCache('<?php echo $currentId; ?>')" name="clearCacheBtn"><i class="fas fa-trash-alt"></i></button>

        <button id="slackBtn" href="" title="Go to Slack." onclick="window.open('https://raccreallife.slack.com/messages/C2VTB93KJ/', '_blank')" name="slackBtn"><i class="fab fa-slack-hash"></i></button>

        <button id="printBtn" href="" title="Print Page" onclick="printElement('section')" name="printBtn"><i class="fas fa-print"></i></button>

        <button id="speakBtn" href="#" title="Choose the language you are most comfortable with." name="speakBtn"><i class="fas fa-volume-up"></i></button>

        <button id="google_translate_element" href="" title="Choose the language you are most comfortable with." name="google_translate_element"></button>

        <button id="helpBtn" href="" title="Get help here" onclick="getPageLink('https://inside-out-project.com/make-appointment/?iframe=true', 'Schedule Office Hours')" name="helpBtn"><i class="fas fa-question"></i></button>

        <button id="contactBtn" href="" title="Contact you professor here." onclick="getPageLink('https://inside-out-project.com/contact-me/?iframe=true', 'Contact Your Professor')" name="contactBtn"><i class="fas fa-envelope"></i></button>

        <i id="menSlidIcon" class="fas fa-link menSlidIconCls" style="position: absolute;font-size: xx-large;color: #FFF;margin-left: -50px;margin-top: 8px;"></i>

    </div>

</div>