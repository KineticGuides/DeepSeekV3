function get_user_message_list($data) {

   $output=array();
   $columns=array();
   $table_name=cmm_user_message;

    $columns=$this->addColumn($columns,'from_user_id','From User');
    $columns=$this->addColumn($columns,'from_first_name','From First');
    $columns=$this->addColumn($columns,'to_user_id','To User');
    $columns=$this->addColumn($columns,'to_first_name','To First');
    $columns=$this->addColumn($columns,'message_title','Title');
    $columns=$this->addColumn($columns,'message_dsc','Message');

   $sql="select * from cmm_user_message";
   $r=$this->X->sql($sql);
   $output['list']=$r;
   $output['columns']=$columns;
   $output['crumb1']=$table_name;
   $output['title']=$table_name;
   return $output;
}


function get_user_message_form($data) {
   $output=array();
   $colData=array();
   $colData['from_user_id']=$this->setColumn('From User');
   $colData['from_first_name']=$this->setColumn('From First');
   $colData['to_user_id']=$this->setColumn('To User');
   $colData['to_first_name']=$this->setColumn('To First');
   $colData['message_title']=$this->setColumn('Title');
   $colData['message_dsc']=$this->setColumn('Message');
   $output['colData']=$colData;

   $formData=array();
   $formData['table_name']='cmm_user_message';
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



case 'get-user-message-list':
     $output=$A->get_user_message_list($data);
      break;
case 'get-user-message-form':
     $output=$A->get_user_message_form($data);
      break;


   { path: 'cmm_user_message', component: get_user_message_list, resolve: { data: ResolverService} },
