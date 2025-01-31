import { Component, AfterViewInit } from '@angular/core';
import { DataService } from '../../data.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { StorageService } from '../../localstorage.service';

@Component({
  selector: 'app-sidebar-menu',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './sidebar-menu.component.html',
  styleUrl: './sidebar-menu.component.css'
})
export class SidebarMenuComponent implements AfterViewInit {
  data: any;
  constructor(private _dataService: DataService, private storageService: StorageService = new StorageService) {

  }

  ngAfterViewInit(): void {
    
    this._dataService.getMenu().subscribe((data: any)=> { 
      this.data=data;
      console.log(this.data)
  }) 

  }

  toggleOpen(m:any) {
    console.log(m)
     if (m.open=='Y') {
      m.open = 'N'
     } else {
      m.open = 'Y'
     }
  }
}
