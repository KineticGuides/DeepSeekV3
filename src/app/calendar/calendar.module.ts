import {DataService} from "./data.service";
import {FormsModule} from "@angular/forms";
import {NgModule} from "@angular/core";
import {CalendarComponent} from "./calendar.component";
import {DayPilotModule} from "@daypilot/daypilot-lite-angular";
import {CommonModule} from "@angular/common";
import {provideHttpClient} from "@angular/common/http";

@NgModule({
  imports:      [
    CommonModule,
    FormsModule,
    DayPilotModule
  ],
  declarations: [
    CalendarComponent
  ],
  exports:      [ CalendarComponent ],
  providers:    [
    DataService,
    provideHttpClient()
  ]
})
export class CalendarModule { }
