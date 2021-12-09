<?php

class VRBWassertsportAdminPage
{
    public $config;
    public $options;

    public function __construct()
    {
        include(VABS_PLUGIN_WASSERSPORT_ROOTPATH . '/public/config.php');
        $this->config = $config;

        add_action( 'admin_menu', array($this, 'add_vabs_admin_pages') );
    }

    public function add_vabs_admin_pages()
    {
        add_menu_page('vabs plugin', 'VABS Wassersport', 'manage_options', 'wpvabs_plugin', array($this, 'vabs_admin_index'), '', 110);
        add_submenu_page('wpvabs_plugin', 'Vabs Shortcode', 'Shortcode', 'manage_options', 'vabs_shortcode_generator', array($this, 'vabs_shortcode_generator'));
    }


    public function vabs_admin_index()
    {
        include(VABS_PLUGIN_WASSERSPORT_ROOTPATH . 'public/templates/index.php');
    }

    public function vabs_shortcode_generator()
    {
        include(VABS_PLUGIN_WASSERSPORT_ROOTPATH . 'public/templates/generator.php');
    }
}