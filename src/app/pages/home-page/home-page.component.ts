import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, AfterViewChecked, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
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
export class HomePageComponent implements OnInit, AfterViewInit, AfterViewChecked {
  @ViewChild('endofconversation') endofconversation!: ElementRef;
  @ViewChild('chatContainer') private chatContainer!: ElementRef;
  data: any;
  message: string = ''; 
  thinking: any = 'N';
  first_thinking: any = 'N';
  prompt: string = '';
  localSession: any = '';
  currentChat: any = '';
  messageQueue: string[] = [];  
  fullMessage: string = '';
  working: string = 'N';
  title: string = '';


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
      this.scrollToDiv();
      this.scrollToBottom();
    });
  }

  ngAfterViewInit(): void {
    this.scrollToBottom();
    this.scrollToDiv();    
  }
  ngAfterViewChecked() {
 //   console.log("view checked")
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

    this.working='Y';
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

    let url: any = 'http://localhost:8888/chat.php?uid=' + uid + '&chat_id=' + chat_id + '&hash=' + hash + '&prompt=' + encodeURIComponent(this.prompt);

    const eventSource = new EventSource(url);

    eventSource.onmessage = (event) => {
      this.zone.run(() => {
        const trimmed = event.data.trim();

        if (trimmed == '[DONE]') {
           eventSource.close();
           this.clearTextarea();
           location.reload();
        }
        console.log(trimmed);
        if (trimmed.startsWith('data:')) {
          this.thinking = 'N';
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

  }

  postForm(): void {
    let formData: any = { "message": this.message };
    this.clearTextarea(); // Clear message after sending

    this._dataService.postData("chat", formData).subscribe((data: any) => { 
      this.data = data;
      setTimeout(() => this.scrollToDiv(), 500); 
    });
  }

  getPage0(): void {
    let formData: any = { "x": "" };
    this._dataService.postData("get-home-page", formData).subscribe((data: any) => { 
      this.data = data;
      setTimeout(() => this.scrollToDiv(), 500); 
    });
  }

  getPage(): void {
    let formData: any = { "x": "" };
    this._dataService.postData("get-home-page", formData).subscribe((newData: any) => { 
        // Preserve editing state before overwriting data
        const editingMap = new Map(this.data.convo.map((c: any) => [c.id, c.editing]));

        // Assign new data
        this.data = newData;

        // Restore editing states
        this.data.convo.forEach((c: any) => {
            if (editingMap.has(c.id)) {
                c.editing = editingMap.get(c.id);
            }
        });

        setTimeout(() => this.scrollToDiv(), 50);
        setTimeout(() => this.scrollToBottom(), 50);
    });
}


  toggleThoughts(m: any) {
      if (m.showing=='N') {
        m.showing='Y'
      } else {
        m.showing='N';
      }
  
  }

  hasUnclosedThinkTag(text: string): boolean {
    const thinkOpenTagCount = (text.match(/<think>/g) || []).length;
    const thinkCloseTagCount = (text.match(/<\/think>/g) || []).length;
    return thinkOpenTagCount > thinkCloseTagCount;
}

  newChat(): void {
    let formData: any = { "model": "general" };
    this._dataService.postData("new-chat", formData).subscribe((data: any) => { 
      this.data = data;
      localStorage.setItem('uid', this.data['user']['id']);
      localStorage.setItem('chat_id', this.data['user']['chat_id']);
      localStorage.setItem('hash', this.data['user']['hash']);
      setTimeout(() => this.scrollToDiv(), 500);
    });
  }

  switchChat(id: any): void {
    let formData: any = { "id": id };
    this._dataService.postData("switch-chat", formData).subscribe((data: any) => { 
      this.data = data;
      localStorage.setItem('uid', this.data['user']['id']);
      localStorage.setItem('chat_id', this.data['user']['chat_id']);
      localStorage.setItem('hash', this.data['user']['hash']);
      setTimeout(() => this.scrollToDiv(), 500);
    });
  }

  deleteOneChat(m: any): void {
    if (confirm("Are you sure you want to delete this prompt or response?")) {
    let formData: any = { "id": m.id };
    this._dataService.postData("delete-one-chat", formData).subscribe((data: any) => { 
      this.data = data;
      localStorage.setItem('uid', this.data['user']['id']);
      localStorage.setItem('chat_id', this.data['user']['chat_id']);
      localStorage.setItem('hash', this.data['user']['hash']);
    });
  }
  }

  archiveConvo(m: any): void {
    if (confirm("Are you sure you want to archive this conversation?")) {
    let formData: any = { "id": m.id };
    this._dataService.postData("archive-one-convo", formData).subscribe((data: any) => { 
      this.data = data;
      localStorage.setItem('uid', this.data['user']['id']);
      localStorage.setItem('chat_id', this.data['user']['chat_id']);
      localStorage.setItem('hash', this.data['user']['hash']);
    });
  }
  }

  postEditConvo(m: any): void {
    console.log("Saving:", m.title);
    
    // Call API to save the updated title
    let formData = { id: m.id, title: m.title };

    this._dataService.postData("edit-convo", formData).subscribe((data: any) => { 
      m.editing = 'N'; 
      this.data = data;
      setTimeout(() => this.scrollToDiv(), 500); 
    });

}

  editConvo(m: any): void {
    console.log("Before:", m.editing);
    m.editing = m.editing === 'Y' ? 'N' : 'Y'; // Toggle between 'N' and 'Y'
    this.data.convo = [...this.data.convo]; // Ensure Angular detects the change
    console.log("After:", m.editing);
}

  clearTextarea() {
    this.prompt = '';
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
        this.fullMessage += content.charAt(index) === '\n' ? '<br>' : content.charAt(index);
        this.message += content.charAt(index) === '\n' ? '<br>' : content.charAt(index);
        this.scrollToDiv(); 
        index++;
      } else {
        clearInterval(typingInterval); // Stop typing when done
        callback(); // Call the callback to continue with the next message
      }
    }, 2); // You can adjust this value to control the speed of the typing effect
  }
}
