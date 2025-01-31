import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule, RouterLink } from '@angular/router';
import { Subject, from, takeUntil } from 'rxjs';
import { FormsModule,  FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../../data.service'; 
import { CalendarModule } from '../../calendar/calendar.module';
import { ProviderCalendarModule } from '../../provider-calendar/provider-calendar.module';
import { HeySkipperComponent } from '../../widgets/hey-skipper/hey-skipper.component';
import { NgbAlertModule, NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap'
import { JsonPipe } from '@angular/common';


@Component({
  selector: 'app-single-resource-calendar',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, HeySkipperComponent, CalendarModule, ProviderCalendarModule, NgbAlertModule, NgbDatepickerModule],
  templateUrl: './single-resource-calendar.component.html',
  styleUrl: './single-resource-calendar.component.css'
})
export class SingleResourceCalendarComponent  implements OnInit, AfterViewInit {

  data: any;
  message: any;
  displayMonths = 2;
	navigation = 'select';
	showWeekNumbers = false;
	outsideDays = 'visible';
  practice: any = '1';
  model!: NgbDateStruct;

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
      }) 
  }

  postForm(): void {
  
    let formData: any = { "message": this.message }

    this._dataService.postData("hey-skipper", formData).subscribe((data: any)=> { 
      console.log(data.location)
      this._router.navigate([data.location]);
      console.log(this.data)
  }) 

  }

  ngAfterViewInit(): void {
    this._dataService.getData("get-resource-calendar","1","2","3").subscribe((data: any)=> { 
      this.data=data;
      console.log(this.data)
  }) 

  }

}
