import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, AfterViewChecked, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router, RouterModule, RouterLink } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { FormsModule,  FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../../data.service'; 
import { CalendarModule } from '../../calendar/calendar.module';
import { ProviderCalendarModule } from '../../provider-calendar/provider-calendar.module';
import { HeySkipperComponent } from '../../widgets/hey-skipper/hey-skipper.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, HeySkipperComponent],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit, AfterViewChecked {

  @ViewChild('chatContainer') private chatContainer!: ElementRef;
  data: any;
  message: any;
  localSession: any = '';
  currentChat: any = '';

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _dataService: DataService,
    private _router: Router,
    public http: HttpClient  // used by upload
) { }

  ngOnInit(): void {      
      this._activatedRoute.data.subscribe(({ data }) => { 
          this.data=data;
          localStorage.setItem('uid', this.data['user']['id']);
          localStorage.setItem('chat_id', this.data['user']['chat_id']);
          localStorage.setItem('hash', this.data['user']['hash']);
      }); 
  }

  ngAfterViewChecked() {
    console.log("view checked")
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    if (this.chatContainer) {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    }
  }

  postForm(): void {
    let formData: any = { "message": this.message };
    this._dataService.postData("chat", formData).subscribe((data: any) => { 
      this.data = data;
    }); 
  }

  newChat(): void {
    let formData: any = { "message": "" };
    this._dataService.postData("new-chat", formData).subscribe((data: any) => { 
      this.data = data;
      localStorage.setItem('uid', this.data['user']['id']);
      localStorage.setItem('chat_id', this.data['user']['chat_id']);
      localStorage.setItem('hash', this.data['user']['hash']);
    }); 
  }

  switchChat(id: any): void {
    let formData: any = { "id": id };
    this._dataService.postData("switch-chat", formData).subscribe((data: any) => { 
      this.data = data;
      localStorage.setItem('uid', this.data['user']['id']);
      localStorage.setItem('chat_id', this.data['user']['chat_id']);
      localStorage.setItem('hash', this.data['user']['hash']);
    }); 
  }

  clearTextarea() {
    this.message = '';
  }

}
