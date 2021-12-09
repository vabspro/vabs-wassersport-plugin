<?php

class VRBWassersportDependencies
{
    protected $options;

    public function __construct()
    {
        add_action( 'admin_enqueue_scripts', array($this, 'enqueue_admin') );
        add_action( 'wp_enqueue_scripts', array($this, 'enqueue') );
    }

    public function enqueue_admin()
    {
        wp_enqueue_style('vrb_wassersport_plugin_admin_style', plugins_url( 'vabs-wassersport-plugin/dist/backend/index.css'));
        wp_enqueue_script('vrb_wassersport_plugin_admin_script', plugins_url( 'vabs-wassersport-plugin/dist/backend/index.js'), '', '', true);

    }

    public function enqueue()
    {
        wp_enqueue_style('vrb_wassersport_plugin_style', plugins_url( 'vabs-wassersport-plugin/dist/frontend/index.css'));
        wp_enqueue_script('vrb_wassersport_plugin_script', plugins_url( 'vabs-wassersport-plugin/dist/frontend/index.js'), '', '', true);

    }
}