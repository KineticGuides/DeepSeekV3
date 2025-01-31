<?php 
   ini_set('display_errors',1);
   ini_set('display_startup_errors',1);
   header('Access-Control-Allow-Headers: Access-Control-Allow-Origin, Content-Type, Authorization');
   header('Access-Control-Allow-Origin: *');
   header('Access-Control-Allow-Methods: GET,PUT,POST,DELETE,PATCH,OPTIONS');
   header('Content-type: application/json');
   require_once('class.PSDB.php');
      
   if (isset($_COOKIE['uid'])) { $uid=$_COOKIE['uid']; } else { $uid=55009; }
     
   class KSA {
    public $X;
    public $json;
    public $arr;
    function __construct() {
        $this->X=new PSDB();
    }    
             
    function getUser($uid) {
        $data=array();

        if ($uid==0) {
            $post=array();
            $post['action']="insert";
            $post['table_name']="ds_user";
            $uid=$this->X->post($post);
            $post['id']=$uid;
            $post['hash']=substr(hash('sha256',"X" . $post['id']),0,20);
            $this->X->post($post);
        }

        $sql="select * from ds_user where id = " . $uid;
        $rs=$this->X->sql($sql);
        if (sizeof($rs)>0) {
            return $rs[0];
        } else {
            $post=array();
            $post['action']="insert";
            $post['table_name']="ds_user";
            $uid=$this->X->post($post);
            $post['id']=$uid;
            $post['hash']=substr(hash('sha256',"X" . $post['id']),0,20);
            $this->X->post($post);
            $sql="select * from ds_user where id = " . $uid;
            $rs=$this->X->sql($sql);
            return $rs[0];
        }


    }    

    function getChat($chat_id) {
        $sql="select * from ds_chat where chat_id = " . $chat_id . " order by id";
        $rs=$this->X->sql($sql); 
        return $rs;
    }   

    function newChat($data) {

        // Create a new Convo
        $post=array();
        $post['table_name']="ds_convo";
        $post['action']="insert";
        $post['user_id']=$data['uid'];
        $post['title']="New Chat";
        $id=$this->X->post($post);

        // Update the User
        $post=array();
        $post['table_name']="ds_user";
        $post['action']="insert";
        $post['chat_id']=$data['uid'];
        $this->X->post($post);
        return $id;
    }

     function doChat($data) {
        $chat_id=$data['chat_id'];
        if ($chat_id==0) {
            // If there is no $chat_id we need to create it.
            $chat_id =$this->newChat($data);
        }

        $sql="select role, content from ds_chat where chat_id = " . $chat_id . " order by id";
        $prompt=$this->X->sql($sql);
        $record=array();
        $record['role']="user";
        $record['content']=$data['formData']['message'];
        array_push($prompt,$record);

        $post=array();
        $post['table_name']="ds_chat";
        $post['chat_id']=$chat_id;
        $post['user_id']=$data['uid'];
        $post['role']="user";
        $post['content']=$data['formData']['message'];

        $this->X->post($post);

        $d=array();
        $d['q']="get-home-page";
        $d['hash']=$data['hash'];
        $d['uid']=$data['uid'];
        $d['chat_id']=$chat_id;
        return $this->getHomePage($d);
    }   

    function getConversations($uid) {
        $data['id']=$this->getUser($uid);
        $sql="select * from ds_convo where user_id = " . $uid . " order by id";
        $rs=$this->X->sql($sql); 
        return $rs;
    }   

    function getHomePage($data) {
        $output=array();
        $uid=$data['uid'];
        $output['user']=$this->getUser($uid);
        $output['convo']=$this->getConversations($output['user']['chat_id']);
        $output['chat']=$this->getChat($output['user']['chat_id']);
        return $output;
   }

    }        
             
    $A=new KSA();
    $output=array();
             
    $data = file_get_contents("php://input");
    $data = json_decode($data, TRUE);
    $data['uid']="1";
    $output=array();

    $A=new KSA();

$data = file_get_contents("php://input");
$data = json_decode($data, TRUE);
if (!isset($data['q'])) $data['q']="/";
$aa=explode("/",$data['q']);
if (isset($aa[1])) {
     $data['q']=$aa[1];
     if (isset($aa[2])) $data['id']=$aa[2];
     if (isset($aa[3])) $data['id2']=$aa[3];
         if (isset($aa[4])) $data['id3']=$aa[4];
}

$output=array();
if ($data['q']=='process-ksa-login') {
    $o=$A->getLogin($data);
    die();
   } else {
        $o=array();
        $o['user']=array();
        $o['user']['force_logout']=0;
        $o['user']['force_off']=0;
   }

   switch ($data['q']) {
       case 'chat':
                 $output=$A->doChat($data);
                 break;
       case 'departments':
                 $output=$A->getDepartments($data);
                 break;
        case 'companies':
                $output=$A->getCompanyList($data);
                break;
        case 'participants':
                $output=$A->getCompanyParticipantList($data);
                break;
        case 'shareholders':
                $output=$A->getCompanyShareholderList($data);
                break;
        case 'shareholder-dashboard':
                $output=$A->getShareholderDashboard($data);
                break;
        case 'switch-companies':
                $output=$A->swtichCompanies($data);
                break;
        default:
                 $output=$A->getHomePage($data);
                break;
        }
            
        //$output['header']=$A->getHeader($data);
        //$output['user']=$A->getUser($data);
        //$output['menu']=$A->getMenu($data);
        $o=array();
        $o=str_replace('null','""',json_encode($output, JSON_HEX_TAG |
                    JSON_HEX_APOS |
                    JSON_HEX_QUOT |
                    JSON_HEX_AMP |
                    JSON_UNESCAPED_UNICODE));
            
            echo $o;
            
?>