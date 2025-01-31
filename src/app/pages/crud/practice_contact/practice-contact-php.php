function get_practice_contact_list($data) {

   $output=array();
   $columns=array();
   $table_name="cmm_practice_contact";

    $columns=$this->addColumn($columns,'phone_id','Phone');
    $columns=$this->addColumn($columns,'contact_name','Name');
    $columns=$this->addColumn($columns,'contact_title','Title');
    $columns=$this->addColumn($columns,'practice_id','Practice ID');

   $sql="select * from cmm_practice_contact";
   $r=$this->X->sql($sql);
   $output['list']=$r;
   $output['columns']=$columns;
   $output['crumb1']=$table_name;
   $output['title']=$table_name;
   return $output;
}


function get_practice_contact_form($data) {
   $output=array();
   $colData=array();
   $colData['phone_id']=$this->setColumn('Phone');
   $colData['contact_name']=$this->setColumn('Name');
   $colData['contact_title']=$this->setColumn('Title');
   $colData['practice_id']=$this->setColumn('Practice ID');
   $output['colData']=$colData;

   $formData=array();
   $formData['table_name']='cmm_practice_contact';
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



case 'get-practice-contact-list':
     $output=$A->get_practice_contact_list($data);
      break;
case 'get-practice-contact-form':
     $output=$A->get_practice_contact_form($data);
      break;


   { path: 'cmm_practice_contact', component: get_practice_contact_list, resolve: { data: ResolverService} },
