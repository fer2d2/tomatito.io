import { Component, OnInit } from '@angular/core';
import {TranslateService} from "../shared/services/translate.service";
import {LANGUAGES} from "./languages";

@Component({
  selector: 'tomatito-language-picker',
  templateUrl: './language-picker.component.html',
  styleUrls: ['./language-picker.component.css']
})
export class LanguagePickerComponent implements OnInit {

  private _languages:any;

  constructor(private _translateService:TranslateService) {
    this._languages = LANGUAGES;
  }

  ngOnInit() {
  }

  public changeLanguage(language: string) {
    this._translateService.setLanguage(language);
  }

  public isSelected(language: string) {
    return this._translateService.isDefaultLanguage(language);
  }
}
