<?php
set_time_limit(0);
ignore_user_abort(1);
   ini_set('display_errors',1);
   ini_set('display_startup_errors',1);
   header('Access-Control-Allow-Headers: Access-Control-Allow-Origin, Content-Type, Authorization');
   header('Access-Control-Allow-Origin: *');
   header('Access-Control-Allow-Methods: GET,PUT,POST,DELETE,PATCH,OPTIONS');
   header('Content-type: application/json');
   require_once('class.KSDB.php');

   ini_set('max_execution_time', 0); 
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

 //       if ($uid==0) {
 //           $post=array();
 //           $post['action']="insert";
 //           $post['table_name']="ds_user";
 //           $uid=$this->X->post($post);
 //           $post['id']=$uid;
 //           $post['hash']=substr(hash('sha256',"X" . $post['id']),0,20);
 //           $this->X->post($post);
 //       }

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
            $data=array();
            $data['uid']=$uid;
            $post['chat_id']=$this->newChat($data);
            $this->X->post($post);
            $sql="select * from ds_user where id = " . $uid;
            $rs=$this->X->sql($sql);
            return $rs[0];
        }


    }

    function splitThinkTags($input) {
        $pattern = '/<think>(.*?)<\/think>(.*)/s';

        if (preg_match($pattern, $input, $matches)) {
            return [
                'inside' => $matches[1],  // Content inside <think></think>
                'outside' => $matches[2]   // Content outside the tags
            ];
        }

        return [
           'inside' => '',
           'outside' => $input // If no <think> tag is found, return the whole string as outside
        ];
}


    function getChat($chat_id) {
        $sql="select * from ds_chat where chat_id = " . $chat_id . " order by id";
        $rs=$this->X->sql($sql);
        $output=array();
        foreach($rs as $r) {
            $r['content']=$this->convertToHtml($r['content']);
            $r['think']=$this->convertToHtml($r['think']);
            array_push($output,$r);
        }
        return $output;
    }

    function newChat($data) {

        $this->clearChat();

        // Create a new Convo
        $post=array();
        $post['table_name']="ds_convo";
        $post['action']="insert";
        $post['user_id']=$data['uid'];
        $post['title']="New Chat";
        $id=$this->X->post($post);

        // Update the Userx
        $post=array();
        $post['table_name']="ds_user";
        $post['action']="insert";
        $post['id']=$data['uid'];
        $post['chat_id']=$id;
        $this->X->post($post);
        return $id;

    }

     function doNewChat($data) {
         $chat_id=$this->newChat($data);
         $data['chat_id']=$chat_id;
         return $this->getHomePage($data);
     }

     function switchChat($data) {
         $chat_id=$data['formData']['id'];
         $post=array();
         $post['table_name']="ds_user";
         $post['action']="insert";
         $post['id']=$data['uid'];
         $post['chat_id']=$chat_id;
         $data['chat_id']=$chat_id;
         $this->X->post($post);
         return $this->getHomePage($data);
     }

     function convertToHtml($text) {
    $text = htmlspecialchars_decode($text, ENT_QUOTES);
    $text = nl2br($text);

    return $text;
    }

     function clearChat() {
        $data = array();
        $jsonData=json_encode($data);
        $ch = curl_init('http://localhost:8081/api/v1/chats/new');
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, 0);
        curl_setopt($ch, CURLOPT_POST, true);
//        curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonData);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'Content-Type: application/json',
        'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZmNTA2MDI4LWQ2M2QtNGJhMS1iODc0LTI0NDhkNDUxNGEzNSJ9.1V3BpWmP0vfsh6-5vykLjT34IAya0-YycFZOQymS_Mk'
//        ,
//        'Content-Length: ' . strlen($jsonData)
        ));

//        $response = curl_exec($ch);
//        echo $response;

     }

     function doChat($data) {
        $pr=$data['formData']['message'];
        $chat_id=$data['chat_id'];
        $uid=$data['uid'];
        $hash=$data['hash'];

        if ($chat_id==0) {
            $chat_id =$this->newChat($data);
            $this->clearChat();
        }

        $file=array();
        $file['type']="file";
        $file['id']= "4f8507ea-b343-4f30-a6f7-da3c08930ba9";
        $files=array();
//        array_push($files,$file);
        $file=array();
        $file['type']="file";
        $file['id']= "6e29bb1c-44ef-4eec-bd0d-71b296eec1eb";
//        array_push($files,$file);

        $post=array();
        $post['table_name']="ds_chat";
        $post['chat_id']=$chat_id;
        $post['user_id']=$uid;
        $post['role']="user";
        $post['think']="";
        $post['content']=$pr;
        $this->X->post($post);

        $sql="select role, content from ds_chat where chat_id = " . $chat_id . " order by id";
        $prompt=$this->X->sql($sql);
        $msgs=array();
        foreach($prompt as $y) {
            $p=array();
            $p['role']=$y['role'];
            $p['content']=$y['content'];
            array_push($msgs,$p);
        }

        $t=array();
        $t['messages']=$msgs;
//        $t['max_tokens']=5000;
        $t['files']=$files;
        $t['model']="hf.co/kineticseas/DeepSeekMedical-FullFinetune-GGUF:latest";
        $t['model']="hf.co/kineticseas/DeepSeekMedical-FullFinetune-GGUF:latest";
        $data = $prompt;
        $jsonData = json_encode($t);
        $ch = curl_init('http://localhost:8081/api/chat/completions');
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, 0);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonData);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'Content-Type: application/json',
        'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZmNTA2MDI4LWQ2M2QtNGJhMS1iODc0LTI0NDhkNDUxNGEzNSJ9.1V3BpWmP0vfsh6-5vykLjT34IAya0-YycFZOQymS_Mk',
        'Content-Length: ' . strlen($jsonData)
        ));

        $response = curl_exec($ch);
//        echo $response;
        $r=json_decode($response,true);
        $r1=$r['choices'];
//        echo json_encode($r1);
//        echo json_encode($r1[0]);
        $message=$r1[0]['message'];
//        echo json_encode($message);
        $res=$message['content'];
        $tags=$this->splitThinkTags($res);
        $inside=$tags['inside'];
        $outside=$tags['outside'];

        if (curl_errno($ch)) {
           throw new Exception(curl_error($ch));
        }

        curl_close($ch);
        $post=array();
        $post['table_name']="ds_chat";
        $post['chat_id']=$chat_id;
        $post['user_id']=$uid;
        $post['role']="assistant";
        $post['think']=$inside;
        $post['content']=$outside;
        $this->X->post($post);

        $d=array();
        $d['q']="get-home-page";
        $d['hash']=$hash;
        $d['uid']=$uid;
        $d['chat_id']=$chat_id;
        return $this->getHomePage($d);

    }

    function getConversations($uid) {
        //$data['id']=$this->getUser($uid);
        $sql="select * from ds_convo where user_id = " . $uid . " order by id";
        $rs=$this->X->sql($sql);
        return $rs;
    }

    function getHomePage($data) {
        $output=array();
        $uid=$data['uid'];
        $output['user']=$this->getUser($uid);
        $output['convo']=$this->getConversations($uid);
        $output['chat']=$this->getChat($data['chat_id']);
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
           case 'new-chat':
                     $output=$A->doNewChat($data);
                     break;
           case 'switch-chat':
                     $output=$A->switchChat($data);
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
