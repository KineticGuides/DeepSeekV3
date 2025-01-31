function get_resource_list($data) {

   $output=array();
   $columns=array();
   $table_name=cmm_resource;

    $columns=$this->addColumn($columns,'practice_id','Practice ID');
    $columns=$this->addColumn($columns,'provider_id','Provider ID');
    $columns=$this->addColumn($columns,'resource_name','Name');
    $columns=$this->addColumn($columns,'resource_type','Type');

   $sql="select * from cmm_resource";
   $r=$this->X->sql($sql);
   $output['list']=$r;
   $output['columns']=$columns;
   $output['crumb1']=$table_name;
   $output['title']=$table_name;
   return $output;
}


function get_resource_form($data) {
   $output=array();
   $colData=array();
   $colData['practice_id']=$this->setColumn('Practice ID');
   $colData['provider_id']=$this->setColumn('Provider ID');
   $colData['resource_name']=$this->setColumn('Name');
   $colData['resource_type']=$this->setColumn('Type');
   $output['colData']=$colData;

   $formData=array();
   $formData['table_name']='cmm_resource';
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



case 'get-resource-list':
     $output=$A->get_resource_list($data);
      break;
case 'get-resource-form':
     $output=$A->get_resource_form($data);
      break;


   { path: 'cmm_resource', component: get_resource_list, resolve: { data: ResolverService} },
