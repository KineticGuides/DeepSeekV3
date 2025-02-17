import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule, RouterLink } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { FormsModule,  FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../../data.service'; 
import { CalendarModule } from '../../calendar/calendar.module';
import { ProviderCalendarModule } from '../../provider-calendar/provider-calendar.module';
import { UploadNoboComponent } from '../../widgets/upload-nobo/upload-nobo.component';
import { UploadTAComponent } from '../../widgets/upload-ta/upload-ta.component';
import { UploadDTCComponent } from '../../widgets/upload-dtc/upload-dtc.component';
import { AddUserFormComponent } from '../../forms/add-user-form/add-user-form.component';
@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, UploadNoboComponent, UploadTAComponent, UploadDTCComponent, AddUserFormComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent  implements OnInit {

  data: any;
  message: any;
  showing: any = 'N';

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

  toggleThoughts() {
    if (this.showing=='N') {
      this.showing='Y'
    } else {
      this.showing='N';
    }

}

  postForm(): void {
  
    let formData: any = { "message": this.message }

    this._dataService.postData("hey-skipper", formData).subscribe((data: any)=> { 
      console.log(data.location)
      this._router.navigate([data.location]);
      console.log(this.data)
  }) 

  }


}
