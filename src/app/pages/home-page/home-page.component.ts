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
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, HeySkipperComponent],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit, AfterViewChecked {
  @ViewChild('endofconversation') endofconversation!: ElementRef;
  @ViewChild('chatContainer') private chatContainer!: ElementRef;
  data: any;
  message: string = ''; // Initialize message as empty string
  localSession: any = '';
  currentChat: any = '';
  messageQueue: string[] = [];  // Queue to store incoming text chunks

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _dataService: DataService,
    private _router: Router,
    public http: HttpClient,
    private zone: NgZone
  ) { }

  ngOnInit(): void {
    this._activatedRoute.data.subscribe(({ data }) => { 
      this.data = data;
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

  scrollToDiv() {
    document.getElementById("endofconversation")!.scrollIntoView({ behavior: "smooth" });
  }

  postChat(): void {
    let formData: any = { "message": this.message };
    let uid: any = "0";
    let chat_id: any = "0";
    let hash: any = '';

    if (localStorage.getItem('uid')===null) {
      uid="0";
    } else {
      uid=localStorage.getItem('uid')
    }
    if (localStorage.getItem('chat_id')===null) {
      chat_id="0";
    } else {
      chat_id=localStorage.getItem('chat_id')
    }
    if (localStorage.getItem('hash')===null) {
      hash="";
    } else {
      hash=localStorage.getItem('hash')
    }

    let url: any = 'http://localhost:8888/chat.php?uid=' + uid + '&chat_id=' + chat_id + '&hash=' + hash;

    const eventSource = new EventSource(url);

    eventSource.onmessage = (event) => {
      this.zone.run(() => {
        const trimmed = event.data.trim();

        if (trimmed == '[DONE]') {
           eventSource.close();
           this.clearTextarea();
        }

        if (trimmed.startsWith('data:')) {
          const jsonPart = trimmed.substring('data:'.length).trim();
          try {
            const parsed = JSON.parse(jsonPart);
            const content = parsed.choices[0].delta.content;
            if (content !== undefined) {
              this.enqueueMessage(content);  // Enqueue content for sequential typing
            }
          } catch (err) {

          }
        }
      });
    };

    eventSource.onerror = (error) => {
      console.error('EventSource failed:', error);
    };

    this._dataService.postData("chat", formData).subscribe((data: any) => { 
      this.data = data;
      setTimeout(() => this.scrollToDiv(), 500); 
    });

  }

  postForm(): void {
    let formData: any = { "message": this.message };
    this.clearTextarea(); // Clear message after sending

    this._dataService.postData("chat", formData).subscribe((data: any) => { 
      this.data = data;
      setTimeout(() => this.scrollToDiv(), 500); 
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

  // Function to enqueue new message chunks
  enqueueMessage(content: string): void {
    this.messageQueue.push(content);
    if (this.messageQueue.length === 1) {
      this.typeNextMessage(); // Start typing the first message if it's the first one
    }
  }

  // Function to process and animate text one chunk at a time
  typeNextMessage(): void {
    if (this.messageQueue.length > 0) {
      const nextMessage = this.messageQueue[0]; // Get the first chunk
      this.typeText(nextMessage, () => {
        // After finishing typing one chunk, remove it from the queue
        this.messageQueue.shift();
        this.typeNextMessage(); // Process the next chunk if available
      });
    }
  }

  // Improved typing effect function
  typeText(content: string, callback: () => void): void {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < content.length) {
        this.message += content.charAt(index); // Append one character at a time
        index++;
      } else {
        clearInterval(typingInterval); // Stop typing when done
        callback(); // Call the callback to continue with the next message
      }
    }, 25); // You can adjust this value to control the speed of the typing effect
  }
}
