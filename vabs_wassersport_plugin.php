<?php

/**
 * Plugin Name: VABS - Wassersport Plugin
 * Description: VABS Plugin to book courses or voucher
 * Version: 1.1
 * Author: Uwe Horn
 * Author URI http://uwe-horn.net
 * License: GPLv2 or later
 * Text Domain: vrb
 */

defined('ABSPATH') or die('You can not access this file.');

define('VABS_PLUGIN_WASSERSPORT_ROOTPATH', plugin_dir_path( __FILE__ ));

include_once('public/dependencies.php');
include_once('public/adminpage.php');
include_once('public/shortcode.php');
include_once('public/index.php');
include_once('public/api/index.php');


function init_vabs_wassersport_plugin_connection_plugin()
{
    $plugin = new VRB_Wassersport_Connection_Plugin();
}

init_vabs_wassersport_plugin_connection_plugin();


