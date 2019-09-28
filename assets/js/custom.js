// JavaScript Document


// Avoid `console` errors in browsers that lack a console.

(function () {

     var method;

     var noop = function () {};

     var methods = [

          'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',

          'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',

          'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',

          'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'

     ];

     var length = methods.length;

     var console = (window.console = window.console || {});


     while (length--) {

          method = methods[length];


          // Only stub undefined methods.

          if (!console[method]) {

               console[method] = noop;

          }

     }

}());


(function () {

     'use strict';

     var document = typeof window !== 'undefined' && typeof window.document !== 'undefined' ? window.document : {};

     var isCommonjs = typeof module !== 'undefined' && module.exports;

     var keyboardAllowed = typeof Element !== 'undefined' && 'ALLOW_KEYBOARD_INPUT' in Element;

     var fn = (function () {

          var val;

          var fnMap = [

               ['requestFullscreen', 'exitFullscreen', 'fullscreenElement', 'fullscreenEnabled', 'fullscreenchange', 'fullscreenerror'],

               ['webkitRequestFullscreen', 'webkitExitFullscreen', 'webkitFullscreenElement', 'webkitFullscreenEnabled', 'webkitfullscreenchange', 'webkitfullscreenerror'],

               ['webkitRequestFullScreen', 'webkitCancelFullScreen', 'webkitCurrentFullScreenElement', 'webkitCancelFullScreen', 'webkitfullscreenchange', 'webkitfullscreenerror'],

               ['mozRequestFullScreen', 'mozCancelFullScreen', 'mozFullScreenElement', 'mozFullScreenEnabled', 'mozfullscreenchange', 'mozfullscreenerror'],

               ['msRequestFullscreen', 'msExitFullscreen', 'msFullscreenElement', 'msFullscreenEnabled', 'MSFullscreenChange', 'MSFullscreenError']

          ];

          var i = 0;

          var l = fnMap.length;

          var ret = {};

          for (; i < l; i++) {

               val = fnMap[i];

               if (val && val[1] in document) {

                    for (i = 0; i < val.length; i++) {

                         ret[fnMap[0][i]] = val[i];

                    }

                    return ret;

               }

          }

          return false;

     })();

     var eventNameMap = {

          change: fn.fullscreenchange,

          error: fn.fullscreenerror

     };

     var screenfull = {

          request: function (elem) {

               return new Promise(function (resolve) {

                    var request = fn.requestFullscreen;

                    var onFullScreenEntered = function () {

                         this.off('change', onFullScreenEntered);

                         resolve();

                    }.bind(this);

                    elem = elem || document.documentElement;

                    if (/ Version\/5\.1(?:\.\d+)? Safari\//.test(navigator.userAgent)) {

                         elem[request]();

                    } else {

                         elem[request](keyboardAllowed ? Element.ALLOW_KEYBOARD_INPUT : {});

                    }

                    this.on('change', onFullScreenEntered);

               }.bind(this));

          },

          exit: function () {

               return new Promise(function (resolve) {

                    if (!this.isFullscreen) {

                         resolve();

                         return;

                    }

                    var onFullScreenExit = function () {

                         this.off('change', onFullScreenExit);

                         resolve();

                    }.bind(this);

                    document[fn.exitFullscreen]();

                    this.on('change', onFullScreenExit);

               }.bind(this));

          },

          toggle: function (elem) {

               return this.isFullscreen ? this.exit() : this.request(elem);

          },

          onchange: function (callback) {

               this.on('change', callback);

          },

          onerror: function (callback) {

               this.on('error', callback);

          },

          on: function (event, callback) {

               var eventName = eventNameMap[event];

               if (eventName) {

                    document.addEventListener(eventName, callback, false);

               }

          },

          off: function (event, callback) {

               var eventName = eventNameMap[event];

               if (eventName) {

                    document.removeEventListener(eventName, callback, false);

               }

          },

          raw: fn

     };

     if (!fn) {

          if (isCommonjs) {

               module.exports = false;

          } else {

               window.screenfull = false;

          }

          return;

     }

     Object.defineProperties(screenfull, {

          isFullscreen: {

               get: function () {

                    return Boolean(document[fn.fullscreenElement]);

               }

          },

          element: {

               enumerable: true,

               get: function () {

                    return document[fn.fullscreenElement];

               }

          },

          enabled: {

               enumerable: true,

               get: function () {

                    return Boolean(document[fn.fullscreenEnabled]);

               }

          }

     });

     if (isCommonjs) {

          module.exports = screenfull;

          module.exports.default = screenfull;

     } else {

          window.screenfull = screenfull;

     }

})();


jQuery.noConflict();


'use strict';


var app_version = '1.0.0.4';

var sitePath = 'https://iop.inside-out-project.com/';

var lmsAdminPath = 'https://dev01.inside-out-project.com/wp-admin/';

var globalResourcesPath = sitePath + 'global_resources/';

// var appPath = sitePath + 'iop-canvas-app/';

// var includePath = appPath + 'include/';

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

var curPType = ptype;

var appContent = {

     pageViews: {},

     courseList: {},

     courses: {},

     featured_video: 0

};

var isInIFrame = (window.location !== window.parent.location);

topTabs.webtool = '';

topTabs.webpage = '';

topTabs.videos = '';

topTabs.code = '';

thereAreLPResources = 0;

thereAreLOResources = 0;

var isAssign = curPType.includes('assignment');


jQuery(window).ready(function () {


     jQuery('.resourceMenu').each(function () {

          jQuery(this).hide();

     });


     if (localStorage) {

          // localStorage.setItem('lp-full-screen', 'yes');

          if (localStorage.getItem('admin')) {

               isAdminUser = true;

               jQuery('#leEditLinkBtn').show();

          }

     }


     changeView(curPType, curId);


});


function getVideoTitle(snippet_json_data) {

     var title = snippet_json_data.title;

     return title;

}


function createIcon(img) {

     return '<img src="' + globalIcons + '' + img + '.svg" style="opacity:0.4; width:22px; margin-top:6px;">';

}


function initFonts() {

     var fontSize = jQuery(".main-content section").css("fontSize");

     fontSize = parseInt(fontSize) + 1 + "px";


     var finalFontSize = (getCookie('fontSize') !== null) ? getCookie('fontSize') : (parseInt(fontSize) + 1);

     jQuery('#fontConfigs label').html('Font Size (' + finalFontSize + 'px): ');

     jQuery('#fontConfigs').show();

     jQuery(".main-content section").css('font-size', finalFontSize + 'px');

     jQuery('#slider').on('change', function () {

          var val = jQuery(this).val();

          //console.log('      - change: ' + val);

          jQuery('#fontConfigs label').html('Font Size (' + val + 'px): ');

          jQuery(".main-content section").css('font-size', val + 'px');

          setCookie('fontSize', val, 30);

     });

}


function codeExIframe(code_example) {

     let xxx;

     let lines = code_example.split("\n");

     let ifHeight = (lines.length * codeExHVal) + 'px;'

     xxx = '<iframe src="https://trinket.io/tools/1.0/jekyll/embed/html#code=' + encodeURIComponent(code_example.replace(/^\s+|\s+$/g, '')) + '" width="100%" height="' + ifHeight + '" allowfullscreen="" class="lazy"></iframe>';

     return xxx;

}


function formatTimeToCom(lo_ttc) {

     return `<span class="glossary-tooltip"><span class="glossary-link"><a onclick="event.preventDefault();" style="color: rgb(4, 56, 81); font-size: 12px;"><i class="far fa-clock"></i> <span class="lotimeCom">${lo_ttc} min.</span></a></span><span class="hidden glossary-tooltip-content clearfix"><span class="glossary-tooltip-text"><span style="color: #EEE; font-weight:400;">It has been estimated that, on average, it will take ${lo_ttc} minutes to complete this learning objective.</span></span>`;

}


function glossaryTip(infoTypeMore) {

     return `<span class="glossary-tooltip"><span class="glossary-link"><a onclick="event.preventDefault();" style="color: rgb(4, 56, 81);"><i class="far fa-question-circle"></i></a></span><span class="hidden glossary-tooltip-content clearfix"><span class="glossary-tooltip-text"><span style="color: #EEE; font-weight:400;">${infoTypeMore}</span></span>`;

}


var vidGloss = '<i class="fab fa-youtube"></i> Watch the video. The content in this video may be included in any assignments, knowledge checks, quizzes, or tests.';


var exampGloss = '<i class="fab fa-linode"></i> Explore the example provided to better understand the lesson. This example may prove helpful in any assignments, knowledge checks, quizzes, or tests.';


var resGloss = '<i class="fa fa-link"></i> Review this resource, the content in it may be included in any assignments, knowledge checks, quizzes, or tests.';


var codeGloss = '<i class="fas fa-code"></i> Learn by breaking code. Use the example Trinket.io provided here to better understand the lesson. This code playground may prove helpful in any assignments, knowledge checks, quizzes, or tests.';


var codeAssignGloss = '<i class="fas fa-pencil"></i> Demonstrate you have learned something. Use the starter code Trinket.io provided here to complete the assignment. Remeber to begin by clicking on the copy button to create your own version of the code. Once you have completed the assignment embed your submission in the assignment submission text editor. Remember to paste your embed code in the plain text view of the text editor.';


var readGloss = '<i class="fas fa-book"></i> The content that has been provided has been carefully selected and should be carefully reviewed. This code playground may prove helpful in any assignments, knowledge checks, quizzes, or tests.';


function initLearningObjectives() {

     loader('Loading Content', 'app-learningObj', 1);

     var objret = priObj;

     let ttl = (CANVAS_PAGE_TITLE !== '') ? CANVAS_PAGE_TITLE : objret.title.rendered;

     jQuery('#headerMainTitle, #actionWinTtl').text(decodeHTML(ttl));

     var lesson_time_to_complete = (objret.time_to_complete) ? parseInt(objret.time_to_complete) : 10;

     var lessonToDoListBuilder = '';

     var lessonTotalPoints = '';

     var assignToDoListBuilder = '';

     if (objret.content.rendered) {

          jQuery('.content-item-description').append(objret.content.rendered);

     }

     if (!isAssign) {

          assignToDoListBuilder += `<li>${timeDisplayBuilder(lesson_time_to_complete)} | <i class="fas fa-book"></i> Read/review all featured content supplied. ${glossaryTip(readGloss)} ${createEditLink(curId)}</li>`;

     } else {

          assignToDoListBuilder += `<li>${timeDisplayBuilder(lesson_time_to_complete)} | <i class="fas fa-book"></i> Review all lesson content. ${glossaryTip(readGloss)} ${createEditLink(curId)}</li>`;

          jQuery('.content-item-description').append(`

                    <div id="assignment-details">

                        <h5>Assignment Performance Objectives</h5>

                        <ul id="assignment-po-content"></ul>

                        <h5>Submitting This Assignment</h5>

                        <div id="submit-assignment-content">

                            ${objret.assignment_submission_instructions}

                        </div>

                    </div>

            `);

     }

     if (objret.featured_video) {

          let fvt = createResource(objret.featured_video, curId, 'featured_video');

          if (isAssign) {

               assignToDoListBuilder += '<li class="toDoLessonItem-' + curId + '">' + timeDisplayBuilder(fvt.time) + ' | <i class="fab fa-youtube"></i> ' + fvt.post_title + ' ' + glossaryTip(vidGloss) + '</li>';

          } else {

               assignToDoListBuilder += '<li class="toDoLessonItem-' + curId + '">' + timeDisplayBuilder(fvt.time) + ' | <i class="fab fa-youtube"></i> ' + fvt.post_title + ' ' + glossaryTip(vidGloss) + '</li>';

          }

          lesson_time_to_complete = Number(lesson_time_to_complete) + Number(fvt.time);
          appContent.featured_video = fvt.post_id;
     } else {

          jQuery('.vidScr').hide();

     }

     lessonToDoListBuilder += '<li class="toDoLessonItem-' + objret.id + '"><strong>' + timeDisplayBuilder(lesson_time_to_complete) + ' | <i class="fas fa-pen-square"></i> Review lesson content that has been provided. ' + createEditLink(objret.ID) + '</strong><ul>' + assignToDoListBuilder + '</ul></li>';

     if (objret.associated_performance_objectives) {

          objret.associated_performance_objectives.forEach(function (apo) {

               var tPoints = 0;

               var timer = 0;

               var bldr = '';

               if (apo.action_items) {

                    for (var key in apo.action_items) {

                         var imgs = '';

                         var aItem = apo.action_items[key];

                         if (aItem.action_images.length > 0) {

                              imgs = '<div class="sm-col-6"><ul><li><small><strong>Supporting Images</strong></small><ul>';

                              aItem.action_images.forEach(function (siid) {

                                   imgs += '<li class="actionImage"><img src="' + siid.guid + '" onclick="getPageLink(\'' + siid.guid + '\',\'' + encodeURIComponent(apo.action_items[key].post_title) + '\')" /></li>';

                              });

                              imgs += '</ul></li></ul></div>';

                         }

                         var rbld = '';

                         if (aItem.action_resources) {

                              for (var key_r in aItem.action_resources) {
                                   console.log('action_resource_parameters: ' + aItem.action_resource_parameters);
                                   let xx = (aItem.action_resource_parameters != undefined) ? aItem.action_resource_parameters : '';
                                   console.log('xx: ' + xx);
                                   console.log('find ?: ' + aItem.action_resources[key_r].url.indexOf('?'));
                                   xx = (aItem.action_resources[key_r].url.indexOf('?') >= 0) ? xx.replace('?', '&') : xx;
                                   console.log('xx: ' + xx);
                                   rbld += '<li class="actionImage"><img src="' + aItem.action_resources[key_r].resource_screen_shot + '" onclick="getPageLink(\'' + aItem.action_resources[key_r].url + xx + '\',\'' + aItem.action_resources[key_r].post_title + '\')" /></li>';

                              }

                              if (rbld.length > 0) {

                                   imgs += '<div class="sm-col-6"><ul><li><small><strong>Supporting Resources</strong></small><ul>' + rbld + '</ul></li></ul></div>';

                              }

                         }

                         bldr += '<li class="toDoLOItem-' + apo.action_items[key].ID + '">' + timeDisplayBuilder(apo.action_items[key].estimated_time_to_complete) + ' | <i class="fas fa-pen"></i> ' + apo.action_items[key].post_title + ' (' + apo.action_items[key].points_possible + ' pts) ' + createEditLink(apo.action_items[key].ID) + '<ul class="action-items-resources"><li><div class="container"><div class="row">' + imgs + '</div></div></li></ul></li>';

                         timer = Number(timer) + Number(apo.action_items[key].estimated_time_to_complete);

                         tPoints = Number(tPoints) + Number(apo.action_items[key].points_possible);

                    };

               }

               lessonToDoListBuilder += '<li class="toDoLessonItem-' + apo.ID + '"><strong>' + timeDisplayBuilder(timer) + ' | <i class="fas fa-pen-square"></i> ' + apo.post_title + ' ' + createEditLink(apo.ID) + '</strong><ul>' + bldr + '</ul></li>';

               lesson_time_to_complete = Number(lesson_time_to_complete) + Number(timer);

               lessonTotalPoints = Number(lessonTotalPoints) + Number(tPoints);

          });


          jQuery('#assignment-po-content').append(lessonToDoListBuilder);

          jQuery('#actionWinTtl').append(' <span class="pointTTL">( ' + lessonTotalPoints + ' points total )</span>');

     }

     if (objret.lesson_resources) {

          let lrt = createResource(objret.lesson_resources, curId, 'lesson_resources');

          lessonToDoListBuilder += '<li class="toDoLessonItem-' + curId + '">' + timeDisplayBuilder(lrt.time) + ' | <i class="fab fa-youtube"></i> ' + lrt.post_title + ' ' + glossaryTip(resGloss) + '</li>';

          lesson_time_to_complete = Number(lesson_time_to_complete) + Number(lrt.time);

     }

     if (objret.additional_resources) {

          createResource(objret.additional_resources, curId, 'additional_resources');

     }

     if (objret.cited_sources) {

          if (jQuery.type(objret.cited_sources) === 'object') {

               let cited_sources = createResource(objret.cited_sources, curHRId, 'cited_sources');

               jQuery(".main-content section").append('<div class="cited_sources"><cite>' + cited_sources.post_title + '</cite></li>');

          }

     }

     if (objret.code_example) {

          let exMsg = '<i class="fas fa-code"></i> Review the code example provided.' + glossaryTip(codeGloss);

          if (curPType === "iop_assignment" || curPType === "lp_assignment") {

               exMsg = '<i class="fas fa-code"></i> Complete your assignment here' + glossaryTip(codeAssignGloss);

          }

          jQuery('#lesson_example_wrapper .example-title').html(exMsg);

          let exTime = Math.ceil(Number((objret.code_example.split("<").length / 3)));

          lessonToDoListBuilder += '<li class="toDoLessonItem-' + curId + '">' + timeDisplayBuilder(exTime) + ' | ' + exMsg + ' ' + glossaryTip(resGloss) + '</li>';

          lesson_time_to_complete = Number(lesson_time_to_complete) + Number(exTime);

     }

     jQuery('.action_items_list_main').append(`${lessonToDoListBuilder}`);


     let showReqInfLP = (objret.featured_video || objret.lesson_resources) ? true : false;


     if (objret.learning_objectives) {

          jQuery('.content-item-description').after('<h5 class="loTtl">Complete the following "Lesson Learning Objectives":</h5><ul class="learning_objectives"></ul>');

          jQuery('#action_items_list').append('<li><h5>Complete the following learning objective items:</h5><ul class="action_items_list_los"></ul></li>');

          var theVids = '';

          objret.learning_objectives.forEach(function (hrid) {
               console.log('    hrid: ' + hrid.id + ' | ' + hrid.post_title);
               let loTtcJSONVal = (hrid.time_to_complete != null) ? parseInt(hrid.time_to_complete) : 5;

               let lo_ttc = (loTtcJSONVal !== undefined && loTtcJSONVal > 0) ? loTtcJSONVal : 30;

               var curHRId = hrid.id;

               let concon = '';

               let loToDoListBuilder = '';

               let loTotalTime = loTtcJSONVal;

               loToDoListBuilder += '<li>' + timeDisplayBuilder(loTtcJSONVal) + ' | <i class="fas fa-book"></i> Read/review all featured content supplied. ' + glossaryTip(readGloss) + '</li>';

               concon = '<li id="lo-' + curHRId + '" class="' + curHRId + '" data-loid="' + curHRId + '"><div id="lottl-' + curHRId + '" class="learningObjectivesTitle ' + curHRId + '"><div class="round"><input type="checkbox" id="cb' + curHRId + '" name="cb' + curHRId + '" class="lo-cb-complete" /><div><label for="cb' + curHRId + '"></label></div></div><div class="loTtlDiv" style="float:left;">' + hrid.post_title + ' <span id="lo-time-' + curHRId + '">' + formatTimeToCom(lo_ttc) + '</span></div><div style="float:right"><a href="' + lmsAdminPath + 'post.php?post=' + curHRId + '&action=edit" target="_blank" onclick="javascript(\'window.open(current_link, "example_blank");\')" style="display:none;" class="lo-edit-link"><i class="fas fa-pencil-alt"></i></a></div></div><ul id="ullocon-' + curHRId + '" class="' + curHRId + ' learningObjective"><li>' + hrid.post_content + '</li>';

               if (jQuery.type(hrid.cited_sources) === 'object') {

                    let cited_sources = createResource(hrid.cited_sources, curHRId, 'cited_sources');

                    concon += '<li class="cited_sources"><cite>' + cited_sources.post_title + '</cite></li>';

               }

               if (hrid.code_example) {

                    let exMsg = 'Consider the following example:';

                    if (curPType === "iop_assignment" || curPType === "lp_assignment") {

                         exMsg = 'Use the following code to complete the assignment';

                    }


                    concon += '<li class="lo_example_wrapper"><div class="example-title">' + exMsg + '</div><iframe src="https://trinket.io/tools/1.0/jekyll/embed/html#code=' + encodeURIComponent(hrid.code_example.replace(/^\s+|\s+$/g, '')) + '" width="100%" height="200" allowfullscreen="" class="lazy"></iframe></li>';

                    exMsg = '<i class="fas fa-code"></i> Review the code example provided.' + glossaryTip(codeGloss);

                    if (curPType === "iop_assignment" || curPType === "lp_assignment") {

                         exMsg = '<i class="fas fa-code"></i> Complete your assignment in the provided starter code.' + glossaryTip(codeAssignGloss);

                    }

                    let exTime = Math.ceil(Number((hrid.code_example.split("<").length / 3)));

                    loToDoListBuilder += '<li class="toDoLOItem-' + curHRId + '">' + timeDisplayBuilder(exTime) + ' | <i class="fas fa-link"></i> ' + exMsg + '</li>';

                    loTotalTime = Number(loTotalTime) + Number(exTime);

               }

               concon += '<li class="lo_req_res' + curHRId + '"><p><span class="glossary-tooltip"><span class="glossary-link"><a href="#" onclick="event.preventDefault();" >What resources do I need to focus on?</a></span><span class="hidden glossary-tooltip-content clearfix"><span class="glossary-tooltip-text"><span style="color: #090; font-weight:bold;"><i class="fa fa-exclamation-triangle fa-lg"></i></span> The following resources outlined in <span style="color: #090; font-weight:bold;">GREEN</span> are required resources for this lesson and should be included in your studies. The additional resources not outlined in <span style="color: #090; font-weight:bold;">GREEN</span> are there for you to explore and further your understanding of this lesson. The same applies in the learning objectives found below.</span></span></span></p></li>';

               concon += '<li id="locon-' + curHRId + '" class="lo_resources"></li></ul>';

               jQuery('.learning_objectives').append(concon);

               if (jQuery.type(hrid.featured_video) === 'object') {

                    console.log('hrid.featured_video: ' + hrid.featured_video);
                    console.log('appContent.featured_video: ' + appContent.featured_video);
                    let vt = createResource(hrid.featured_video, curHRId, 'featured_video', hrid.start_featured_video_time, hrid.end_featured_video_time);

                    console.log('    start-end: ' + hrid.start_featured_video_time + ' | ' + hrid.end_featured_video_time);

                    let xx = (hrid.start_featured_video_time != undefined) ? hrid.start_featured_video_time : '';

                    console.log('xx: ' + xx);

                    console.log('curHRId: ' + curHRId);

                    let st = (hrid.start_featured_video_time > 0) ? hrid.start_featured_video_time : 0;
                    let et = (hrid.end_featured_video_time > 0) ? hrid.end_featured_video_time : 0;

                    let time_math = Math.floor((et - st) / 60);

                    time_math = (time_math <= 0 && (st > 0 || et > 0)) ? 1 : time_math;

                    let adjust_time = (st > 0 || et > 0) ? Number(time_math) + Number(vt.time) : vt.time;

                    console.log('                     - st: ' + st);
                    console.log('                     - et: ' + et);
                    console.log('                     - vt.time: ' + vt.time);
                    console.log('                     - adjust_time: ' + adjust_time);

                    loToDoListBuilder += '<li class="toDoLOItem-' + curHRId + '">' + timeDisplayBuilder(adjust_time) + ' | <i class="fab fa-youtube"></i> ' + vt.post_title + ' ' + glossaryTip(vidGloss) + '</li>';

                    if (appContent.featured_video != vt.post_id) {
                         loTotalTime = Number(loTotalTime) + Number(adjust_time);
                    }


               }

               if (jQuery.type(hrid.featured_example) === 'object') {

                    let fex = createResource(hrid.featured_example, curHRId, 'featured_example');

                    loToDoListBuilder += '<li class="toDoLOItem-' + curHRId + '">' + timeDisplayBuilder(fex.time) + ' | <i class="fas fa-link"></i> ' + fex.post_title + ' ' + glossaryTip(exampGloss) + '</li>';


               }

               if (jQuery.type(hrid.required_knowledge_resource) === 'object') {

                    let vt = createResource(hrid.required_knowledge_resource, curHRId, 'required_knowledge_resource');

                    loToDoListBuilder += '<li class="toDoLOItem-' + curHRId + '">' + timeDisplayBuilder(vt.time) + ' | <i class="fas fa-link"></i> ' + vt.post_title + ' ' + glossaryTip(resGloss) + '</li>';

                    loTotalTime = Number(loTotalTime) + Number(vt.time);

               }

               if (jQuery.type(hrid.additional_knowledge_resource) === 'object') {

                    createResource(hrid.additional_knowledge_resource, curHRId, 'additional_knowledge_resource');

               }

               jQuery('#lo-time-' + curHRId + '').html(formatTimeToCom(loTotalTime));

               jQuery('.action_items_list_los').append('<li id="toDoLO-' + curHRId + '"> <strong>' + timeDisplayBuilder(loTotalTime) + ' | ' + hrid.post_title + '</strong><ul>' + loToDoListBuilder + '</ul></li>');

               lesson_time_to_complete = Number(lesson_time_to_complete) + Number(loTotalTime);

          });

     }

     if (lesson_time_to_complete !== undefined) {

          jQuery('#action_items_list').append('<li style="color: rgb(4, 56, 81);font-size: 1.1em;font-weight: 600;text-align: center;"><i class="far fa-clock"></i> ' + lesson_time_to_complete + ' minutes total estimated to complete this lesson.</li>');

     }

     if (lessonTotalPoints !== undefined && lessonTotalPoints > 0) {

          jQuery('#action_items_list').append('<li style="color: rgb(4, 56, 81);font-size: 1.1em;font-weight: 600;text-align: center;"><i class="fa fa-bart-chart-o"></i> ' + lessonTotalPoints + ' total points possible for this lesson.</li>');

     }

     if (isAdminUser) {

          jQuery('.lo-edit-link, .obj-edit-link').css('display', 'inline-block');

     }

     jQuery('.learning_objectives li .learningObjectivesTitle').each(function () {

          jQuery(this).parent().children('ul').first().slideToggle();

     });

     jQuery('.learning_objectives li .learningObjectivesTitle .loTtlDiv').on('click', function () {

          jQuery(this).parent().parent().children('ul').first().slideToggle();

     });

     jQuery('.lo-cb-complete').each(function () {

          if (localStorage) {

               var x = localStorage.getItem(jQuery(this).attr('id'));

               x = (x == 'true');

               if (x) {

                    jQuery(this).prop('checked', x);

               }

          }

          setCookie(jQuery(this).attr('id'), x, 30);

     });

     jQuery('.resourceMenu').each(function () {

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

function secondsToMinutes(time) {
     return Math.floor(time / 60) + '.' + Math.floor(time % 60);
}

function timeDisplayBuilder(t) {

     return `<span style="color: rgb(4, 56, 81); font-size: 12px;">${t} <i class="far fa-clock"></i></span>`;

}


function initDom() {


     console.log('curPType initDom: ' + curPType);


     loader('Initializing DOM', 'app-initDOM', 1);


     jQuery("#resourceTabs li:first").addClass("active");


     jQuery(".tab-content .tab-pane:first").addClass("active");


     jQuery("#resourceTabs li").click(function (e) {

          jQuery(".nav-tabs>li.active").removeClass('active');

          jQuery(this).addClass("active");

     });


     if (jQuery('#comments').length) {

          jQuery('#comments').appendTo('#commentsResourcesDiv');

     }


     if (curPType === 'iop_lesson') {

          jQuery(".learn-press-content-item-container").append('<div class="cover"><a class="stack">i</a><a class="stack">o</a><a class="stack">p</a></div>');

     }


     let h5Txt = (isAssign) ? 'Complete the following assignment deliverables:' : 'Complete the following featured lesson items:';

     let h4Txt = (isAssign) ? `Performance Objectives & Action Items:` : `Action Items for this Lesson:`;


     jQuery("#registration").append(`

                            <h4 id="actionWinTtl">${curPType}</h4>

                            <ul id="action_items_list">

                                <li>

                                    <h5>${h4Txt}</h5>

                                    <ul class="action_items_list_main"></ul>

                                </li>

                            </ul>

                            <div style="width: 100%; text-align: center;">

                            <button id="printAlBtn" href="" title="Print Action Items" onclick="printElement('#action_items_list')" name="printAlBtn"><i class="fas fa-print"></i> Print </button>

                            </div>

                            `);


     loader('Done Initializing DOM', 'app-initDOM', 0);

}


(function ($) {


     $.fn.fitText = function (kompressor, options) {


          // Setup options

          var compressor = kompressor || 1,

               settings = $.extend({

                    'minFontSize': Number.NEGATIVE_INFINITY,

                    'maxFontSize': Number.POSITIVE_INFINITY

               }, options);


          return this.each(function () {


               // Store the object

               var $this = $(this);


               // Resizer() resizes items based on the object width divided by the compressor * 10

               var resizer = function () {

                    $this.css('font-size', Math.max(Math.min($this.width() / (compressor * 10), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)));

               };


               // Call once to set.

               resizer();


               // Call on resize. Opera debounces their resize by default.

               $(window).on('resize.fittext orientationchange.fittext', resizer);


          });


     };


})(jQuery);


jQuery(function () {

     jQuery('#supported').text('Supported/allowed: ' + !!screenfull.enabled);


     if (!screenfull.enabled) {

          return false;

     }


     jQuery('#nwBtn').click(function () {

          screenfull.request(jQuery('#container')[0]).then(function () {

               console.log('Browser entered fullscreen mode')

          })

          // Does not require jQuery. Can be used like this too:

          // screenfull.request(document.getElementById('container'));

     });


     jQuery('#exit').click(function () {

          screenfull.exit().then(function () {

               console.log('Browser exited fullscreen mode')

          });

     });


     jQuery('#toggle').click(function () {

          screenfull.toggle(jQuery('#container')[0]).then(function () {

               console.log('Fullscreen mode: ' + (screenfull.isFullscreen ? 'enabled' : 'disabled'))

          });

     });


     jQuery('#request2').click(function () {

          screenfull.request();

     });


     jQuery('#demo-img').click(function () {

          screenfull.toggle(this);

     });


     function fullscreenchange() {

          var elem = screenfull.element;


          jQuery('#status').text('Is fullscreen: ' + screenfull.isFullscreen);


          if (elem) {

               jQuery('#element').text('Element: ' + elem.localName + (elem.id ? '#' + elem.id : ''));

          }


          if (!screenfull.isFullscreen) {

               jQuery('#external-iframe').remove();

               document.body.style.overflow = 'auto';

          }

     }


     screenfull.on('change', fullscreenchange);


     // Set the initial values

     fullscreenchange();

});


function initSpeech() {

     jQuery('button .js-highlight-btn').insertAfter('<button class="annotator-adder-actions__button js-speak-btn"><span class="annotator-adder-actions__label" data-action="comment">Speak</span></button>');


     if ('speechSynthesis' in window) {


          jQuery('#optionsPanel').show();


          speechSynthesis.onvoiceschanged = function () {

               var voicelist = jQuery('#voicesSelector');


               if (voicelist.find('option').length == 0) {

                    speechSynthesis.getVoices().forEach(function (voice, index) {

                         var option = jQuery('<option>')

                              .val(index)

                              .html(voice.name + (voice.default ? ' (default)' : ''));


                         voicelist.append(option);

                    });

               }

          }


          jQuery('#speakBtn, .js-speak-btn').click(function (event) {

               var text = jQuery('#message').val();

               var msg = new SpeechSynthesisUtterance();

               var voices = window.speechSynthesis.getVoices();

               msg.voice = voices[jQuery('#voicesSelector').val()];

               msg.rate = jQuery('#rate').val() / 10;

               msg.pitch = jQuery('#pitch').val();

               msg.text = getSelectionText();


               msg.onend = function (e) {

                    //console.log('Finished in ' + event.elapsedTime + ' seconds.');

               };


               msg.text = (msg.text) ? msg.text : 'You have no text selected on the page. Please select some text and then click the speak button again.';


               //console.log('MESSAGE: ' + msg.text);


               speechSynthesis.speak(msg);


               event.preventDefault();

          })

     } else {

          console.log('This browser does not support text to speech.');

     }

}


function getPageLink(current_link, current_title = 'No Title') {

     console.log('current_link: ' + current_link);

     var linkChk;

     current_link = current_link.replace('http:', 'https:');

     current_title = decodeURIComponent(current_title);

     let found = ignoreLink.find(el => current_link.includes(el));

     console.log('found: ' + found);

     if (current_link === '') {

          alert('there is a problem with this link.');

     } else if (found !== undefined) {

          console.log('HERE: ' + ignoreLink.indexOf(current_link));

          console.log('current_link: ' + current_link);

          addModal('Opening Link In New Window', 'This link prevents other sites from opening it in an iframe. We will now open the link in a new window/tab for you. <br />' + current_link, 'new window', 1);

          window.open(current_link, '_blank');

     } else if (current_link.indexOf('youtube') > -1) {

          jQuery('#resourceDisplay .title').html('LOADING: ' + current_title);

          jQuery('#resourceDisplay .window-cur-link').attr('href', current_link);

          jQuery('#resourceDisplay').show();

          jQuery('#resourceDisplay .wrapper').css('height', '626px');

          jQuery('#resourceDisplay .wrapper iframe').css('height', '600px');

          linkChk = "ya";

          if (current_link.indexOf('watch?v=') > -1) {

               var linkParms = getUrlVars(current_link);

               var stime = (linkParms['t']) ? '' + linkParms['t'].replace('s', '') : '1';

               current_link = 'https://www.youtube.com/embed/' + linkParms['v'] + '?enablejsapi=1&modestbranding=1&autohide=1&showinfo=0&controls=1&rel=0&start=' + stime;

               //console.log('current_link after time: ' + current_link);

          }

          jQuery('#resourceDisplay iframe').attr('src', current_link);

          jQuery('#resourceDisplay .title').html(current_title);

     } else {


          jQuery.get(globalResourcesPath + "includes/link_check.php?url=" + encodeURIComponent(current_link), function (data) {

               if (data === "ya") {

                    jQuery('#resourceDisplay .title').html('LOADING: ' + current_title);

                    jQuery('#resourceDisplay .window-cur-link').attr('href', current_link);

                    jQuery('#resourceDisplay').show();

                    jQuery('#resourceDisplay .wrapper').css('height', '90vh');

                    jQuery('#resourceDisplay .wrapper iframe').css("height", "-webkit-fill-available");

                    jQuery('#resourceDisplay .wrapper iframe').css("height", "90vh");

                    jQuery('#resourceDisplay .wrapper iframe').css("height", "100%");

                    jQuery('#resourceDisplay iframe').attr('src', current_link);

                    jQuery('#resourceDisplay .title').html(current_title);

               } else {

                    //jQuery('#resourceDisplay iframe').attr('src', loaderPagesPath + 'resource-blocked.html');

                    addModal('Opening Link In New Window', 'This link prevents other sites from opening it in an iframe. We will now open the link in a new window/tab for you. <br />' + current_link, 'new window', 1);

                    setTimeout(function () {

                         //closeResourceDisplay();

                         window.open(current_link, '_blank');

                         addModal();

                    }, 4000);

               }

          });


     }

}


function adjustPans() {

     jQuery('.resourceMenu').each(function () {

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


function createResource(obj, curHRId, resTyp = 'noType', start_time = 0, end_time = 0) {

     console.log('starting createResource');

     for (var xa in obj) {

          xa = xa;

          console.log("             - resource start time: " + start_time);
          console.log("             - resource end time: " + end_time);
          console.log("             - resource curHRId: " + curHRId);

          var cid = obj[xa].id;

          var url = obj[xa].url;

          var post_title = obj[xa].post_title;

          var post_content = obj[xa].post_content;

          var resource_screen_shot = (obj[xa].resource_screen_shot) ? obj[xa].resource_screen_shot : globalResourcesPath + 'images/resource_thumbnail/image-not-found.jpg';

          var theTime = (obj[xa].time_to_complete > 2) ? obj[xa].time_to_complete : 5;

          var reObj = {

               post_title: obj[xa].post_title,

               post_id: obj[xa].id,

               time: theTime

          }


          let resFor = ' resFor';

          for (var krf in obj[xa].knowledge_resource_format) {

               resFor += ' ' + obj[xa].knowledge_resource_format[krf].slug;

          }


          console.log('                             ------- find ?: ' + url.indexOf('?'));

          let xx = '';

          xx = url.replace('watch?v=', 'embed/');

          // xx = (xx.indexOf('?') <= 0 && (start_time > 0 || end_time > 0)) ? xx+'?start=10&end=30' : url;

          xx = xx + '?enablejsapi=1&rel=0&modestbranding=1&autohide=1&showinfo=0&controls=1';

          xx = (start_time > 0) ? xx + '&start=' + start_time : xx;
          xx = (end_time > 0) ? xx + '&end=' + end_time : xx;

          console.log('                             ------- xx: ' + xx);

          console.log("                             ------- url: " + url);

          let resObj = '<div class="lessonVideoWrapper ' + resTyp + 'Wrapper" onclick="getPageLink(\'' + xx + '\',\'' + post_title.replace(/("|')/g, "") + '\')"><span class="glossary-tooltip"><span class="glossary-link"><img class="lessonVideo ' + resTyp + 'Item ' + resFor + '" data-toggle="popover" width="200" src="' + resource_screen_shot + '" data-provider="youtube" /></span><span class="hidden glossary-tooltip-content clearfix"><span class="glossary-tooltip-text">' + post_title + '</span></span></div>';


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

               console.log('got here: ' + url);

               var fv = url;

               fv += '?enablejsapi=1&rel=0&modestbranding=1&autohide=1&showinfo=0&controls=1';

               fv = fv.replace('watch?v=', 'embed\/');

               console.log('    fv: ' + fv);

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

     return str.replace(/[\u00A0-\u9999<>&](?!#)/gim, function (i) {

          return '&#' + i.charCodeAt(0) + ';';

     });

}


function decodeHTML(str) {

     return str.replace(/&#([0-9]{1,3});/gi, function (match, num) {

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

     //console.log(this);

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

          (activeElTagName == "textarea") || (activeElTagName == "input"
               &&

               /^(?:text|search|password|tel|url)$/i.test(activeEl.type))
          &&

          (typeof activeEl.selectionStart == "number")

     ) {

          text = activeEl.value.slice(activeEl.selectionStart, activeEl.selectionEnd);

     } else if (window.getSelection) {

          text = window.getSelection().toString();

     }

     return text;

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

     var parts = urlStr.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {

          vars[key] = value;

     });

     return vars;

}

/*

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

*/

function loader(msg, msgId, stat) {


     if (stat > 0) {

          jQuery('div#appInfo .msg').prepend('<div class="update-msg" id="' + msgId + '">' + msg + '</div>');

     } else {

          let x = '#' + msgId;

          jQuery("#" + msgId + "").remove();

     }


     let ldrLen = jQuery('div#appInfo .msg .update-msg').length;

     //console.log('                         - LOADER LENGTH: ' + ldrLen + ' | ' + msgId + ' | ' + msg);

     if (ldrLen <= 0) {

          jQuery('#comDiv').hide();

     }


}


function changeView(view, itemId) {

     loader('Loading Application', 'app-root', 1);

     switch (view) {

          case 'home':

               jQuery('#vidContainer, .actionItemsTtl').hide();

               jQuery('#headerMainTitle').text('iop | Courses');

               if (!appContent.pageViews.home) {

                    courseCards();

               }

               jQuery(".content-item-description").html(appContent.pageViews.home);

               jQuery(".courseCard").on("click", function () {

                    console.log(this.id + ' clicked.');

                    console.log(ptype + ' ptype.');

                    changeView('course', this.id);

                    //window.open(sitePath+'?ptype=lp_course&id='+this.id);

               });


               break;

          case 'course':

               curPType = 'lp_course';

               curId = itemId;

               courseView();

               jQuery('#headerMainTitle').on('click', function () {

                    changeView('home', 0)

               });

               // code block

               break;

          case 'lesson':

               // code block

               break;

          default:

               initDom();

               window.hypothesisConfig = function () {

                    return {

                         "showHighlights": true

                    };

               };

               initLearningObjectives();

               initSpeech();

               initFonts();

               setTimeout(function () {

                    jQuery(".glossary-tooltip a, .learning_objectives a, .content-item-summary a, section a, #action_items_list a").on("click", function (e) {

                         let ttl = (jQuery(this).text() == 'More') ? jQuery(this.parentNode).parent().parent().children('.glossary-link').children('a').text() : jQuery(this).text();

                         getPageLink(jQuery(this).attr('href'), ttl.replace(/("|')/g, ""));

                         e.preventDefault();

                    });

                    jQuery("#resourceDisplay .close-button").on("click", closeResourceDisplay);

                    jQuery(".lo-cb-complete").on("click", function () {

                         if (localStorage) {

                              localStorage.setItem(jQuery(this).attr('id'), jQuery(this).prop('checked'));

                         }

                         setCookie(jQuery(this).attr('id'), jQuery(this).prop('checked'), 30);

                    });

                    jQuery(window).resize(function () {

                         adjustPans();

                    });

                    jQuery(".lazy").on("load", function () {

                         console.log(this + ' iframe loaded');

                    });

                    jQuery("#action_items_list a").on("click", function (e) {

                         e.preventDefault();

                    });

                    var maxz = jQuery('.resourceMenu:last').css("zIndex");

                    jQuery(".resourceMenu").on("click", function () {

                         maxz++;

                         jQuery(this).css('z-index', maxz);

                         let curPos = (jQuery(this).css('bottom') == '0px') ? ('-' + (jQuery(this).height() + 18) + 'px') : '0px';

                         jQuery(this).css('background', 'hsla(0, 0%, 0%, 1.0)');

                         jQuery(this).css('bottom', 0);

                    });

                    jQuery(".resourceClose").on("click", function () {

                         jQuery(this).parent().parent().animate({

                              bottom: '' + ('-' + (jQuery(this).parent().parent().height() + 20) + 'px') + ''

                         });

                         jQuery(this).parent().parent().css('background', 'hsla(0, 0%, 0%, 0.7)');

                    });

                    if (curPType === "iop_assignment" || curPType === "lp_assignment") {

                         console.log('inside assignment instructions: ' + curPType + ': ' + (curPType === "iop_assignment" || curPType === "lp_assignment"));

                    }

                    jQuery('.glossary-tooltip-content').css('display', 'block !important');

                    adjustPans();

                    jQuery(this).parent().parent().css('background', 'hsla(0, 0%, 0%, 0.7)');

                    loader('Application Loaded', 'app-root', 0);

               }, 1500);

     }

     loader('Application Loaded', 'app-root', 0);

}


function courseCards() {

     loader('Loading Course Cards', 'app-course-cards', 1);

     var objret = priObj;

     var pgBuilder = '';

     pgBuilder = pgBuilder + '<div id="corses-deck" class="row">';

     objret.forEach(function (hrid) {

          pgBuilder = pgBuilder + `<div id="${hrid.id}" class="card col-lg-4 col-md-6 col-sm-12 courseCard" style="cursor:pointer;">

                                  <img class="card-img-top" src="https://via.placeholder.com/350x150" alt="Card image cap">

                                  <div class="card-body">

                                    <h5 class="card-title">${hrid.title.rendered}</h5>

                                    <p class="card-text text-truncate d-inline-block">${hrid.content.rendered.split(" ").splice(0,20).join(" ")}...</p>

                                  </div>

                                  <div class="card-footer">

                                    <small class="text-muted">Last updated ${hrid.modified}</small>

                                  </div>

                                </div>`;

          appContent.courses[hrid.id] = hrid;

          if (hrid.id != "undefined") {
               //console.log(hrid.id + '- ' + hrid.title.rendered);
               //let tmpC = '{' + hrid.id + ',' + hrid.title.rendered + '}';
               appContent.courseList[Number(hrid.id)] = hrid.title.rendered;
               // console.log(hrid.id + '- ' + hrid.title.rendered);
          }
     });

     pgBuilder = pgBuilder + `</div>`;

     appContent.pageViews.home = pgBuilder;

     loader('Course Cards Loaded', 'app-course-cards', 0);

}


function courseView() {

     loader('Course', 'app-course', 1);

     jQuery('#headerMainTitle').text('iop | ' + appContent.courses[curId].title.rendered);

     var pgBuilder = `<h1>${appContent.courses[curId].title.rendered}</h1>`;

     jQuery(".content-item-description").html(pgBuilder);

     loader('Course Loaded', 'app-course', 0);

}


function addModal(ttl = 'no title', con = 'no content', ftr = 'no footer', status = 0) {


     ttl = (status) ? ttl : '';

     con = (status) ? con : '';

     ftr = (status) ? ftr : '';

     status = (status) ? 'show' : 'hide';


     jQuery(".modal-title").html(ttl);

     jQuery(".modal-body").html(ttl);

     jQuery(".modal-footer").html(ttl);

     jQuery("#infoModal").modal(status);


}


function createEditLink(x) {

     return `<a href="${lmsAdminPath}post.php?post=${x}&action=edit" onclick="javascript(\'window.open(current_link, "example_blank");\')" style="display:none;" class="obj-edit-link"><i class="fas fa-pencil-alt"></i></a>`;

}


function clearCache(oid) {

     jQuery.get("https://iop.inside-out-project.com/cache-clear.php?id=" + oid, function (data, status) {

          alert("Data: " + data + "\nStatus: " + status);

          location.reload();

     });

}
