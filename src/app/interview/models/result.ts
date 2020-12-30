export class Result {
  private label: string;
  private score: number;

  constructor(label: string, score: number) {
    this.label = label;
    this.score = score;
  }

  public getLabel() {
    return this.label;
  }

  public getScore() {
    return this.score;
  }

  public setIncrement() {
    this.score ++;
  }
}
