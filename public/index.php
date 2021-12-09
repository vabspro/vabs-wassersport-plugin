<?php

class VRB_Wassersport_Connection_Plugin
{
    protected $dependencies;
    protected $adminpage;
    protected $bookingshortcode;
    protected $endpoints;

    public function __construct()
    {
        $this->dependencies = new VRBWassersportDependencies();
        $this->adminpage = new VRBWassertsportAdminPage();
        $this->bookingshortcode = new VRBWassersportShortcode();
        $this->endpoints = new VABSWassersportEndpoints();
    }

}