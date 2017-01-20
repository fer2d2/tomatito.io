import {Injectable} from "@angular/core";
import * as Ng2Translate from "ng2-translate";

const DEFAULT_LANGUAGE = "en";

@Injectable()
export class TranslateService {

  constructor(private _translate: Ng2Translate.TranslateService) {
    let defaultLanguage = localStorage.getItem('default-language') || DEFAULT_LANGUAGE;
    this._translate.setDefaultLang(defaultLanguage);

    localStorage.setItem('default-language', defaultLanguage);
  }

  public setLanguage(language: string) {
    this._translate.setDefaultLang(language);
    localStorage.setItem('default-language', language);
  }

  public getCurrentLanguage(): string {
    return this._translate.getDefaultLang();
  }

  public isDefaultLanguage(language: string): boolean {
    return this._translate.getDefaultLang() === language;
  }

  public instant(key: string, interpolateParams?: Object): string {
    return this._translate.instant(key, interpolateParams);
  }
}
