import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { FormsModule,  FormGroup, FormControl, Validators } from '@angular/forms';
import { SearchFilterPipe } from '../../../../search-filter.pipe'; 
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../../../../data.service';
import { PracticeContactFormComponent } from '../practice-contact-form/practice-contact-form.component';
@Component({
  selector: 'app-practice-contact-list',
  standalone: true,
  imports: [CommonModule, RouterLink, NgxPaginationModule, SearchFilterPipe, FormsModule, PracticeContactFormComponent],
  templateUrl: './practice-contact-list.component.html',
  styleUrl: './practice-contact-list.component.css'
})
export class PracticeContactListComponent implements OnInit {
  path: any = "menu-list";
  data: any;
  id: any = '';
  p: any = 1;
  adding: any = 'N';
  searchText: string = '';
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _dataService: DataService,
    private _router: Router,
    public http: HttpClient
) { }
  ngOnInit(): void
  {      
      this._activatedRoute.data.subscribe(({ 
          data })=> { 
          this.data=data;
          console.log(this.data)
      }) 
  }
  toggleAdd() {
    this.id="";
    if (this.adding=='Y') {
      this.adding = 'N';
    } else {
      this.adding = 'Y';
    }
  }
  editItem(m: any) {
    this.id="";
    if (m.edit!='Y') {
      m.edit='Y'
    } else {
      m.edit='N'
    }
  }
  closeEdit(m: any) {
      m.edit='N'
  }
  reload() {
    this._dataService.getData(this.path, "", "", "").subscribe((data: any)=> { 
      this.data=data;
      console.log(this.data['formData'])
  }) 
}
}
