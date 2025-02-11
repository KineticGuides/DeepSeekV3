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

$msgs=array();
$msg=array();
$msg['role']="user";
$msg['content']="I'm a doctor and I have a 45 year old female patient who is complaining about sudden weight loss and fatigue.";
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
curl_setopt($ch, CURLOPT_WRITEFUNCTION, function ($ch, $data) {
   if (isset($data)) {
      echo "data: " . trim($data) . "\n\n";
      ob_flush();
      flush();
      return strlen($data);
   }
});

curl_exec($ch);
curl_close($ch);
echo "data: [DONE]\n\n";
ob_flush();
flush();

?>