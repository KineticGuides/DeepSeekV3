function get_user_activity_list($data) {

   $output=array();
   $columns=array();
   $table_name=cmm_user_activity;

    $columns=$this->addColumn($columns,'user_id','User ID');
    $columns=$this->addColumn($columns,'activity_date_time','Date/Time');
    $columns=$this->addColumn($columns,'activity_title','Title');
    $columns=$this->addColumn($columns,'activity_dsc','Description');

   $sql="select * from cmm_user_activity";
   $r=$this->X->sql($sql);
   $output['list']=$r;
   $output['columns']=$columns;
   $output['crumb1']=$table_name;
   $output['title']=$table_name;
   return $output;
}


function get_user_activity_form($data) {
   $output=array();
   $colData=array();
   $colData['user_id']=$this->setColumn('User ID');
   $colData['activity_date_time']=$this->setColumn('Date/Time');
   $colData['activity_title']=$this->setColumn('Title');
   $colData['activity_dsc']=$this->setColumn('Description');
   $output['colData']=$colData;

   $formData=array();
   $formData['table_name']='cmm_user_activity';
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



case 'get-user-activity-list':
     $output=$A->get_user_activity_list($data);
      break;
case 'get-user-activity-form':
     $output=$A->get_user_activity_form($data);
      break;


   { path: 'cmm_user_activity', component: get_user_activity_list, resolve: { data: ResolverService} },
