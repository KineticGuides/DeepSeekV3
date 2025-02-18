import { Component, AfterViewInit, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { DataService } from '../../../../data.service'
import { CommonModule } from '@angular/common'
import { RouterLink } from '@angular/router'
import { FormsModule } from '@angular/forms'
@Component({
  selector: 'app-incoming-phone-form',
  standalone: true,
   imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './incoming-phone-form.component.html',
  styleUrl: './incoming-phone-form.component.css'
})
 export class IncomingPhoneFormComponent implements OnInit, AfterViewInit { 
  data: any;
  formData: any = {country: "", languages: ""};
  colData: any = {country: "", languages: ""};
  keys: any;
  values: any;

  @Input() path: any = 'get-incoming-phone-form';
  @Input() id: any = '';
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

