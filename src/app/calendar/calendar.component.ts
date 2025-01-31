import {Component, ViewChild, AfterViewInit, Input, OnChanges, SimpleChanges, Output, EventEmitter} from "@angular/core";
import {DayPilot, DayPilotCalendarComponent} from "@daypilot/daypilot-lite-angular";
//import {DataService} from "./data.service";
import { DataService } from "../data.service";
import {forkJoin} from "rxjs";

@Component({
  selector: 'calendar-component',
  template: `<daypilot-calendar [config]="config" #calendar></daypilot-calendar>`,
  styles: [``]
})
export class CalendarComponent implements AfterViewInit, OnChanges {

  @Output() schedule: EventEmitter<any> = new EventEmitter<any>();
  sched: any = {}
  @ViewChild("calendar")
  calendar!: DayPilotCalendarComponent;
  @Input() currentDate: any = "2024-08-28"; 
  
  doClick(){
    alert('hello');
  }

  config: DayPilot.CalendarConfig = {
    viewType: "Resources",
    headerHeight: 100,
    startDate: this.currentDate,
    contextMenu: new DayPilot.Menu({
      items: [
        {
          text: "Edit...",
          onClick: async args => {
            const data = args.source.data;
            this.sched = { id: data.id, currentDate: this.currentDate, start: data.start, end: data.end, resource: data.resource }
            this.schedule.emit(this.sched)
            console.log(data);
          }
        },

      ]
    }),
    onTimeRangeSelected: async args => {
        this.sched = { id: "", currentDate: this.currentDate, start: args.start, end: args.end, resource: args.resource }
        this.schedule.emit(this.sched)
    },
    onEventClicked: args => {
        // Event is clicked
        console.log(args)
    },
    onEventMoved: args => {
      // Event is moved
      console.log(args)
    },
    onEventResize: args => {
      // Event is resized
      console.log(args)
    },
    onBeforeHeaderRender: args => {
      const data = args.column.data;
      const header = args.header;
      header.verticalAlignment = "top";
      if (data.tags.image) {
        args.header.areas = [
          {
            left: "calc(50% - 30px)",
            bottom: 10,
            height: 60,
            width: 60,
            image: data.tags.image,
            style: "border-radius: 40px; overflow: hidden; border: 3px solid #fff;"
          }
        ];
      }
    },
    onBeforeEventRender: args => {
      args.data.areas = [
        {
          top: 3,
          right: 3,
          width: 24,
          height: 24,
          action: "ContextMenu",
          padding: 2,
          symbol: "/icons/daypilot.svg#threedots-h",
          cssClass: "event-menu",
          toolTip: "Menu"
        }
      ];
    }
  };

  constructor(private _dataService: DataService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.config.startDate=this.currentDate;
    this.ngAfterViewInit();
  }

  ngAfterViewInit(): void {

    const from = new DayPilot.Date(this.config.startDate);
    const to = from.addDays(1);

    this._dataService.getData("get-resource-calendar","1",this.currentDate,"").subscribe((data: any)=> { 
      const options = {
        columns: data['resources'],
        events: data['events']
      };
      this.calendar.control.update(options);


  }) 

  console.log(from);
  console.log(to);

  }

}

