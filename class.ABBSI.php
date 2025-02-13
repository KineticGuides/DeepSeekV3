<?php 
   require_once('class.KSDB.php');

   class ABBSI {
    public $X;
    public $json;
    public $arr;
    function __construct() {
        $this->X=new PSDB();
    }    

    function getUser($uid) {
        $data=array();
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
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'Content-Type: application/json',
        'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZmNTA2MDI4LWQ2M2QtNGJhMS1iODc0LTI0NDhkNDUxNGEzNSJ9.1V3BpWmP0vfsh6-5vykLjT34IAya0-YycFZOQymS_Mk'
        ));
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
     }

}