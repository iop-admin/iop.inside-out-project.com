<?php

    // lesson resources div display dialog div in main page

?>

<div id="lessonResourcesDiv" class="resourceMenu">
    <div class="titleItem addResMenu">
        <button type="button" class="close resourceClose" aria-label="Close">
            <i class="far fa-times-circle"></i>
        </button>
        <i class="fa fa-laptop fa-lg"></i>
        <span class="ttlTxt"></span>
    </div>
    <div class="additional-resources-container">
        <div class="board">
            <div class="board-inner">
                <ul class="nav nav-tabs" id="resourceTabs">
                    <li class="" id="featured_videoResTabLi" style="display: none;"> <a href="#featured_videoResTab" data-toggle="tab" title="featured_videoResTab" aria-expanded="true"> <span class="round-tabs two"> <i class="fa fa-youtube"></i> Videos</span> </a> </li>
                    <li class="" id="webtoolResTabLi" style="display: none;"> <a href="#webtoolResTab" data-toggle="tab" title="webtoolResTab" aria-expanded="false"> <span class="round-tabs two"> <i class="fa fa-book"></i> Web Tools</span> </a> </li>
                    <li class="" id="webpageResTabLi" style="display: none;"> <a href="#webpageResTab" data-toggle="tab" title="webpageResTab" aria-expanded="false"> <span class="round-tabs two"> <i class="fas fa-external-link-alt"></i> Web Pages</span> </a> </li>
                    <li class="" id="codeResTabLi" style="display: none;"> <a href="#codeResTab" data-toggle="tab" title="codeResTab" aria-expanded="false"> <span class="round-tabs two"> <i class="fa fa-code"></i> Code</span> </a> </li>
                </ul>
            </div>
            <div class="tab-content">
                <div class="tab-pane" id="featured_videoResTab" style="display: none;"></div>
                <div class="tab-pane" id="webtoolResTab" style="display: none;"></div>
                <div class="tab-pane" id="webpageResTab" style="display: none;"></div>
                <div class="tab-pane" id="codeResTab" style="display: none;"></div>
            </div>
        </div>
    </div>
</div>