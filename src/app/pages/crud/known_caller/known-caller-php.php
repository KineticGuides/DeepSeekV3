function get_known_caller_list($data) {

   $output=array();
   $columns=array();
   $table_name=cmm_known_caller;

    $columns=$this->addColumn($columns,'phone_id','Phone');
    $columns=$this->addColumn($columns,'member_id','Member ID');
    $columns=$this->addColumn($columns,'member_name','Member Name');
    $columns=$this->addColumn($columns,'relationship','Relationship');
    $columns=$this->addColumn($columns,'dsc','Description');

   $sql="select * from cmm_known_caller";
   $r=$this->X->sql($sql);
   $output['list']=$r;
   $output['columns']=$columns;
   $output['crumb1']=$table_name;
   $output['title']=$table_name;
   return $output;
}


function get_known_caller_form($data) {
   $output=array();
   $colData=array();
   $colData['phone_id']=$this->setColumn('Phone');
   $colData['member_id']=$this->setColumn('Member ID');
   $colData['member_name']=$this->setColumn('Member Name');
   $colData['relationship']=$this->setColumn('Relationship');
   $colData['dsc']=$this->setColumn('Description');
   $output['colData']=$colData;

   $formData=array();
   $formData['table_name']='cmm_known_caller';
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



case 'get-known-caller-list':
     $output=$A->get_known_caller_list($data);
      break;
case 'get-known-caller-form':
     $output=$A->get_known_caller_form($data);
      break;


   { path: 'cmm_known_caller', component: get_known_caller_list, resolve: { data: ResolverService} },
