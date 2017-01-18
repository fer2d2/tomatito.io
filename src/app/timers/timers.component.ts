import {Component, OnInit} from "@angular/core";
import {CLOCK_TYPES} from "../shared/entities/clock-types";


@Component({
  selector: 'app-timers',
  templateUrl: './timers.component.html',
  styleUrls: ['./timers.component.css'],
})
export class TimersComponent implements OnInit {
  private _clockTypes;

  constructor() {
    this._clockTypes = CLOCK_TYPES;
  }

  ngOnInit() {
  }

}
