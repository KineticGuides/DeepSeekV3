import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule, RouterLink } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { FormsModule,  FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../../data.service'; 
import { CalendarModule } from '../../calendar/calendar.module';
import { ProviderCalendarModule } from '../../provider-calendar/provider-calendar.module';

@Component({
  selector: 'app-shareholder-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './shareholder-dashboard.component.html',
  styleUrl: './shareholder-dashboard.component.css'
})
export class ShareholderDashboardComponent implements OnInit {

  data: any;
  message: any;
  searchText: string = '';

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _dataService: DataService,
    private _router: Router,
    public http: HttpClient  // used by upload
) { }

  ngOnInit(): void
  {      
      this._activatedRoute.data.subscribe(({ 
          data })=> { 
          this.data=data;
          console.log(this.data);
      }) 
  }

  postForm(id: any): void {
  
    let formData: any = { "id": id }
    this._dataService.postData("switch-companies", formData).subscribe((data: any)=> { 
      location.reload();
  }) 

  }

  postContact() {

  }

}