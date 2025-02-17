import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule, RouterLink } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { FormsModule,  FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../../data.service'; 
import { CalendarModule } from '../../calendar/calendar.module';
import { ProviderCalendarModule } from '../../provider-calendar/provider-calendar.module';
import { MemberEncounterListComponent } from '../../member-sections/member-encounter-list/member-encounter-list.component';
import { MemberNoteListComponent } from '../../member-sections/member-note-list/member-note-list.component';
import { MemberOrderListComponent } from '../../member-sections/member-order-list/member-order-list.component';
import { MemberTestListComponent } from '../../member-sections/member-test-list/member-test-list.component';
import { MemberProgramsListComponent } from '../../member-sections/member-programs-list/member-programs-list.component';
import { MemberMedsListComponent } from '../../member-sections/member-meds-list/member-meds-list.component';
@Component({
  selector: 'app-member-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, MemberEncounterListComponent, MemberNoteListComponent, MemberOrderListComponent, MemberTestListComponent, MemberProgramsListComponent, MemberMedsListComponent],

  templateUrl: './member-dashboard.component.html',
  styleUrl: './member-dashboard.component.css'
})
export class MemberDashboardComponent implements OnInit {

  data: any;
  message: any;
  searchText: string = 'N';
  encounters: string = 'N';
  notes: string = 'N';
  meds: string = 'N';
  programs: string = 'N';
  orders: string = 'N';
  tests: string = 'N';
  formData: any;


  toggleNotes() {
     if (this.notes=='Y') this.notes='N'; else this.notes='Y';
  }

  toggleEncounters() {
    if (this.encounters=='Y') this.encounters='N'; else this.encounters='Y';
  }

  togglePrograms() {
    if (this.programs=='Y') this.programs='N'; else this.programs='Y';
  }

  toggleMeds() {
    if (this.meds=='Y') this.meds='N'; else this.meds='Y';
  }

  toggleOrders() {
    if (this.orders=='Y') this.orders='N'; else this.orders='Y';
  }

  toggleTests() {
    if (this.tests=='Y') this.tests='N'; else this.tests='Y';
  }

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
          this.formData=data.formData;
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