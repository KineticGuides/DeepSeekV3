function get_provider_list($data) {

   $output=array();
   $columns=array();
   $table_name=cmm_provider;

    $columns=$this->addColumn($columns,'user_id','User ID');
    $columns=$this->addColumn($columns,'practice_id','Practice ID');
    $columns=$this->addColumn($columns,'full_name','Full Name');
    $columns=$this->addColumn($columns,'provider_type','Type');
    $columns=$this->addColumn($columns,'kinetic_phone','K Phone');
    $columns=$this->addColumn($columns,'office_phone','Office Phone');
    $columns=$this->addColumn($columns,'mobile_phone','Mobile Phone');
    $columns=$this->addColumn($columns,'notes','Notes');

   $sql="select * from cmm_provider";
   $r=$this->X->sql($sql);
   $output['list']=$r;
   $output['columns']=$columns;
   $output['crumb1']=$table_name;
   $output['title']=$table_name;
   return $output;
}


function get_provider_form($data) {
   $output=array();
   $colData=array();
   $colData['user_id']=$this->setColumn('User ID');
   $colData['practice_id']=$this->setColumn('Practice ID');
   $colData['full_name']=$this->setColumn('Full Name');
   $colData['provider_type']=$this->setColumn('Type');
   $colData['kinetic_phone']=$this->setColumn('K Phone');
   $colData['office_phone']=$this->setColumn('Office Phone');
   $colData['mobile_phone']=$this->setColumn('Mobile Phone');
   $colData['notes']=$this->setColumn('Notes');
   $output['colData']=$colData;

   $formData=array();
   $formData['table_name']='cmm_provider';
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



case 'get-provider-list':
     $output=$A->get_provider_list($data);
      break;
case 'get-provider-form':
     $output=$A->get_provider_form($data);
      break;


   { path: 'cmm_provider', component: get_provider_list, resolve: { data: ResolverService} },
