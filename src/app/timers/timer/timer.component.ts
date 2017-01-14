import {Component, OnInit, Input} from '@angular/core';
import {TimerService} from "./timer.service";
import {Observable} from "rxjs";

@Component({
  selector: 'tomatito-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css'],
  providers: [TimerService]
})
export class TimerComponent implements OnInit {
  private _minutesToCount:number;
  private _remaining:string;

  constructor(private _timerService:TimerService) {}

  ngOnInit() {
    this._timerService.startTimer(this._minutesToCount);
    this._timerService.remaining.subscribe(
      newTime => {
        this._remaining = newTime;
      }
    );
    console.log(this._remaining);
  }

  @Input()
  set minutesToCount(minutesToCount:number) {
    this._minutesToCount = minutesToCount;
  }
}
