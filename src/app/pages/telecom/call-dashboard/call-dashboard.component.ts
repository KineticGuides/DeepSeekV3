import { Component, AfterViewInit, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { DataService } from '../../../data.service';
import { CommonModule } from '@angular/common'
import { RouterLink } from '@angular/router'
import { FormsModule } from '@angular/forms'
import { ProviderCalendarComponent } from '../../../provider-calendar/provider-calendar.component';
import { ProviderCalendarModule } from '../../../provider-calendar/provider-calendar.module';
import { SingleResourceCalendarComponent } from '../../single-resource-calendar/single-resource-calendar.component';
import { ResourceDayCalendarComponent } from "../../resource-day-calendar/resource-day-calendar.component";

@Component({
  selector: 'app-call-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, ProviderCalendarModule, SingleResourceCalendarComponent],
  templateUrl: './call-dashboard.component.html',
  styleUrl: './call-dashboard.component.css'
})
export class CallDashboardComponent  implements OnInit, AfterViewInit { 
  data: any;
  contacts: any;
  forward_phone: any = '';
  formData: any = {country: "", languages: ""};
  colData: any = {country: "", languages: ""};
  keys: any;
  values: any;

  @Input() path: any = 'get-contact-form';
  @Input() id: any = '';
  @Input() ParentSid: any = '';
  @Input() id2: any = '';
  @Input() id3: any = '';
  @Output() close: EventEmitter<any> = new EventEmitter<any>();

  constructor(private _dataService: DataService) {

  }

  closeIt() {
   this.close.emit('N');
  }

  ngOnInit(): void {

    this._dataService.getData(this.path, this.id, this.id2, this.id3).subscribe((data: any)=> {
      this.data=data;
      if (this.data['contacts']!==undefined) this.contacts = this.data.contacts;
      //this.formData=data['formData'];
      //this.colData=data['colData'];
      //this.keys = Object.keys(this.formData);
      //this.values = Object.entries(this.formData);
      //console.log(this.data['formData'])
  })

  }

  forwardCall() {
    let formData={ phone: this.forward_phone, sid: this.ParentSid }
    this._dataService.postData("forward-call", formData).subscribe((data: any)=> { 
      this.data=data;
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
    this._dataService.postData("post-template-form", this.formData).subscribe((data: any)=> {
      this.closeIt();
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

