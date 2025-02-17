import { Component, AfterViewInit, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { DataService } from '../../data.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchFilterPipe } from '../../search-filter.pipe';

@Component({
  selector: 'app-member-test-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, SearchFilterPipe, NgxPaginationModule],
  templateUrl: './member-test-list.component.html',
  styleUrl: './member-test-list.component.css'
})
export class MemberTestListComponent   implements OnInit, AfterViewInit {
  
  data: any;
  formData: any = {country: "", languages: ""};
  colData: any = {country: "", languages: ""};
  keys: any;
  values: any;
  showing: any = 'N';

  message: any;
  searchText: string = '';
  p: any = 1;

  @Input() path: any = 'member-test-list';
  @Input() id: any = '';
  @Input() id2: any = '';
  @Input() id3: any = '';
  @Output() close: EventEmitter<any> = new EventEmitter<any>();

  constructor(private _dataService: DataService) {

  }

  toggleThoughts() {
    if (this.showing=='N') {
      this.showing='Y'
    } else {
      this.showing='N';
    }

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

  deleteForm() {
    if (confirm('Are you sure you want to Delete this record?')) {
      this._dataService.postData("post-contact-delete", this.formData).subscribe((data: any)=> { 
        //this.data=data;
        //this.formData=data['formData'];
        this.closeIt();
        console.log(this.data)
      }) 
    }
  }
  
  postForm(): void {
    this._dataService.postData("post-add-member", this.formData).subscribe((data: any)=> { 
      //this.data=data;
      //this.formData=data['formData'];
      this.closeIt();
      console.log(this.data)
      location.reload();
  }) 

  }

}
