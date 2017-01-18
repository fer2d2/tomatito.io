export class Pomodoro {
  public startDate:string;
  public endDate:string;
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

  private getDateNowStr():string {
    return new Date().toISOString();
  }
}
