function get_appt_list($data) {

   $output=array();
   $columns=array();
   $table_name=cmm_appt;

    $columns=$this->addColumn($columns,'booked_by_id','Booked By');
    $columns=$this->addColumn($columns,'member_id','Member ID');
    $columns=$this->addColumn($columns,'practice_id','Practice');
    $columns=$this->addColumn($columns,'resource_id','Resource ID');
    $columns=$this->addColumn($columns,'appt_type','Appt Type');
    $columns=$this->addColumn($columns,'start_date','Start Date');
    $columns=$this->addColumn($columns,'start_time','Start Time');
    $columns=$this->addColumn($columns,'start_year_part','Year Part');
    $columns=$this->addColumn($columns,'start_month_part','Month Part');
    $columns=$this->addColumn($columns,'start_day_part','Day Part');
    $columns=$this->addColumn($columns,'start_hour_part','Hour Part');
    $columns=$this->addColumn($columns,'start_min_part','Min Part');
    $columns=$this->addColumn($columns,'duration','Duration');
    $columns=$this->addColumn($columns,'end_date','End Date');
    $columns=$this->addColumn($columns,'patient_name','Patient');
    $columns=$this->addColumn($columns,'patient_dob','DOB');
    $columns=$this->addColumn($columns,'barColor','Bar Color');
    $columns=$this->addColumn($columns,'backColor','Back Color');
    $columns=$this->addColumn($columns,'appt_type','Type');
    $columns=$this->addColumn($columns,'reason','Reason');
    $columns=$this->addColumn($columns,'notes','Notes');
    $columns=$this->addColumn($columns,'end_time','End Time');

   $sql="select * from cmm_appt";
   $r=$this->X->sql($sql);
   $output['list']=$r;
   $output['columns']=$columns;
   $output['crumb1']=$table_name;
   $output['title']=$table_name;
   return $output;
}


function get_appt_form($data) {
   $output=array();
   $colData=array();
   $colData['booked_by_id']=$this->setColumn('Booked By');
   $colData['member_id']=$this->setColumn('Member ID');
   $colData['practice_id']=$this->setColumn('Practice');
   $colData['resource_id']=$this->setColumn('Resource ID');
   $colData['appt_type']=$this->setColumn('Appt Type');
   $colData['start_date']=$this->setColumn('Start Date');
   $colData['start_time']=$this->setColumn('Start Time');
   $colData['start_year_part']=$this->setColumn('Year Part');
   $colData['start_month_part']=$this->setColumn('Month Part');
   $colData['start_day_part']=$this->setColumn('Day Part');
   $colData['start_hour_part']=$this->setColumn('Hour Part');
   $colData['start_min_part']=$this->setColumn('Min Part');
   $colData['duration']=$this->setColumn('Duration');
   $colData['end_date']=$this->setColumn('End Date');
   $colData['patient_name']=$this->setColumn('Patient');
   $colData['patient_dob']=$this->setColumn('DOB');
   $colData['barColor']=$this->setColumn('Bar Color');
   $colData['backColor']=$this->setColumn('Back Color');
   $colData['appt_type']=$this->setColumn('Type');
   $colData['reason']=$this->setColumn('Reason');
   $colData['notes']=$this->setColumn('Notes');
   $colData['end_time']=$this->setColumn('End Time');
   $output['colData']=$colData;

   $formData=array();
   $formData['table_name']='cmm_appt';
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



case 'get-appt-list':
     $output=$A->get_appt_list($data);
      break;
case 'get-appt-form':
     $output=$A->get_appt_form($data);
      break;


   { path: 'cmm_appt', component: get_appt_list, resolve: { data: ResolverService} },
