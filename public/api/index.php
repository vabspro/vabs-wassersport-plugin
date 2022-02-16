<?php

require VABS_PLUGIN_WASSERSPORT_ROOTPATH . 'vendor/autoload.php';

use Monolog\Handler\StreamHandler;
use Monolog\Logger;

class VABSWassersportEndpoints
{

    public $logger;
    public $config;

    public $token;
    public $client_id;
    public $url;
    public $object_code = 7;

    public $get_courses_endpoint = '/courses/';
    public $get_course_groups_endpoint = '/courses/groups/';
    public $get_courses_of_group_endpoint = '/courses/0/';
    public $get_course_price_endpoint = '/courses/price/';

    public $get_voucher_endpoint = '/voucher';
    public $get_voucher_templates_endpoint = '/voucher/templates';

    public $create_contact_endpoint = '/contact/';
    public $create_sales_header_endpoint = '/sales/order/';
    public $create_sales_line_endpoint = '/sales/line/';
    public $create_sales_invoice_endpoint = '/sales/invoice/';


    public function __construct()
    {

        include(VABS_PLUGIN_WASSERSPORT_ROOTPATH . '/public/config.php');
    

        $this->logger = new Logger('main');
        $this->config = $config;
        $this->token = $config['api_token'];
        $this->client_id = $config['client_id'];
        $this->url = $config['url'];

        add_action('rest_api_init', function () {
            register_rest_route('app/v1', 'config', ['methods' => 'GET', 'callback' => array($this, 'get_config_data')]);
            register_rest_route('app/v1', 'errorhandling', ['methods' => 'POST', 'callback' => array($this, 'send_error_message_to_admin')]);
            
            register_rest_route('app/v1', 'get_courses', ['methods' => 'GET', 'callback' => array($this, 'get_courses')]);
            register_rest_route('app/v1', 'get_courses_of_group', ['methods' => 'GET', 'callback' => array($this, 'get_courses_of_group')]);
            register_rest_route('app/v1', 'get_coursegroups', ['methods' => 'GET', 'callback' => array($this, 'get_coursegroups')]);
            register_rest_route('app/v1', 'get_course_price', ['methods' => 'GET', 'callback' => array($this, 'get_course_price')]);

            register_rest_route('app/v1', 'voucher_list', ['methods' => 'GET', 'callback' => array($this, 'get_voucher_list')]);
            register_rest_route('app/v1', 'voucher_template_list', ['methods' => 'GET', 'callback' => array($this, 'get_voucher_template_list')]);

            register_rest_route('app/v1', 'create_contact_id', ['methods' => 'POST', 'callback' => array($this, 'create_contact_id')]);
            register_rest_route('app/v1', 'create_salesheader_id', [
                'methods' => 'POST',
                'callback' => array($this, 'create_salesheader_id'),
            ]);
            register_rest_route('app/v1', 'create_salesline_id', ['methods' => 'POST', 'callback' => array($this, 'create_salesline_id')]);
            register_rest_route('app/v1', 'create_sales_invoice_id', [
                'methods' => 'GET',
                'callback' => array($this, 'create_sales_invoice_id'),
            ]);


        });
    }

    public function send_error_message_to_admin()
    {
        $request = json_decode(file_get_contents('php://input'));
        $payload = file_get_contents('php://input');

        $this->logger->pushHandler(new StreamHandler(VABS_PLUGIN_WASSERSPORT_ROOTPATH . '/logs/' . date("Y-m-d_h:i:sa") . '.log', Logger::DEBUG));
        $this->logger->info('A warning message', ['request' => $payload]);

        //mail('uwe@vabs.pro', $request->message . ' in ' . $request->type, $payload);
    }

    public function get_config_data()
    {
        return [
            'links' => [
                'agb' => $this->config['agb'],
                'dsgvo' => $this->config['dsgvo']
            ]
        ];
    }

    public function get_courses()
    {
        try {
            $request = $_GET;
            $header = ['Token:' . $this->token];

            $endpoint = $this->get_courses_endpoint;
            if(isset($request['ids'])){
                $endpoint .= $request['ids'];
            }

            $curl = curl_init($this->url . $endpoint);
        
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($curl, CURLOPT_HTTPGET, 1);
            curl_setopt($curl, CURLOPT_HTTPHEADER, $header);
            curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, 0);
        
            $curl_response = curl_exec($curl);
        
            curl_close($curl);

            return json_decode($curl_response);
        } catch (\Throwable $th) {

            $currentDate = date("Y-m-d_h:i:sa");

            $this->logger->pushHandler(new StreamHandler(VABS_PLUGIN_WASSERSPORT_ROOTPATH . '/logs/' . $currentDate . '.log', Logger::DEBUG));
            $this->logger->info('A error message', ['error' => $th]);

            mail('uwe@vabs.pro', $currentDate, $th);

        }
        
    }

    public function get_courses_of_group()
    {
        try {
            $request = $_GET;
            $header = ['Token:' . $this->token];
            $curl = curl_init($this->url . $this->get_courses_of_group_endpoint . $request['id']);
        
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($curl, CURLOPT_HTTPGET, 1);
            curl_setopt($curl, CURLOPT_HTTPHEADER, $header);
            curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, 0);
        
            $curl_response = curl_exec($curl);
        
            curl_close($curl);

            return json_decode($curl_response);
        } catch (\Throwable $th) {

            $currentDate = date("Y-m-d_h:i:sa");

            $this->logger->pushHandler(new StreamHandler(VABS_PLUGIN_WASSERSPORT_ROOTPATH . '/logs/' . $currentDate . '.log', Logger::DEBUG));
            $this->logger->info('A error message', ['error' => $th]);

            mail('uwe@vabs.pro', $currentDate, $th);

        }
        
    }

    public function get_coursegroups()
    {       
        try {
            $header = ['Token:' . $this->token];
            $curl = curl_init($this->url . $this->get_course_groups_endpoint);
        
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($curl, CURLOPT_HTTPGET, 1);
            curl_setopt($curl, CURLOPT_HTTPHEADER, $header);
            curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, 0);
        
            $curl_response = curl_exec($curl);
        
            curl_close($curl);
     
            return json_decode($curl_response);
        } catch (\Throwable $th) {
            $currentDate = date("Y-m-d_h:i:sa");

            $this->logger->pushHandler(new StreamHandler(VABS_PLUGIN_WASSERSPORT_ROOTPATH . '/logs/' . $currentDate . '.log', Logger::DEBUG));
            $this->logger->info('A error message', ['error' => $th]);

            mail('uwe@vabs.pro', $currentDate, $th);;
        }
    }

    public function get_course_price()
    {
        
        try {
            $request = $_GET;
            $header = ['Token:' . $this->token];
            $curl = curl_init($this->url . $this->get_course_price_endpoint . $request['id'] . '/0/' . $request['qty']);
        
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($curl, CURLOPT_HTTPGET, 1);
            curl_setopt($curl, CURLOPT_HTTPHEADER, $header);
            curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, 0);
        
            $curl_response = curl_exec($curl);
        
            curl_close($curl);
     
            return json_decode($curl_response);
        } catch (\Throwable $th) {
            $currentDate = date("Y-m-d_h:i:sa");

            $this->logger->pushHandler(new StreamHandler(VABS_PLUGIN_WASSERSPORT_ROOTPATH . '/logs/' . $currentDate . '.log', Logger::DEBUG));
            $this->logger->info('A error message', ['error' => $th]);

            mail('uwe@vabs.pro', $currentDate, $th);;
        }
    }

    public function create_contact_id()
    {
        try {
            $request = json_decode(file_get_contents('php://input'));
    
            $header = ['Token:' . $this->token];

            $curl = curl_init($this->url . $this->create_contact_endpoint);
            $data = [
                'target_client_hash' => $this->client_id,
                'firstname' => $request->firstName,
                'lastname' => $request->lastName,
                'street' => $request->street,
                'zip_code' => $request->zipCode,
                'city' => $request->city,
                'email' => isset($request->email) && $request->email !== '' ? $request->email : 'xxx@xxx.xx',
                'mobile' => isset($request->mobile) && $request->mobile !== '' ? $request->mobile : '00000000',
                'create_lead' => isset($request->lead) && $request->lead !== '' ? $request->lead : false,
                'shorttext' => isset($request->shorttext) && $request->shorttext !== '' ? $request->shorttext : '',
                'longtext' => isset($request->message) ? $request->message : '',
                'send_email_request' => 'yes',
            ];
            curl_setopt($curl, CURLOPT_POST, true);
            curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($curl, CURLOPT_HTTPHEADER, $header);
            curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, 0);

            $curl_response = curl_exec($curl);

            curl_close($curl);
            return json_decode($curl_response);
        } catch (\Throwable $th) {
            $currentDate = date("Y-m-d_h:i:sa");

            $this->logger->pushHandler(new StreamHandler(VABS_PLUGIN_WASSERSPORT_ROOTPATH . '/logs/' . $currentDate . '.log', Logger::DEBUG));
            $this->logger->info('A error message', ['error' => $th]);

            mail('uwe@vabs.pro', $currentDate, $th);
        }
        
    }

    public function create_salesheader_id()
    {
        try {
            $request = json_decode(file_get_contents('php://input'));
        
            $header = ['Token:' . $this->token];
            $curl = curl_init($this->url . $this->create_sales_header_endpoint);

            curl_setopt($curl, CURLOPT_POST, true);
            $data = [
                'target_client_hash' => $this->client_id,
                'sellto_contact_id' => $request->contact_id,
            ];
            curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($curl, CURLOPT_HTTPHEADER, $header);
            curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, 0);

            $curl_response = curl_exec($curl);

            curl_close($curl);

            return json_decode($curl_response);
        } catch (\Throwable $th) {
            $currentDate = date("Y-m-d_h:i:sa");

            $this->logger->pushHandler(new StreamHandler(VABS_PLUGIN_WASSERSPORT_ROOTPATH . '/logs/' . $currentDate . '.log', Logger::DEBUG));
            $this->logger->info('A error message', ['error' => $th]);

            mail('uwe@vabs.pro', $currentDate, $th);
        }
        
    }

    public function create_salesline_id()
    {
        try {
            $request = json_decode(file_get_contents('php://input'));

            $start = $request->startDate;
            if ($request->startTime) {
                $start .= 'T' . $request->startTime;
            }

            $end = isset($request->endDate) ? $request->endDate : $request->startDate;
            if ($request->endTime) {
                $end .= 'T' . $request->endTime;
            }

            $header = ['Token: ' . $this->token];
            $curl = curl_init($this->url . $this->create_sales_line_endpoint);
            //As this is a POST Request we need to set the data and method
            curl_setopt($curl, CURLOPT_POST, true);
            $data = [
                'target_client_hash' => $this->client_id,
                'sales_header_id' => $request->salesHeaderId,
                'object_id' => $request->id,
                'object_code' => isset($request->object_code) ? $request->object_code : $this->object_code,
                'quantity' => $request->quantity,
                'quantity_to_book' => 1,
                'date_from' => $start,
                'date_to' => $end,
                'discount' => isset($request->discount) ? $request->discount : null,
                'ship_to_contact' => isset($request->ship_to_contact_id) ? $request->ship_to_contact_id : null,
                'voucher_template_id' => isset($request->voucher_template_id) ? $request->voucher_template_id : null
            ];
            curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($curl, CURLOPT_HTTPHEADER, $header);
            curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, 0);

            $curl_response = curl_exec($curl);

            curl_close($curl);

            return json_decode($curl_response);
        } catch (\Throwable $th) {
            $currentDate = date("Y-m-d_h:i:sa");

            $this->logger->pushHandler(new StreamHandler(VABS_PLUGIN_WASSERSPORT_ROOTPATH . '/logs/' . $currentDate . '.log', Logger::DEBUG));
            $this->logger->info('A error message', ['error' => $th]);

            mail('uwe@vabs.pro', $currentDate, $th);
        }
        
    }

    public function create_sales_invoice_id()
    {
        try {
            $sales_header_id = isset($_GET['sales_header_id']) ? $_GET['sales_header_id'] : null;

            if (!$sales_header_id) {
                return [
                    'error' => 'Uppps, something went wrong. sales header id is required',
                ];
            }
            $header = ['Token: ' . $this->token];

            $curl = curl_init($this->url . $this->create_sales_invoice_endpoint);
            curl_setopt($curl, CURLOPT_POST, true);
            $data = [
                'target_client_hash' => $this->client_id,
                'sales_header_id' => $sales_header_id,
                'sendEmail' => 1,
            ];
            curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($curl, CURLOPT_HTTPHEADER, $header);
            curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, 0);

            $curl_response = curl_exec($curl);

            curl_close($curl);

            return json_decode($curl_response);
        } catch (\Throwable $th) {
            $currentDate = date("Y-m-d_h:i:sa");

            $this->logger->pushHandler(new StreamHandler(VABS_PLUGIN_WASSERSPORT_ROOTPATH . '/logs/' . $currentDate . '.log', Logger::DEBUG));
            $this->logger->info('A error message', ['error' => $th]);

            mail('uwe@vabs.pro', $currentDate, $th);
        }
        
    }


    public function get_voucher_list()
    {
        try {
            $header = ['Token: ' . $this->token];
            $curl = curl_init($this->url . $this->get_voucher_endpoint);
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($curl, CURLOPT_HTTPGET, 1);
            curl_setopt($curl, CURLOPT_HTTPHEADER, $header);
            curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, 0);

            $curl_response = curl_exec($curl);

            curl_close($curl);

            return json_decode($curl_response);
        } catch (\Throwable $th) {
            $currentDate = date("Y-m-d_h:i:sa");

            $this->logger->pushHandler(new StreamHandler(VABS_PLUGIN_WASSERSPORT_ROOTPATH . '/logs/' . $currentDate . '.log', Logger::DEBUG));
            $this->logger->info('A error message', ['error' => $th]);

            mail('uwe@vabs.pro', $currentDate, $th);
        }
    }

    public function get_voucher_template_list()
    {
        try {
            $header = ['Token: ' . $this->token];
            $curl = curl_init($this->url . $this->get_voucher_templates_endpoint);
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($curl, CURLOPT_HTTPGET, 1);
            curl_setopt($curl, CURLOPT_HTTPHEADER, $header);
            curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, 0);
        
            $curl_response = curl_exec($curl);

            curl_close($curl);

            return json_decode($curl_response);
        } catch (\Throwable $th) {
            $currentDate = date("Y-m-d_h:i:sa");

            $this->logger->pushHandler(new StreamHandler(VABS_PLUGIN_WASSERSPORT_ROOTPATH . '/logs/' . $currentDate . '.log', Logger::DEBUG));
            $this->logger->info('A error message', ['error' => $th]);

            mail('uwe@vabs.pro', $currentDate, $th);
        }
    }
}
