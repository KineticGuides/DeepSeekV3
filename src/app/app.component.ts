import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarMenuComponent } from './layout/sidebar-menu/sidebar-menu.component';
import { PageHeaderComponent } from './layout/page-header/page-header.component';
import { PageFooterComponent } from './layout/page-footer/page-footer.component';
import { TemplateHomeComponent } from './pages/template-home/template-home.component';
import { RouterLink } from '@angular/router';
import { DataService } from './data.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarMenuComponent, PageHeaderComponent, PageFooterComponent, TemplateHomeComponent, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'BaseTemplate';

  logout() {

  }

  clearTextarea() {

  }

}
