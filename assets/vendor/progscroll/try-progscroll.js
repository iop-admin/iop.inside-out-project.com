// JavaScript Document


/*

     CSS to be added
     
     
    .progress-bar {
      background-color: #2196f3;
      bottom: 0;
      position: fixed;
      border:thin #333 solid;
      border-radius: 0px 10px 10px 0px;
      height: 44px;
      left: 0;
      bottom: 20px
    }

     
     Script to be added
     
     <script src="https://cdnjs.cloudflare.com/ajax/libs/scrollprogress/3.0.2/scrollProgress.min.js"></script>



*/

// JavaScript Document
// JavaScript Document

jQuery.noConflict();

'use strict';

loader('Loading Application', 'app-root', 1);

var app_version = '1.0.0.4';
var sitePath = 'https://dev01.inside-out-project.com/';
var globalResourcesPath = 'https://dev01.inside-out-project.com/global_resources/';
var appPath = sitePath + 'iop-canvas-app/';
var includesPath = appPath + 'includes/';
var adminPath = sitePath + 'wp-admin/';
var defaultApi = sitePath + 'wp-json/wp/v2/';

var globalResourcesPath = sitePath + 'global_resources/';
var globalIcons = globalResourcesPath + 'icons/';
var loaderPagesPath = globalResourcesPath + 'loader-pages/';
var topTabs = {};
var resourceList = [];
var ignoreLink = ['login', '#', 'wp-admin'];
var curId = '';
var isAdminUser = 0;
var codeExHVal = 20;
var curPType = 'lp_lesson';
var isInIFrame = (window.location !== window.parent.location);
topTabs.webtool = '';
topTabs.webpage = '';
topTabs.videos = '';
topTabs.code = '';
thereAreLPResources = 0;
thereAreLOResources = 0;




jQuery.each(getUrlVars(window.location.href), function(i, val) {
    console.log('          vars: ' + i + ' | ' + val);
});
console.log('canInf: ' + canInf);


var isAssign = getUrlParam('as', false);


var progressBar = document.querySelector('.progress-bar');

function onProgress(x, y) {
    //console.log(x, y)
    progressBar.style.width = y * 100 + '%';
}

jQuery(window).ready(function() {


    jQuery('.resourceMenu').each(function() {
        jQuery(this).hide();
    });

    self.progressObserver = new ScrollProgress(onProgress);



    jQuery('.main-content').click(function() {
        console.log('THINGS RESIZED');
        var evt = window.document.createEvent('UIEvents');
        evt.initUIEvent('resize', true, false, window, 0);
        window.dispatchEvent(evt);
        /*
        progressObserver.destroy()
        var progressBar = document.querySelector('.progress-bar');
        self.progressObserver = new ScrollProgress(onProgress);
        */
    });


    if (localStorage) {
        // localStorage.setItem('lp-full-screen', 'yes');
        if (localStorage.getItem('admin')) {
            isAdminUser = true;
            jQuery('#leEditLinkBtn').show();
        }
    }
    //curId = jQuery('input[type=hidden][name=id]').val();
    /*
         isAdminUser = (jQuery('#wpadminbar').length) ? 1 : 0;

         if (iopApp.postType !== 'page') {
              console.log('         - POST TYPE IS NOT A PAGE ');
              console.log('CURRENT POST TYPE: ' + iopApp.postType);
         }
    */
    initDom();

    // if (!isInIFrame) {
    //jQuery(".header-instructions").hide();
    //jQuery(".footer-instructions").hide();
    // }

    window.hypothesisConfig = function() {
        return {
            "showHighlights": true
        };
    };

    //if (ptype === 'lp_lesson') {
    initLearningObjectives();
    //}

    initSpeech();

    initFonts();

    setTimeout(function() {

        jQuery(".glossary-tooltip a, .learning_objectives a, .content-item-summary a, section a").on("click", function(e) {
            let ttl = (jQuery(this).text() == 'More') ? jQuery(this.parentNode).parent().parent().children('.glossary-link').children('a').text() : jQuery(this).text();
            getPageLink(jQuery(this).attr('href'), ttl.replace(/("|')/g, ""));
            e.preventDefault();
        });

        jQuery("#resourceDisplay .close-button").on("click", closeResourceDisplay);

        jQuery(".lo-cb-complete").on("click", function() {
            if (localStorage) {
                localStorage.setItem(jQuery(this).attr('id'), jQuery(this).prop('checked'));
            }
            setCookie(jQuery(this).attr('id'), jQuery(this).prop('checked'), 30);
        });
        var startWinHeight = jQuery(window).height();
        jQuery(window).resize(function() {

            console.log('  ---- START WINDOW RSESIZED ----    ');
            console.log('    ---- ' + startWinHeight + ' ----    ');

            console.log('    ---- body RSESIZED ----    ');
            console.log('    ---- ' + jQuery('body').height() + ' ----    ');

            console.log('    ---- window RSESIZED ----    ');
            console.log('    ---- ' + jQuery(window).height() + ' ----    ');

            console.log('    ---- main div section ----    ');
            console.log('    ---- ' + jQuery('.main-content section').height() + ' ----    ');

            //let newWinS = parseInt(startWinHeight) + parseInt(jQuery('.main-content section').height());

            // console.log('    ---- newWinS ----    ');
            // console.log('    ---- '+newWinS+' ----    ');


            window.resizeBy(null, jQuery('.main-content section').height() + 'px');


            setTimeout(function() {
                window.resizeTo(screen.width, screen.height = jQuery('body').height());

                window.resizeTo(
                    window.screen.availWidth,
                    height = jQuery('body').height()
                );


                adjustPans();
                onProgress();
                console.log('    ---- body RSESIZED ----    ');
                console.log('    ---- ' + jQuery('body').top + ' ----    ');
                console.log('    ---- window RSESIZED ----    ');
                console.log('    ---- ' + jQuery(window).top + ' ----    ');
                console.log('    ---- ' + jQuery('.main-content section').top + ' ----    ');
            }, 500);

        });

        jQuery("#action_items_list a").on("click", function(e) {
            e.preventDefault();
        });

        var maxz = jQuery('.resourceMenu:last').css("zIndex");
        jQuery(".resourceMenu").on("click", function() {
            maxz++;
            jQuery(this).css('z-index', maxz);
            let curPos = (jQuery(this).css('bottom') == '0px') ? ('-' + (jQuery(this).height() + 18) + 'px') : '0px';
            jQuery(this).css('background', 'hsla(0, 0%, 0%, 1.0)');
            jQuery(this).css('bottom', 0);
        });


        jQuery(".resourceClose").on("click", function() {
            jQuery(this).parent().parent().animate({
                bottom: '' + ('-' + (jQuery(this).parent().parent().height() + 20) + 'px') + ''
            });
            jQuery(this).parent().parent().css('background', 'hsla(0, 0%, 0%, 0.7)');
        });

        adjustPans();

        loader('Application Loaded', 'app-root', 0);
    }, 1500);

});

function getVideoTitle(snippet_json_data) {
    var title = snippet_json_data.title;
    return title;
}


function createIcon(img) {
    return '<img src="' + globalIcons + '' + img + '.svg" style="opacity:0.4; width:22px; margin-top:6px;">';
}

function initFonts() {
    console.log('initFonts');
    var fontSize = jQuery(".main-content section").css("fontSize");
    console.log('      - cookie: ' + getCookie('fontSize'));

    fontSize = parseInt(fontSize) + 1 + "px";
    console.log('      - fontSize: ' + fontSize);

    var finalFontSize = (getCookie('fontSize') !== null) ? getCookie('fontSize') : (parseInt(fontSize) + 1);
    console.log('      - finalFontSize: ' + finalFontSize);
    jQuery('#fontConfigs label').html('Font Size (' + finalFontSize + 'px): ');
    jQuery('#fontConfigs').show();

    jQuery(".main-content section").css('font-size', finalFontSize + 'px');

    jQuery('#slider').on('change', function() {

        var val = jQuery(this).val();
        console.log('      - change: ' + val);
        jQuery('#fontConfigs label').html('Font Size (' + val + 'px): ');
        jQuery(".main-content section").css('font-size', val + 'px');
        setCookie('fontSize', val, 30);
    });
}

function codeExIframe(code_example) {
    let xxx;
    let lines = code_example.split("\n");
    let ifHeight = (lines.length * codeExHVal) + 'px;'
    xxx = '<iframe src="https://trinket.io/tools/1.0/jekyll/embed/html#code=' + encodeURIComponent(code_example.replace(/^\s+|\s+$/g, '')) + '" width="100%" height="' + ifHeight + '" allowfullscreen="" class="lazy lazyloaded"></iframe>';
    return xxx;
}

function formatTimeToCom(lo_ttc) {
    return `
          <span class="glossary-tooltip"><span class="glossary-link">
               <a onclick="event.preventDefault();" style="color: rgb(4, 56, 81); font-size: 12px;"><i class="far fa-clock"></i> <span class="lotimeCom">${lo_ttc} min.</span></a>
          </span>
          <span class="hidden glossary-tooltip-content clearfix">
          <span class="glossary-tooltip-text">
               <span style="color: #EEE; font-weight:400;">It has been estimated that, on average, it will take ${lo_ttc} minutes to complete this learning objective.</span>
          </span>`;
}

function glossaryTip(infoTypeMore) {
    return `
          <span class="glossary-tooltip"><span class="glossary-link">
               <a onclick="event.preventDefault();" style="color: rgb(4, 56, 81);"><i class="far fa-question-circle"></i></a>
          </span>
          <span class="hidden glossary-tooltip-content clearfix">
          <span class="glossary-tooltip-text">
               <span style="color: #EEE; font-weight:400;">${infoTypeMore}</span>
          </span>`;
}

var vidGloss = '<i class="fab fa-youtube"></i> Watch the video. The content in this video may be included in any assignments, knowledge checks, quizzes, or tests.';

var exampGloss = '<i class="fab fa-linode"></i> Explore the example provided to better understand the lesson. This example may prove helpful in any assignments, knowledge checks, quizzes, or tests.';

var resGloss = '<i class="fa fa-link"></i> Review this resource, the content in it may be included in any assignments, knowledge checks, quizzes, or tests.';

var codeGloss = '<i class="fas fa-code"></i> Learn by breaking code. Use the example Trinket.io provided here to better understand the lesson. This code playground may prove helpful in any assignments, knowledge checks, quizzes, or tests.';

var readGloss = '<i class="fas fa-book"></i> The content that has been provided has been carefully selected and should be carefully reviewed. This code playground may prove helpful in any assignments, knowledge checks, quizzes, or tests.';

function initLearningObjectives() {

    loader('Loading Learning Objectives', 'app-learningObj', 1);

    var objret = priObj;

    let lessTtcJSONVal = parseInt(objret.time_to_complete);
    var lesson_time_to_complete = (lessTtcJSONVal !== undefined && lessTtcJSONVal > 0) ? lessTtcJSONVal : 10;

    let todolistMain = '<li id="toDoLessonItem-' + curId + '"> <span style="color: rgb(4, 56, 81); font-size: 12px;">' + lesson_time_to_complete + ' <i class="far fa-clock"></i></span> ' + objret.title.rendered + '<ul><li><i class="fas fa-book"></i> Read/review all featured content supplied. ' + glossaryTip(readGloss) + '</li>';

    if (objret.featured_video) {
        let fvt = createResource(objret.featured_video, curId, 'featured_video');
        todolistMain += '<li class="toDoLessonItem-' + curId + '"><i class="fab fa-youtube"></i> ' + fvt.post_title + ' ' + glossaryTip(vidGloss) + '</li>';
    }

    if (!objret.featured_video && curPType === 'lp_assignment') {
        jQuery('.vidScr').hide();
    }

    if (curPType === 'lp_assignment') {
        jQuery('.assignment-intro').after('<div id="iop-ass-content">' + objret.content.rendered + '</div>');
        jQuery('#iop-ass-content a').on("click", function(event) {
            getPageLink(jQuery(this).attr('href'), jQuery(this).text());
            event.preventDefault();
        });
    }

    if (objret.lesson_resources) {

        let lrt = createResource(objret.lesson_resources, curId, 'lesson_resources');

        todolistMain += '<li class="toDoLessonItem-' + curId + '"><i class="fab fa-youtube"></i> ' + lrt.post_title + ' ' + glossaryTip(resGloss) + '</li>';
    }

    if (objret.additional_resources) {
        createResource(objret.additional_resources, curId, 'additional_resources');
    }

    if (objret.code_example) {
        todolistMain += '<li class="toDoLOItem-' + curId + '"><i class="fas fa-code"></i> Review the code example provided.' + glossaryTip(codeGloss) + '</li>';
    }

    let showReqInfLP = (objret.featured_video || objret.lesson_resources) ? true : false;

    if (objret.learning_objectives) {

        jQuery('.content-item-description').after('<h5 class="loTtl">Complete the following "Lesson Learning Objectives":</h5><ul class="learning_objectives"></ul>');
        jQuery('#action_items_list').append('<li>Complete the following learning objective items:<ul class="action_items_list_los"></ul></li>');

        var theVids = '';
        // each learning objective

        objret.learning_objectives.forEach(function(hrid) {
            console.log('           - hrid.time_to_complete: ' + hrid.time_to_complete);
            let loTtcJSONVal = parseInt(hrid.time_to_complete);
            let lo_ttc = (loTtcJSONVal !== undefined && loTtcJSONVal > 0) ? loTtcJSONVal : 30;
            console.log('           - lo_ttc: ' + lo_ttc);
            lesson_time_to_complete = lesson_time_to_complete + lo_ttc;
            console.log('                   lesson_time_to_complete: ' + lesson_time_to_complete);
            let lo_ttc_display = formatTimeToCom(lo_ttc);
            var curHRId = hrid.id;
            let concon = '';
            let todolist = '<li id="toDoLO-' + curHRId + '"> <span style="color: rgb(4, 56, 81); font-size: 12px;">' + lo_ttc + ' <i class="far fa-clock"></i></span> ' + hrid.post_title + '<ul><li><i class="fas fa-book"></i> Read/review all featured content supplied. ' + glossaryTip(readGloss) + '</li>';

            concon = '<li id="lo-' + curHRId + '" class="' + curHRId + '" data-loid="' + curHRId + '"><div id="lottl-' + curHRId + '" class="learningObjectivesTitle ' + curHRId + '"><div class="round"><input type="checkbox" id="cb' + curHRId + '" name="cb' + curHRId + '" class="lo-cb-complete" /><div><label for="cb' + curHRId + '"></label></div></div><div class="loTtlDiv" style="float:left;">' + hrid.post_title + ' ' + lo_ttc_display + '</div><div style="float:right"><a href="' + adminPath + 'post.php?post=' + curHRId + '&action=edit" target="_blank" style="display:none;" class="lo-edit-link"><i class="fas fa-pencil-alt"></i></a></div></div><ul id="ullocon-' + curHRId + '" class="' + curHRId + ' learningObjective"><li>' + hrid.post_content + '</li>';
            if (hrid.code_example) {

                concon += '<li class="lo_example_wrapper"><div class="example-title">Consider the following example:</div><iframe src="https://trinket.io/tools/1.0/jekyll/embed/html#code=' + encodeURIComponent(hrid.code_example.replace(/^\s+|\s+$/g, '')) + '" width="100%" height="200" allowfullscreen="" class="lazy lazyloaded"></iframe></li>';
                todolist += '<li class="toDoLOItem-' + curHRId + '"><i class="fas fa-code"></i> Review the code example provided.' + glossaryTip(codeGloss) + '</li>';

            }
            concon += '<li class="lo_req_res' + curHRId + '"><p><span class="glossary-tooltip"><span class="glossary-link"><a href="#" onclick="event.preventDefault();" >What resources do I need to focus on?</a></span><span class="hidden glossary-tooltip-content clearfix"><span class="glossary-tooltip-text"><span style="color: #090; font-weight:bold;"><i class="fa fa-exclamation-triangle fa-lg"></i></span> The following resources outlined in <span style="color: #090; font-weight:bold;">GREEN</span> are required resources for this lesson and should be included in your studies. The additional resources not outlined in <span style="color: #090; font-weight:bold;">GREEN</span> are there for you to explore and further your understanding of this lesson. The same applies in the learning objectives found below.</span></span></span></p></li>';

            concon += '<li id="locon-' + curHRId + '" class="lo_resources"></li></ul>';
            jQuery('.learning_objectives').append(concon);

            if (jQuery.type(hrid.featured_video) === 'object') {
                let vt = createResource(hrid.featured_video, curHRId, 'featured_video');
                todolist += '<li class="toDoLOItem-' + curHRId + '"><i class="fab fa-youtube"></i> ' + vt.post_title + ' ' + glossaryTip(vidGloss) + '</li>';
                isFeaturedVideo = 1;
            }

            if (jQuery.type(hrid.featured_example) === 'object') {
                let fex = createResource(hrid.featured_example, curHRId, 'featured_example');
                todolist += '<li class="toDoLOItem-' + curHRId + '"><i class="fas fa-link"></i> ' + fex.post_title + ' ' + glossaryTip(exampGloss) + '</li>';
            }

            if (jQuery.type(hrid.required_knowledge_resource) === 'object') {
                let vt = createResource(hrid.required_knowledge_resource, curHRId, 'required_knowledge_resource');
                todolist += '<li class="toDoLOItem-' + curHRId + '"><i class="fas fa-link"></i> ' + vt.post_title + ' ' + glossaryTip(resGloss) + '</li>';
            }

            if (jQuery.type(hrid.additional_knowledge_resource) === 'object') {
                createResource(hrid.additional_knowledge_resource, curHRId, 'additional_knowledge_resource');
            }

            todolist += '</ul></li>';

            jQuery('.action_items_list_los').append(todolist);

        });
    }

    todolistMain += '</ul></li>';
    todolistMain += '</ul>';

    jQuery('.action_items_list_main').append(todolistMain);

    if (lesson_time_to_complete !== undefined) {
        jQuery('#action_items_list').append('<li style="color: rgb(4, 56, 81);font-size: 1.1em;font-weight: 600;text-align: center;"><i class="far fa-clock"></i> ' + lesson_time_to_complete + ' minutes total estimated to complete this lesson.</li>');
    }

    jQuery('.learning_objectives li').each(function() {
        if (isAdminUser) {
            jQuery('.lo-edit-link').css('display', 'inline-block');
        }
    });

    jQuery('.learning_objectives li .learningObjectivesTitle').each(function() {
        jQuery(this).parent().children('ul').first().slideToggle();
    });


    jQuery('.learning_objectives li .learningObjectivesTitle .loTtlDiv').on('click', function() {
        jQuery(this).parent().parent().children('ul').first().slideToggle();
    });

    jQuery('.lo-cb-complete').each(function() {
        if (localStorage) {
            var x = localStorage.getItem(jQuery(this).attr('id'));
            x = (x == 'true');
            if (x) {
                jQuery(this).prop('checked', x);
            }
        }
        setCookie(jQuery(this).attr('id'), x, 30);
    });

    jQuery('.resourceMenu').each(function() {
        jQuery(this).hide();
        let curPos = ('-' + (jQuery(this).height() + 20) + 'px');
        jQuery(this).css('bottom', ('-' + (jQuery(this).height() + 20) + 'px'));
        jQuery(this).css('display', 'none');
    });

    if (lesson_time_to_complete !== undefined) {
        jQuery('.actionItemsTtl, #registration h4').prepend('<span style="font-size: 1em; padding-right: 12px; opacity: .75;">' + lesson_time_to_complete + ' <i class="far fa-clock"></i></span>');
    }


    loader('Learning Objectives Loaded', 'app-learningObj', 0);
}

function initDom() {

    loader('Initializing DOM', 'app-initDOM', 1);
    jQuery("section h2").detach().appendTo('#course-item-content-header')
    jQuery("#resourceTabs li:first").addClass("active");

    jQuery(".tab-content .tab-pane:first").addClass("active");

    jQuery("#resourceTabs li").click(function(e) {
        jQuery(".nav-tabs>li.active").removeClass('active');
        jQuery(this).addClass("active");
    });

    if (jQuery('#comments').length) {

        jQuery('#comments').appendTo('#commentsResourcesDiv');

    }

    if (ptype === 'lp_lesson') {
        //jQuery('.content-item-description').append('<ul><li id="locon-' + curId + '" class="lo_resources"></li></ul>');

        jQuery(".learn-press-content-item-container").append('<div class="cover"><a class="stack">i</a><a class="stack">o</a><a class="stack">p</a></div>');

        //jQuery(".learn-press-video-intro").prepend('<div class="videoHistoryPan"></div><div class="lessonResourcesPan"><header><strong><i class="fa fa-book fa-lg"></i> LESSONÂ RESOURCES</strong></header></div>');
    }

    loader('Done Initializing DOM', 'app-initDOM', 0);
}

function initSpeech() {
    jQuery('button .js-highlight-btn').insertAfter('<button class="annotator-adder-actions__button js-speak-btn"><span class="annotator-adder-actions__label" data-action="comment">Speak</span></button>');

    if ('speechSynthesis' in window) {

        jQuery('#optionsPanel').show();

        speechSynthesis.onvoiceschanged = function() {
            var voicelist = jQuery('#voicesSelector');

            if (voicelist.find('option').length == 0) {
                speechSynthesis.getVoices().forEach(function(voice, index) {
                    var option = jQuery('<option>')
                        .val(index)
                        .html(voice.name + (voice.default ? ' (default)' : ''));

                    voicelist.append(option);
                });

                //voicelist.material_select();
            }
        }

        jQuery('#speakBtn, .js-speak-btn').click(function(event) {
            var text = jQuery('#message').val();
            var msg = new SpeechSynthesisUtterance();
            var voices = window.speechSynthesis.getVoices();
            msg.voice = voices[jQuery('#voicesSelector').val()];
            msg.rate = jQuery('#rate').val() / 10;
            msg.pitch = jQuery('#pitch').val();
            msg.text = getSelectionText();

            msg.onend = function(e) {
                console.log('Finished in ' + event.elapsedTime + ' seconds.');
            };

            msg.text = (msg.text) ? msg.text : 'You have no text selected on the page. Please select some text and then click the speak button again.';

            console.log('MESSAGE: ' + msg.text);

            speechSynthesis.speak(msg);

            event.preventDefault();
        })
        console.log('This browser supports text to speech.');
    } else {
        console.log('This browser does not support text to speech.');
    }
}

function getPageLink(current_link, current_title = 'No Title') {
    console.log('getPageLink: ' + current_link);
    var linkChk;
    console.log(current_link);
    current_link = current_link.replace('http:', 'https:');
    jQuery('#resourceDisplay .title').html('LOADING: ' + current_title);
    jQuery('#resourceDisplay .window-cur-link').attr('href', current_link);
    jQuery('#resourceDisplay').show();

    if (current_link.indexOf('youtube') > -1) {
        console.log('is youtube: ' + current_link);
        jQuery('#resourceDisplay .wrapper').css('height', '626px');
        jQuery('#resourceDisplay .wrapper iframe').css('height', '600px');
        linkChk = "ya";
        if (current_link.indexOf('watch?v=') > -1) {
            var linkParms = getUrlVars(current_link);
            var stime = (linkParms['t']) ? '' + linkParms['t'].replace('s', '') : '1';
            current_link = 'https://www.youtube.com/embed/' + linkParms['v'] + '?enablejsapi=1&rel=0&start=' + stime;
            console.log('current_link after time: ' + current_link);
        }

        console.log('resourceDisplay src: ' + current_link);
        jQuery('#resourceDisplay iframe').attr('src', current_link);
        console.log('resourceDisplay title: ' + current_title);
        jQuery('#resourceDisplay .title').html(current_title);
        console.log('44444');
    } else {
        console.log('555555');
        if (ignoreLink.indexOf(current_link) < 0 || current_link === '') {

            jQuery.get(globalResourcesPath + "includes/link_check.php?url=" + encodeURIComponent(current_link), function(data) {
                console.log(data);
                if (data === "ya") {
                    jQuery('#resourceDisplay .wrapper').css('height', '90vh');
                    jQuery('#resourceDisplay .wrapper iframe').css("height", "-webkit-fill-available");
                    jQuery('#resourceDisplay .wrapper iframe').css("height", "90vh");
                    jQuery('#resourceDisplay .wrapper iframe').css("height", "100%");
                    jQuery('#resourceDisplay iframe').attr('src', current_link);
                    jQuery('#resourceDisplay .title').html(current_title);
                } else {
                    jQuery('#resourceDisplay iframe').attr('src', loaderPagesPath + 'resource-blocked.html');
                    setTimeout(function() {
                        closeResourceDisplay();
                        window.open(current_link, '_blank');
                    }, 1000);
                }
            });
        } else if (ignoreLink.indexOf(current_link) < 0) {
            window.open(current_link, '_blank');
        } else {

        }
    }
}

function adjustPans() {

    jQuery('.resourceMenu').each(function() {
        jQuery(this).hide();
        //let curPos = ('-'+(jQuery(this).height()+20)+'px');
        jQuery(this).css('bottom', ('-' + (jQuery(this).height() + 20) + 'px'));
        jQuery(this).show();
    });

}

function getVideoTitle(snippet_json_data) {
    var title = snippet_json_data.title;
    return title;
}

function createResource(obj, curHRId, resTyp = 'noType') {

    for (var xa in obj) {
        xa = xa;
        var cid = obj[xa].id;
        var url = obj[xa].url;
        var post_title = obj[xa].post_title;
        var post_content = obj[xa].post_content;
        var resource_screen_shot = (obj[xa].resource_screen_shot) ? obj[xa].resource_screen_shot : globalResourcesPath + 'images/resource_thumbnail/image-not-found.jpg';

        var reObj = {
            post_title: obj[xa].post_title
        }

        let resFor = ' resFor';
        for (var krf in obj[xa].knowledge_resource_format) {
            resFor += ' ' + obj[xa].knowledge_resource_format[krf].slug;
        }

        let resObj = '<div class="lessonVideoWrapper ' + resTyp + 'Wrapper" onclick="getPageLink(\'' + url + '\',\'' + post_title.replace(/("|')/g, "") + '\')"><span class="glossary-tooltip"><span class="glossary-link"><img class="lessonVideo ' + resTyp + 'Item ' + resFor + '" data-toggle="popover" width="200" src="' + resource_screen_shot + '" data-provider="youtube" /></span><span class="hidden glossary-tooltip-content clearfix"><span class="glossary-tooltip-text">' + post_title + '</span></span></div>';

        if (resourceList.indexOf(url) === -1) {

            resourceList.push(url);

            if ((resFor.indexOf('youtube') != -1) || (resFor.indexOf('vimeo') != -1) || (resFor.indexOf('video') != -1)) {
                jQuery('#featured_videoResTab').append(resObj);
                jQuery('#featured_videoResTab, #featured_videoResTabLi').show();
            }


            if ((resFor.indexOf('github-repository') != -1) || (resFor.indexOf('webpage') != -1) || (resFor.indexOf('website') != -1)) {
                jQuery('#webpageResTab').append(resObj);
                jQuery('#webpageResTab, #webpageResTabLi').show();
            }

            if ((resFor.indexOf('webtool') != -1) || (resFor.indexOf('webtools') != -1)) {
                jQuery('#webtoolResTab').append(resObj);
                jQuery('#webtoolResTab, #webtoolResTabLi').show();
            }

            if ((resFor.indexOf('trinket-io') != -1) || (resFor.indexOf('jsfiddle') != -1) || (resFor.indexOf('sololearn') != -1) || (resFor.indexOf('code-view') != -1) || (resFor.indexOf('code-pen') != -1)) {
                jQuery('#codeResTab').append(resObj);
                jQuery('#codeResTab, #codeResTabLi').show();
            }

            if (resTyp.indexOf("required_knowledge_resource") > -1) {
                jQuery('.lessonResourcesPan').append(resObj);
            }

            adjustPans();
        }

        jQuery('#locon-' + curHRId + '').append(resObj);

        if (resTyp == "featured_video" && jQuery('.video-content iframe').attr('src') == '') {
            var fv = url;
            fv += '?enablejsapi=1&rel=0';
            fv = fv.replace('watch?v=', 'embed\/');
            jQuery('.video-content iframe').attr('src', fv);
            jQuery('.vidScr').show();

        }
    }
    return reObj;
}

function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) {
            return c.substring(nameEQ.length, c.length);
        }
    }
    return null;
}

function encodeHTML(str) {
    return str.replace(/[\u00A0-\u9999<>&](?!#)/gim, function(i) {
        return '&#' + i.charCodeAt(0) + ';';
    });
}

function decodeHTML(str) {
    return str.replace(/&#([0-9]{1,3});/gi, function(match, num) {
        return String.fromCharCode(parseInt(num));
    });
}

function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function closeResourceDisplay() {
    jQuery("#resourceDisplay iframe").attr('src', '');
    jQuery("#resourceDisplay").hide();

}

function toggleLearningObjective(obj) {
    console.log(this);
}

function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: 'en,es',
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE
    }, 'google_translate_element');
}

function printElement(e) {
    var ifr = document.createElement('iframe');
    ifr.style = 'height: 0px; width: 0px; position: absolute'
    document.body.appendChild(ifr);

    jQuery(e).clone().appendTo(ifr.contentDocument.body);
    ifr.contentWindow.print();

    ifr.parentElement.removeChild(ifr);
}

function getSelectionText() {
    var text = "";
    var activeEl = document.activeElement;
    var activeElTagName = activeEl ? activeEl.tagName.toLowerCase() : null;
    if (
        (activeElTagName == "textarea") || (activeElTagName == "input" &&
            /^(?:text|search|password|tel|url)$/i.test(activeEl.type)) &&
        (typeof activeEl.selectionStart == "number")
    ) {
        text = activeEl.value.slice(activeEl.selectionStart, activeEl.selectionEnd);
    } else if (window.getSelection) {
        text = window.getSelection().toString();
    }
    return text;
}

function colorReplace(findHexColor, replaceWith) {
    // Convert rgb color strings to hex
    function rgb2hex(rgb) {
        if (/^#[0-9A-F]{6}$/i.test(rgb)) return rgb;
        rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

        function hex(x) {
            return ("0" + parseInt(x).toString(16)).slice(-2);
        }
        return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
    }

    // Select and run a map function on every tag
    jQuery('*').map(function(i, el) {
        // Get the computed styles of each tag
        var styles = window.getComputedStyle(el);

        // Go through each computed style and search for "color"
        Object.keys(styles).reduce(function(acc, k) {
            var name = styles[k];
            var value = styles.getPropertyValue(name);
            if (value !== null && name.indexOf("color") >= 0) {
                // Convert the rgb color to hex and compare with the target color
                if (value.indexOf("rgb(") >= 0 && rgb2hex(value) === findHexColor) {
                    // Replace the color on this found color attribute
                    jQuery(el).css(name, replaceWith);
                }
            }
        });
    });
}

function getUrlParam(parameter, defaultvalue) {
    var urlparameter = defaultvalue;
    if (window.location.href.indexOf(parameter) > -1) {
        urlparameter = getUrlVars()[parameter];
    }
    return urlparameter;
}

function getUrlVars(urlStr) {
    var vars = {};
    var urlStr = (urlStr) ? urlStr : window.location.href;
    var parts = urlStr.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
        vars[key] = value;
    });
    return vars;
}

function fullscreenChange() {
    if (document.fullscreenEnabled ||
        document.webkitIsFullScreen ||
        document.mozFullScreen ||
        document.msFullscreenElement) {
        console.log('enter fullscreen');
    } else {
        console.log('exit fullscreen');
    }
    // force to reload iframe once to prevent the iframe source didn't care about trying to resize the window
    // comment this line and you will see
    var iframe = document.querySelector('iframe');
    iframe.src = iframe.src;
}

function loader(msg, msgId, stat) {

    if (stat > 0) {
        jQuery('div#appInfo .msg').prepend('<div class="update-msg" id="' + msgId + '">' + msg + '</div>');
    } else {
        let x = '#' + msgId;
        jQuery("#" + msgId + "").remove();
    }

    let ldrLen = jQuery('div#appInfo .msg .update-msg').length;
    console.log('                         - LOADER LENGTH: ' + ldrLen + ' | ' + msgId + ' | ' + msg);
    if (ldrLen <= 0) {
        jQuery('#comDiv').hide();
    }


}