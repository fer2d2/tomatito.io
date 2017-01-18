import {Injectable} from "@angular/core";

@Injectable()
export class SoundService {
  private _beep: any;

  constructor() {
    this._beep = new Audio("/assets/sound/beep.ogg");
  }

  public beep() {
    this._beep.play();
  }
}
