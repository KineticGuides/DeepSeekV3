function get_member_list($data) {

   $output=array();
   $columns=array();
   $table_name=cmm_member;

    $columns=$this->addColumn($columns,'practice_id','Practice ID');
    $columns=$this->addColumn($columns,'first_name','First Name');
    $columns=$this->addColumn($columns,'last_name','Last Name');
    $columns=$this->addColumn($columns,'middle_initial','Middle Initial');
    $columns=$this->addColumn($columns,'date_of_birth','DOB');
    $columns=$this->addColumn($columns,'gender','Gender');
    $columns=$this->addColumn($columns,'email','Email');
    $columns=$this->addColumn($columns,'home_phone_number','Home Phone');
    $columns=$this->addColumn($columns,'mobile_phone_number','Mobile Phone');
    $columns=$this->addColumn($columns,'address_line_1','Address 1');
    $columns=$this->addColumn($columns,'address_line_2','Address 2');
    $columns=$this->addColumn($columns,'city','City');
    $columns=$this->addColumn($columns,'state','State');
    $columns=$this->addColumn($columns,'zip','Zip');
    $columns=$this->addColumn($columns,'membership_start_date','Start Date');
    $columns=$this->addColumn($columns,'membership_end_date','End Date');
    $columns=$this->addColumn($columns,'membership_type','Membership Type');
    $columns=$this->addColumn($columns,'status','Status');
    $columns=$this->addColumn($columns,'emergency_contact_name','Emergency Contact Name');
    $columns=$this->addColumn($columns,'emergency_contact_phone','Emergency Phone');
    $columns=$this->addColumn($columns,'primary_physician','Primary Physician');
    $columns=$this->addColumn($columns,'payment_status','Payment Status');
    $columns=$this->addColumn($columns,'notes','Notes');

   $sql="select * from cmm_member";
   $r=$this->X->sql($sql);
   $output['list']=$r;
   $output['columns']=$columns;
   $output['crumb1']=$table_name;
   $output['title']=$table_name;
   return $output;
}


function get_member_form($data) {
   $output=array();
   $colData=array();
   $colData['practice_id']=$this->setColumn('Practice ID');
   $colData['first_name']=$this->setColumn('First Name');
   $colData['last_name']=$this->setColumn('Last Name');
   $colData['middle_initial']=$this->setColumn('Middle Initial');
   $colData['date_of_birth']=$this->setColumn('DOB');
   $colData['gender']=$this->setColumn('Gender');
   $colData['email']=$this->setColumn('Email');
   $colData['home_phone_number']=$this->setColumn('Home Phone');
   $colData['mobile_phone_number']=$this->setColumn('Mobile Phone');
   $colData['address_line_1']=$this->setColumn('Address 1');
   $colData['address_line_2']=$this->setColumn('Address 2');
   $colData['city']=$this->setColumn('City');
   $colData['state']=$this->setColumn('State');
   $colData['zip']=$this->setColumn('Zip');
   $colData['membership_start_date']=$this->setColumn('Start Date');
   $colData['membership_end_date']=$this->setColumn('End Date');
   $colData['membership_type']=$this->setColumn('Membership Type');
   $colData['status']=$this->setColumn('Status');
   $colData['emergency_contact_name']=$this->setColumn('Emergency Contact Name');
   $colData['emergency_contact_phone']=$this->setColumn('Emergency Phone');
   $colData['primary_physician']=$this->setColumn('Primary Physician');
   $colData['payment_status']=$this->setColumn('Payment Status');
   $colData['notes']=$this->setColumn('Notes');
   $output['colData']=$colData;

   $formData=array();
   $formData['table_name']='cmm_member';
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



case 'get-member-list':
     $output=$A->get_member_list($data);
      break;
case 'get-member-form':
     $output=$A->get_member_form($data);
      break;


   { path: 'cmm_member', component: get_member_list, resolve: { data: ResolverService} },
