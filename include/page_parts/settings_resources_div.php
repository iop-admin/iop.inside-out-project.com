<?php

    // settings resources div display dialog div in main page
?>

<div id="settingsResourcesDiv" class="resourceMenu">
    <div class="titleItem settingsMenu">
        <button type="button" class="close resourceClose" aria-label="Close">
            <i class="far fa-times-circle"></i>
        </button>
        <i class="fa fa-cog fa-lg"></i>
        <span class="ttlTxt"></span>
    </div>
    <div class="board">
        <div class="board-inner">
            <div class="tab-content">
                <div id="optionsPanel" style="display: none;">
                    <div class="row">
                        <form class="col s12">
                            <div class="row"><label>Choose voice</label><select id="voicesSelector"></select>
                            </div>
                            <div class="row">
                                <div class="col s6"><label>Rate</label>
                                    <p class="range-field"><input type="range" id="rate" min="1" max="100" value="10" />
                                    </p>
                                </div>
                                <div class="col s6"><label>Pitch</label>
                                    <p class="range-field"><input type="range" id="pitch" min="0" max="2" value="1" />
                                    </p>
                                </div>
                                <div class="col s12">
                                    <p>N.B. Rate and Pitch only work with native voice.</p>
                                </div>
                            </div>
                            <div class="row" style="display: none;">
                                <div class="input-field col s12"><textarea id="message"
                                        class="materialize-textarea"></textarea><label>Write message</label>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div id="fontConfigs" style="display: none;"><label>Font Size:</label><input type="range" min="8"
                        max="92" value="' + finalFontSize + '" id="slider" />
                </div>
            </div>
        </div>
    </div>
</div>