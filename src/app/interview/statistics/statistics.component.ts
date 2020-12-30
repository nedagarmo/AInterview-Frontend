import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { Result } from '../models/result';
import { Statistic } from '../models/statistic';

@Component({
  selector: 'app-interview-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  @Input()
  public resultList: Array<Statistic>;
  @Input()
  public reDraw: Boolean;
  public toggleWindow: boolean;

  constructor() {
    this.resultList = Array<Statistic>();
    this.toggleWindow = false;
    this.reDraw = true;
  }

  ngOnInit(): void {

  }

  onToggleWindow() {
    this.toggleWindow = !this.toggleWindow;
  }

}
