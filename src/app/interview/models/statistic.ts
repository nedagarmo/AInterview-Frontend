import { Result } from './result';

export class Statistic {
  public model: string = "";
  public score: number = 0;
  public results: Result[] = [];

  constructor(model: string, score: number, results: Result[]) {
    this.model = model;
    this.score = score;
    this.results = results;
  }

  public setIncrement() {
    this.score ++;
  }
}
