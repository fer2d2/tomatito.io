export class Pomodoro {
  public startDate:number;
  public endDate:number;
  public type:string;

  constructor(type: string) {
    this.type = type;
  }

  public addStartDateForNow():void {
    this.startDate = this.getDateNowStr();
  }

  public addEndDateForNow():void {
    this.endDate = this.getDateNowStr();
  }

  private getDateNowStr():number {
    return new Date().getTime();
  }
}
