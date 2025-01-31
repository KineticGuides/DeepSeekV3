function get_incoming_phone_list($data) {

   $output=array();
   $columns=array();

    $columns=$this->addColumn($columns,'phone','Phone Number');
    $columns=$this->addColumn($columns,'friendly_name','Name');
    $columns=$this->addColumn($columns,'practice_name','Practice');
    $columns=$this->addColumn($columns,'voice_hook','Voice Hook');
    $columns=$this->addColumn($columns,'sms_hook','SMS Hook');
    $columns=$this->addColumn($columns,'description','Description');

   $sql="select * from cmm_incoming_phone";
   $r=$this->X->sql($sql);
   $output['list']=$r;
   $output['columns']=$columns;
   $output['crumb1']=$table_name;
   $output['title']=$table_name;
   return $output;
}


function get_incoming_phone_form($data) {
   $output=array();
   $colData=array();
   $colData['phone']=$this->setColumn('Phone Number');
   $colData['friendly_name']=$this->setColumn('Name');
   $colData['practice_name']=$this->setColumn('Practice');
   $colData['voice_hook']=$this->setColumn('Voice Hook');
   $colData['sms_hook']=$this->setColumn('SMS Hook');
   $colData['description']=$this->setColumn('Description');
   $output['colData']=$colData;

   $formData=array();
   $formData['table_name']='cmm_incoming_phone';
   $formData['id']='';

   foreach ($colData as $key => $value) $formData[$key]='';
   if ($data['id']!="") {
       $sql="select * from " . $formData['table_name'] . " where id = " . $data['id'];
       $t=$this->X->sql($sql);
       if (sizeof($t)!=0) {
               foreach($formData as $key => $value)
                if (isset($t[0][$key])) $formData[$key]=$t[0][$key];
       }
   }
   $output['formData']=$formData;

   if ($formData['id']=="") $output['title']='Add '; else $output['title']='Edit ';
   return $output;
}



case 'get-incoming-phone-list':
     $output=$A->get_incoming_phone_list($data)
      break;
case 'get-incoming-phone-form':
     $output=$A->get_incoming_phone_form($data)
      break;


   { path: 'cmm_incoming_phone', component: get_incoming_phone_list, resolve: { data: ResolverService} },
