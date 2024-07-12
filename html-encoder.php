<?php
header('Content-Type: text/html; charset=utf-8');
######################################################################################
# adilbo™ Software                                                                   #
#              _   _   _              ____        ___ _                              #
#    __ _  ___| |_| | | |___   ___™  / ___|  ___ / __| |_  _     _  __ _ _ __  ___   #
#   / _` |/ __  | | | |  __ \ / _ \  \___ \ / _ \| _|| __/| | _ | |/ _` | '__|/ __\  #
#  | (_| | (__| | | |_| |__) | (_) |  ___) | (_) | | | |_ | || || | (_| | |  |  _|   #
#   \__,_|\___,_|_|___|_,___/ \___/  |____/ \___/|_|  \__| \_____/ \__,_|_|   \___/  #
#                                                                                    #
# Copyright © 2015 http://adilbo.com - all rights reserved - Alle Rechte vorbehalten #
######################################################################################'

/*  VERSION 1.1  -  14.12.2015  */

//  SETUP - Please follow the comment tags for better understanding
    $var_name  = 'html_encoder_data'; // SET THREE DIFFERENT VALUES
    $func_name = 'html_encoder';      // SET THREE DIFFERENT VALUES
    $div_name  = 'html_encoder_div';  // SET THREE DIFFERENT VALUES
    $characters_per_line = 111;       // NOTE: Must be necessarily divisible by 3

// FOR DEBUGGING ONLY: SET ERROR REPORTING ON
error_reporting(E_ERROR | E_WARNING | E_PARSE | E_NOTICE);
error_reporting(0);

// CHECK ENVIRONMENT
if ( version_compare(phpversion(), '4.0') < 0 ) {
    die("<pre>\n\n\n\t<b>ERROR</b>: PHP 4.0 or greater is required!");
}

if($characters_per_line % 3 != 0) {
  die("<pre>\n\n\n\t<b>ERROR</b>: \$characters_per_line = $characters_per_line; // NOTE: Must be necessarily divisible by 3");
}

//  ENVIRONMENT SETUP
    ini_set('memory_limit', '-1'); set_time_limit(0);

//  WORK
    ob_start('html_encoder');

// HELPER
function html_encoder($buffer){
  global $var_name;
  global $func_name;
  global $div_name;
  if ( rand(1, 1) ) {
    $code = "<script async type=\"text/javascript\" language=\"Javascript\">function ".$func_name."(s){var i=0,out='';l=s.length;for(;i<l;i+=3){out+=String.fromCharCode(parseInt(s.substr(i,2),16));}document.write(out);}</script>";
    $out = $func_name."(".$var_name.");\n</script>";
  }else{
    $code = "<script async type=\"text/javascript\" language=\"Javascript\">function ".$func_name."(s){var i=0,out='';l=s.length;for(;i<l;i+=3){out+=String.fromCharCode(parseInt(s.substr(i,2),16));}document.getElementById('".$div_name."').innerHTML=out;}</script>";
    $out = "document.write('<div id=".$div_name."></div>');\n".$func_name."(".$var_name.");\n</script>";
  }
  $output  = "<script async type=\"text/javascript\" language=\"Javascript\">\n";
  $output .= "/*  HTML Encoder \n";
  $output .= " *  Reverse engineering of this file is strictly prohibited. \n";
  $output .= " *  File protected by copyright law and provided under license. \n";
  $output .= " *  Checksum: ".md5($code)."\n";
  $output .= " */\n";
  $output .= "document.write(unescape('".js_escape($code)."'));\n";
  #$output .= "document.write('<xmp>'+unescape('".js_escape($code)."'));\n"; // HACK
  $output .= "var ".$var_name."='';\n";
  $output .= encoder($buffer);
  $output .= $out;
  $noscript = '<noscript><div style="color:white;background:red;padding:20px;text-align:center"><tt><strong><big>For functionality of this site it is necessary to enable JavaScript. <br><br> Here are the <a target="_blank"href="http://www.enable-javascript.com/" style="color:white">instructions how to enable JavaScript in your web browser</a>.</big></strong></tt></div></noscript>';
  return ($output.$noscript);
}

function encoder( $in ) {
  global $var_name;
  global $func_name;
  global $div_name;
  global $characters_per_line;
  $out = '';
  // $in = utf8_decode($in);
  $in = mb_convert_encoding($in,'HTML-ENTITIES','auto');
  $in = htmlspecialcharsDecode($in);
  for ( $i = 0; $i < strlen( $in ); $i++) {
    $hex = dechex( ord($in[$i]) );
    if ( $hex == '' ) {
       $temp = urlencode( $in[$i] );
       $temp = str_replace('%', '', $temp);
       $out = $out.$temp.'.';
    }else{
       $out = $out.((strlen($hex)==1) ? ( '0'.strtoupper( $hex ) ):( strtoupper( $hex ) ) ).'.';
    }
  }
  $out = str_replace('+', '20.', $out);
  $out = str_replace('_', '5F.', $out);
  $out = str_replace('-', '2D.', $out);
  $out = $var_name."+='".chunk_split($out,$characters_per_line, "';\n".$var_name."+='")."';\n";
  $out = str_replace("html_encoder_data+='';\n", '', $out);
  return $out;
}

function htmlspecialcharsDecode($str, $quote_style = ENT_COMPAT) {
  return strtr($str, array_flip(get_html_translation_table(HTML_SPECIALCHARS, $quote_style)));
}

function js_escape($in) {
   $out = '';
   for ($i=0;$i<strlen($in);$i++){
     $hex = dechex(ord($in[$i]));
     if ($hex=='')
        $out = $out.urlencode($in[$i]);
     else
        $out = $out .'%'.((strlen($hex)==1) ? ('0'.strtoupper($hex)):(strtoupper($hex)));
   }
   return $out;
}

/* EOF - end of file */
