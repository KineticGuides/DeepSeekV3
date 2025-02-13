<?php
   ini_set('display_errors',1);
   ini_set('display_startup_errors',1);
   header('Access-Control-Allow-Headers: Access-Control-Allow-Origin, Content-Type, Authorization');
   header('Access-Control-Allow-Origin: *');
   header('Access-Control-Allow-Methods: GET,PUT,POST,DELETE,PATCH,OPTIONS');
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');
header('Connection: keep-alive');
ignore_user_abort(true);
require_once('class.KSDB.php');
require_once('class.ABBSI.php');
ini_set('max_execution_time', 600); 

$uid=$_GET['uid'];
$chat_id=$_GET['chat_id'];
$hash=$_GET['hash'];
$pr=$_GET['prompt'];

$X=new PSDB();
$A=new ABBSI();

//1: Create a new conversation if necessary.
$data=array();
$data['uid']=$uid;
$data['chat_id']=$chat_id;

if ($chat_id==0) {
   //-- Get new Chat ID
   $chat_id =$A->newChat($data);
   //-- Clear LLM
   $A->clearChat();
}

//2: Post the Prompt to the Database.
$post=array();
$post['table_name']="ds_chat";
$post['chat_id']=$chat_id;
$post['user_id']=$uid;
$post['role']="user";
$post['think']="";
$post['content']=$pr;
$X->post($post);

$sql="select role, content from ds_chat where chat_id = " . $chat_id . " order by id";
$prompt=$X->sql($sql);
$msgs=array();
foreach($prompt as $y) {
    $p=array();
    $p['role']=$y['role'];
    $p['content']=$y['content'];
    array_push($msgs,$p);
}

$msg=array();
$msg['role']="user";
$msg['content']=$pr;
array_push($msgs, $msg);

$t=array();
$t['messages']=$msgs;
$t['model']="hf.co/kineticseas/DeepSeekMedical-FullFinetune-GGUF:latest";
$t['stream']=true;
$data = $t;
$jsonData=json_encode($t);

$ch = curl_init('http://localhost:8081/api/chat/completions');
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonData);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZmNTA2MDI4LWQ2M2QtNGJhMS1iODc0LTI0NDhkNDUxNGEzNSJ9.1V3BpWmP0vfsh6-5vykLjT34IAya0-YycFZOQymS_Mk',
]);
$full_response="";
$logFile = __DIR__ . '/debug.log'; 
$full_response = "";
$thinking=0;
curl_setopt($ch, CURLOPT_WRITEFUNCTION, function ($ch, $data) use (&$full_response, &$logFile, &$thinking) {
    if (isset($data)) {

        // Try decoding JSON safely (handling possible malformed/incomplete chunks)

        $jsonData = trim(preg_replace('/^data:\s*/', '', $data));
        $jsonChunk = json_decode($jsonData, true);
    
        if (isset($jsonChunk['choices'][0]['delta']['content'])) {
            $full_response .= $jsonChunk['choices'][0]['delta']['content']; // Append new content
        }

        if (strpos($full_response, '<think>') !== false) {
           if (strpos($full_response, '</think>') === false) {
              echo "data: " . trim($data) . "\n\n";
              file_put_contents($logFile, "data: " . trim($data) . "\n", FILE_APPEND);
           } else {
            echo "data: " . trim($data) . "\n\n"; 
            file_put_contents($logFile, "data: " . trim($data) . "\n", FILE_APPEND);
           }          
        } else {
         file_put_contents($logFile, "data0: " . trim($data) . "\n", FILE_APPEND);
         echo "data: " . trim($data) . "\n\n"; 
        }

        ob_flush();
        flush();
        return strlen($data);
    }
});

curl_exec($ch);
curl_close($ch);

$tags=$A->splitThinkTags($full_response);
$inside=$tags['inside'];
$outside=$tags['outside'];

$post=array();
$post['table_name']="ds_chat";
$post['chat_id']=$chat_id;
$post['user_id']=$uid;
$post['role']="assistant";
$post['think']=$inside;
$post['content']=$outside;
$X->post($post);

echo "data: [DONE]\n\n";
ob_flush();
flush();

?>