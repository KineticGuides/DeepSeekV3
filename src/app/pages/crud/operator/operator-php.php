function get_operator_list($data) {

   $output=array();
   $columns=array();

    $columns=$this->addColumn($columns,'phone_id','Phone');
    $columns=$this->addColumn($columns,'user_id','User ID');
    $columns=$this->addColumn($columns,'online','Online (Y/N)');
    $columns=$this->addColumn($columns,'active_sid','Active SID');

   $sql="select * from cmm_operator";
   $r=$this->X->sql($sql);
   $output['list']=$r;
   $output['columns']=$columns;
   $output['crumb1']=$table_name;
   $output['title']=$table_name;
   return $output;
}


function get_operator_form($data) {
   $output=array();
   $colData=array();
   $colData['phone_id']=$this->setColumn('Phone');
   $colData['user_id']=$this->setColumn('User ID');
   $colData['online']=$this->setColumn('Online (Y/N)');
   $colData['active_sid']=$this->setColumn('Active SID');
   $output['colData']=$colData;

   $formData=array();
   $formData['table_name']='cmm_operator';
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



case 'get-operator-list':
     $output=$A->get_operator_list($data);
      break;
case 'get-operator-form':
     $output=$A->get_operator_form($data);
      break;


   { path: 'cmm_operator', component: get_operator_list, resolve: { data: ResolverService} },
