import { Component, AfterViewInit, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { NgModule } from '@angular/core';
import { DataService } from '../../data.service'; 
import { CommonModule } from '@angular/common'
import { RouterLink } from '@angular/router'
import { FormsModule } from '@angular/forms'
import { NgbModule, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap'; //add this

@Component({
  selector: 'app-appointment-form',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, NgbModule, NgbTypeahead ],
  templateUrl: './appointment-form.component.html',
  styleUrl: './appointment-form.component.css'
})
export class AppointmentFormComponent implements OnInit, AfterViewInit { 
  data: any;
  formData: any = {country: "", languages: ""};
  colData: any = {country: "", languages: ""};
  keys: any;
  values: any;

  @Input() id: any = '';
  @Input() resource_id: any = '';
  @Input() practice_id: any = '';
  @Input() patient_id: any = '';
  @Input() start_date: any = '';
  @Input() start_time: any = '';
  @Input() end_time: any = '';
  @Output() close: EventEmitter<any> = new EventEmitter<any>();

  states: string[] = ['Alabama','Alaska','Arizona','Arkansas','California','Colorado',
  'Connecticut','Delaware','Florida','Georgia','Hawaii','Idaho','Illinois',
  'Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine',
  'Maryland','Massachusetts','Michigan','Minnesota','Mississippi',
  'Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey',
  'New Mexico','New York','North Dakota','North Carolina','Ohio',
  'Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina',
  'South Dakota','Tennessee','Texas','Utah','Vermont',
  'Virginia','Washington','West Virginia','Wisconsin','Wyoming'];

  constructor(private _dataService: DataService) {

  }

  closeIt() {
   this.close.emit('N');
  }

  ngOnInit(): void {

    let formData: any = { id: this.id, resource_id: this.resource_id, practice_id: this.practice_id, patient_id: this.patient_id, start_date: this.start_date, start_time: this.start_time, end_time: this.end_time }

    this._dataService.postData("get-appointment-form", formData).subscribe((data: any)=> {
      this.data=data;
      this.formData=data['formData'];
      this.colData=data['colData'];
      this.keys = Object.keys(this.formData);
      this.values = Object.entries(this.formData);
      console.log(this.data['formData'])
  })

  }

  ngAfterViewInit(): void {

  }

  toggleOpen(m:any) {
    console.log(m)
     if (m.open=='Y') {
      m.open = 'N'
     } else {
      m.open = 'Y'
     }
  }

  postForm(): void {
    this._dataService.postData("post-appointment", this.formData).subscribe((data: any)=> {
      location.reload();
      console.log(this.data)
  })
 }

  deleteForm(): void {
  if (confirm('Are you sure you want to Delete this record?')) {
    this._dataService.postData("delete-template-form", this.formData).subscribe((data: any)=> {
      this.closeIt();
      console.log(this.data)
  })
  }
  }
  }

