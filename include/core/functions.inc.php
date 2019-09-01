<?php

function getPageData($ptype, $currentId, $iopCourseDir, $jsFileWritePath)
{

    date_default_timezone_set('US/Eastern');

    $time = 6; //seconds

    $file = $jsFileWritePath;

    if (!file_exists($file) || $refFile) {
        $json = updateFileData($file, $ptype, $currentId);
    } else {
        $fileAge = filemtime($file);
        $fileAgeAr = secondsToTime(time() - $fileAge);
        if (time() - $fileAge <= $time) {
            $json = file_get_contents($file);
        } else {
            $json = updateFileData($file, $ptype, $currentId);
        }
    }
    $obj = json_decode($json);
    return $obj;
}

function updateFileData($file, $ptype, $currentId)
{
    global $parentPtype;
    $keyVal = ($parentPtype !== $ptype) ? $parentPtype : $ptype;

    if (REQORG !== 'iop') {
        $keyVal = str_replace("iop_", "lp_", $keyVal);
    }

    if ($keyVal == 'home') {
        $json = file_get_contents('https://dev01.inside-out-project.com/wp-json/wp/v2/lp_course/?knowledge_focus=1994');
        // }else if($ptype == 'semester_info'){
        //       $json = file_get_contents( API_JSON_PATH . '/syllabus/' . $currentId );
        //       echo 'GOT TO HERE WITH SEMESTER INFORMATION';
    } else {
        $json = file_get_contents(API_JSON_PATH . $keyVal . '/' . $currentId);
    }
    $jContent = 'var priObj = ' . $json;
    $file = fopen($file, 'w');
    fwrite($file, $jContent);
    fclose($file);
    return $json;
}

function updateContactInfoData($content)
{

    date_default_timezone_set('US/Eastern');

    $time = 6; //seconds

    $file = '/insights/contact_info.php';

    if (!file_exists($file)) {

        $file = fopen($file, 'w');
        fwrite($file, $content);
        fclose($file);

    } else {

        $fileAge = filemtime($file);

        $fileAgeAr = secondsToTime(time() - $fileAge);

        if ($fileAge <= $time) {

            $file = fopen($file, 'w');
            fwrite($file, $content);
            fclose($file);

        }

    }

}

function seoUrl($string)
{
    //Lower case everything
    $string = strtolower($string);
    //Make alphanumeric (removes all other characters)
    $string = preg_replace("/[^a-z0-9_\s-]/", "", $string);
    //Clean up multiple dashes or whitespaces
    $string = preg_replace("/[\s-]+/", " ", $string);
    //Convert whitespaces and underscore to dash
    $string = preg_replace("/[\s_]/", "-", $string);
    return $string;
}

function create_trinket($iframeHeight)
{
    return "<script>( function ( d, l, s, i, c ){function n( e ){e=e.nextSibling; return ( !e || e.nodeType !=3 ) ? e : n( e );}; function r( f ){/in/.test( d.readyState ) ? setTimeout( function (){r( f );}, 9 ) : f()}; l=d.getElementsByTagName( 'script' ); s=l[ l.length - 1]; r( function (){i=n( s ), c=n( i ); i.setAttribute( 'src', 'https://trinket.io/tools/1.0/jekyll/embed/python3?runMode=console&outputOnly=true#code=' + encodeURIComponent( c.nodeValue.replace( /^\s+|\s+$/g, '' ) ) );});})( document );</script><iframe width=\"100%\" height=\"$iframeHeight\" allowfullscreen class=\"lazy lazyload\"></iframe>";
}

function create_trinket_editor($iframeHeight)
{
    return "<script>( function ( d, l, s, i, c ){function n( e ){e=e.nextSibling; return ( !e || e.nodeType !=3 ) ? e : n( e );}; function r( f ){/in/.test( d.readyState ) ? setTimeout( function (){r( f );}, 9 ) : f()}; l=d.getElementsByTagName( 'script' ); s=l[ l.length - 1]; r( function (){i=n( s ), c=n( i ); i.setAttribute( 'src', 'https://trinket.io/tools/1.0/jekyll/embed/python3#code=' + encodeURIComponent( c.nodeValue.replace( /^\s+|\s+$/g, '' ) ) );});})( document );</script><iframe width=\"100%\" height=\"$iframeHeight\" allowfullscreen class=\"lazy lazyload\"></iframe>";
}

function seconds2human($ss)
{
    $s = $ss % 60;
    $m = floor(($ss % 3600) / 60);
    $h = floor(($ss % 86400) / 3600);
    $d = floor(($ss % 2592000) / 86400);
    $M = floor($ss / 2592000);

    return "$M months, $d days, $h hours, $m minutes, $s seconds";
}

function secondsToTime($inputSeconds)
{
    $secondsInAMinute = 60;
    $secondsInAnHour = 60 * $secondsInAMinute;
    $secondsInADay = 24 * $secondsInAnHour;

    // Extract days
    $days = floor($inputSeconds / $secondsInADay);

    // Extract hours
    $hourSeconds = $inputSeconds % $secondsInADay;
    $hours = floor($hourSeconds / $secondsInAnHour);

    // Extract minutes
    $minuteSeconds = $hourSeconds % $secondsInAnHour;
    $minutes = floor($minuteSeconds / $secondsInAMinute);

    // Extract the remaining seconds
    $remainingSeconds = $minuteSeconds % $secondsInAMinute;
    $seconds = ceil($remainingSeconds);

    // Format and return
    $timeParts = [];
    $sections = [
        'day' => (int) $days,
        'hour' => (int) $hours,
        'minute' => (int) $minutes,
        'second' => (int) $seconds,
    ];

    foreach ($sections as $name => $value) {
        if ($value > 0) {
            $timeParts[] = $value . ' ' . $name . ($value == 1 ? '' : 's');
        }
    }

    return $sections;
}

function minify_html($input)
{
    if (trim($input) === "") {
        return $input;
    }

    // Remove extra white-space(s) between HTML attribute(s)
    $input = preg_replace_callback('#<([^\/\s<>!]+)(?:\s+([^<>]*?)\s*|\s*)(\/?)>#s', function ($matches) {
        return '<' . $matches[1] . preg_replace('#([^\s=]+)(\=([\'"]?)(.*?)\3)?(\s+|$)#s', ' $1$2', $matches[2]) . $matches[3] . '>';
    }, str_replace("\r", "", $input));
    // Minify inline CSS declaration(s)
    if (strpos($input, ' style=') !== false) {
        $input = preg_replace_callback('#<([^<]+?)\s+style=([\'"])(.*?)\2(?=[\/\s>])#s', function ($matches) {
            return '<' . $matches[1] . ' style=' . $matches[2] . minify_css($matches[3]) . $matches[2];
        }, $input);
    }
    if (strpos($input, '</style>') !== false) {
        $input = preg_replace_callback('#<style(.*?)>(.*?)</style>#is', function ($matches) {
            return '<style' . $matches[1] . '>' . minify_css($matches[2]) . '</style>';
        }, $input);
    }
    if (strpos($input, '</script>') !== false) {
        $input = preg_replace_callback('#<script(.*?)>(.*?)</script>#is', function ($matches) {
            return '<script' . $matches[1] . '>' . minify_js($matches[2]) . '</script>';
        }, $input);
    }

    return preg_replace(
        array(
            // t = text
            // o = tag open
            // c = tag close
            // Keep important white-space(s) after self-closing HTML tag(s)
            '#<(img|input)(>| .*?>)#s',
            // Remove a line break and two or more white-space(s) between tag(s)
            '#(<!--.*?-->)|(>)(?:\n*|\s{2,})(<)|^\s*|\s*$#s',
            '#(<!--.*?-->)|(?<!\>)\s+(<\/.*?>)|(<[^\/]*?>)\s+(?!\<)#s', // t+c || o+t
            '#(<!--.*?-->)|(<[^\/]*?>)\s+(<[^\/]*?>)|(<\/.*?>)\s+(<\/.*?>)#s', // o+o || c+c
            '#(<!--.*?-->)|(<\/.*?>)\s+(\s)(?!\<)|(?<!\>)\s+(\s)(<[^\/]*?\/?>)|(<[^\/]*?\/?>)\s+(\s)(?!\<)#s', // c+t || t+o || o+t -- separated by long white-space(s)
            '#(<!--.*?-->)|(<[^\/]*?>)\s+(<\/.*?>)#s', // empty tag
            '#<(img|input)(>| .*?>)<\/\1>#s', // reset previous fix
            '#(&nbsp;)&nbsp;(?![<\s])#', // clean up ...
            '#(?<=\>)(&nbsp;)(?=\<)#', // --ibid
            // Remove HTML comment(s) except IE comment(s)
            '#\s*<!--(?!\[if\s).*?-->\s*|(?<!\>)\n+(?=\<[^!])#s',
        ),
        array(
            '<$1$2</$1>',
            '$1$2$3',
            '$1$2$3',
            '$1$2$3$4$5',
            '$1$2$3$4$5$6$7',
            '$1$2$3',
            '<$1$2',
            '$1 ',
            '$1',
            "",
        ),
        $input);
}

function minify_css($input)
{
    if (trim($input) === "") {
        return $input;
    }

    return preg_replace(
        array(
            // Remove comment(s)
            '#("(?:[^"\\\]++|\\\.)*+"|\'(?:[^\'\\\\]++|\\\.)*+\')|\/\*(?!\!)(?>.*?\*\/)|^\s*|\s*$#s',
            // Remove unused white-space(s)
            '#("(?:[^"\\\]++|\\\.)*+"|\'(?:[^\'\\\\]++|\\\.)*+\'|\/\*(?>.*?\*\/))|\s*+;\s*+(})\s*+|\s*+([*$~^|]?+=|[{};,>~+]|\s*+-(?![0-9\.])|!important\b)\s*+|([[(:])\s++|\s++([])])|\s++(:)\s*+(?!(?>[^{}"\']++|"(?:[^"\\\]++|\\\.)*+"|\'(?:[^\'\\\\]++|\\\.)*+\')*+{)|^\s++|\s++\z|(\s)\s+#si',
            // Replace `0(cm|em|ex|in|mm|pc|pt|px|vh|vw|%)` with `0`
            '#(?<=[\s:])(0)(cm|em|ex|in|mm|pc|pt|px|vh|vw|%)#si',
            // Replace `:0 0 0 0` with `:0`
            '#:(0\s+0|0\s+0\s+0\s+0)(?=[;\}]|\!important)#i',
            // Replace `background-position:0` with `background-position:0 0`
            '#(background-position):0(?=[;\}])#si',
            // Replace `0.6` with `.6`, but only when preceded by `:`, `,`, `-` or a white-space
            '#(?<=[\s:,\-])0+\.(\d+)#s',
            // Minify string value
            '#(\/\*(?>.*?\*\/))|(?<!content\:)([\'"])([a-z_][a-z0-9\-_]*?)\2(?=[\s\{\}\];,])#si',
            '#(\/\*(?>.*?\*\/))|(\burl\()([\'"])([^\s]+?)\3(\))#si',
            // Minify HEX color code
            '#(?<=[\s:,\-]\#)([a-f0-6]+)\1([a-f0-6]+)\2([a-f0-6]+)\3#i',
            // Replace `(border|outline):none` with `(border|outline):0`
            '#(?<=[\{;])(border|outline):none(?=[;\}\!])#',
            // Remove empty selector(s)
            '#(\/\*(?>.*?\*\/))|(^|[\{\}])(?:[^\s\{\}]+)\{\}#s',
        ),
        array(
            '$1',
            '$1$2$3$4$5$6$7',
            '$1',
            ':0',
            '$1:0 0',
            '.$1',
            '$1$3',
            '$1$2$4$5',
            '$1$2$3',
            '$1:0',
            '$1$2',
        ),
        $input);
}

function minify_js($input)
{
    if (trim($input) === "") {
        return $input;
    }

    return preg_replace(
        array(
            // Remove comment(s)
            '#\s*("(?:[^"\\\]++|\\\.)*+"|\'(?:[^\'\\\\]++|\\\.)*+\')\s*|\s*\/\*(?!\!|@cc_on)(?>[\s\S]*?\*\/)\s*|\s*(?<![\:\=])\/\/.*(?=[\n\r]|$)|^\s*|\s*$#',
            // Remove white-space(s) outside the string and regex
            '#("(?:[^"\\\]++|\\\.)*+"|\'(?:[^\'\\\\]++|\\\.)*+\'|\/\*(?>.*?\*\/)|\/(?!\/)[^\n\r]*?\/(?=[\s.,;]|[gimuy]|$))|\s*([!%&*\(\)\-=+\[\]\{\}|;:,.<>?\/])\s*#s',
            // Remove the last semicolon
            '#;+\}#',
            // Minify object attribute(s) except JSON attribute(s). From `{'foo':'bar'}` to `{foo:'bar'}`
            '#([\{,])([\'])(\d+|[a-z_][a-z0-9_]*)\2(?=\:)#i',
            // --ibid. From `foo['bar']` to `foo.bar`
            '#([a-z0-9_\)\]])\[([\'"])([a-z_][a-z0-9_]*)\2\]#i',
        ),
        array(
            '$1',
            '$1$2',
            '}',
            '$1$3',
            '$1.$3',
        ),
        $input);
}

function semInfoBlk($ttl, $con)
{
    $con = ($con === '') ? '<li>No information available</li>' : $con;
    $con = (strpos("$con", "<li>") > 0) ? '<ul>' . $con . '</ul>' : $con;
    return '<section><h4>' . $ttl . '</h4>' . $con . '</section>';
}
