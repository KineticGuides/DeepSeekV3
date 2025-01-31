import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
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
import { AppointmentFormComponent } from '../appointment-form/appointment-form.component';
import { StorageService } from '../../localstorage.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-resource-day-calendar',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, HeySkipperComponent, CalendarModule, ProviderCalendarModule, NgbAlertModule, 
    NgbDatepickerModule, AppointmentFormComponent],
  templateUrl: './resource-day-calendar.component.html',
  styleUrl: './resource-day-calendar.component.css'
})
export class ResourceDayCalendarComponent  implements OnInit {

  storageSub!: Subscription;
  id: any;
  data: any;
  booking: any = 'N';
  message: any;
  displayMonths = 2;
	navigation = 'select';
	showWeekNumbers = false;
	outsideDays = 'visible';
  practice: any = '1';
  resource_id: any = '';
  patient_id: any = '';
  practice_id: any = '';
  start_date: any = '';
  start_time: any = '';
  end_time: any = '';
  current_date: any = '';
  current_resource: any = '';
  current_practice: any = '';
  current_patient: any = '';
  day: any = '';
  month: any = '';
  year: any = '';

  model: NgbDateStruct = {year: 2025, day: 1, month: 1};
  currentDate: any = '2025-09-01';
  currentPractice: any = '2';

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _dataService: DataService,
    private _router: Router,
    public http: HttpClient,
    private storageService: StorageService = new StorageService
) { }

  ngOnInit(): void
  {      
      this.current_date = this.storageService.getItem('current_date');
      this.day = this.storageService.getItem('current_day');
      this.month = this.storageService.getItem('current_month');
      this.year = this.storageService.getItem('current_year');
        console.log(this.year)
        console.log(this.month)
        console.log(this.day)

        this.model.day = this.day;
        this.model.year = this.year;
        this.model.month = this.month;
console.log(this.model)
      this.current_resource = this.storageService.getItem('current_resource');
      this.current_practice = this.storageService.getItem('current_practice');
      this.current_patient = this.storageService.getItem('current_patient');
      this.storageSub = this.storageService.watchStorage().subscribe(() => {
          this.current_resource = this.storageService.getItem('current_resource');
          this.current_practice = this.storageService.getItem('current_practice');
          this.current_patient = this.storageService.getItem('current_patient');
          this.day = this.storageService.getItem('current_day');
          this.month = this.storageService.getItem('current_month');
          this.year = this.storageService.getItem('current_year');
  
          this.model.day = this.day;
          this.model.year = this.year;
          this.model.month = this.month;
          this.practice_id = this.current_practice;
          this.currentDate = this.year + '-' + this.month + '-' + this.day
      });
      this.practice_id = this.current_practice;
      this.currentDate = this.year + '-' + this.month + '-' + this.day
      this._activatedRoute.data.subscribe(({ 
          data })=> { 
          this.data=data;
      }) 
  }

 formatDateString(dateString: string): string {
    const [year, month, day] = dateString.split('-');
    const formattedMonth = month.padStart(2, '0');
    const formattedDay = day.padStart(2, '0');
    return `${year}-${formattedMonth}-${formattedDay}`;
}
closeIt() {
  this.booking='N';
}
changeDate() {
    console.log("Hey")
      console.log(this.model)
      this.currentDate=this.formatDateString(this.model['year'] + '-' + this.model['month'] + '-' + this.model['day']);
      localStorage.setItem('current_date', this.currentDate)
  }

  changePractice() {
      localStorage.setItem('current_practice', this.currentPractice)
  }

  scheduleEvent(data: any) {
    this.id=data.id;
    this.resource_id = data.resource;
    this.start_date = data.start.value;
    this.end_time = data.end.value;
    this.booking='Y';
    console.log(data)
  }

postForm(): void {
  
    let formData: any = { "message": this.message }

    this._dataService.postSkipper("hey-skipper", formData).subscribe((data: any)=> { 
      console.log(data.location)
      this._router.navigate([data.location]);
      console.log(this.data)
  }) 

  }


}
