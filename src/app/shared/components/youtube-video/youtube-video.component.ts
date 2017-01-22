import {Component, OnInit, Input} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

@Component({
  selector: 'tomatito-youtube-video',
  templateUrl: 'youtube-video.component.html',
  styleUrls: ['youtube-video.component.scss']
})
export class YoutubeVideoComponent implements OnInit {
  @Input()
  public url:string;

  constructor(private domSanitizer : DomSanitizer) { }

  ngOnInit() {
  }
}
