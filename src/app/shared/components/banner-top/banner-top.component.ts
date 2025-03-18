import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { Movie } from '../../../core/models/models';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-banner-top',
  imports: [],
  templateUrl: './banner-top.component.html',
  styleUrl: './banner-top.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BannerTopComponent {
  private _movieBanner: Movie = {
    id: '',
    youtube_video_id: '',
    youtube_channel_id: '',
    youtube_thumbnail: '',
    title: '',
    url: '',
    thumbnail: '',
    language: '',
    categories: [],
    genres: [],
    published: '',
    views: 0,
  };

  safeUrl: SafeResourceUrl = '';
  private sanitizer = inject(DomSanitizer);

  @Input() set movieBanner(value: Movie) {
    this._movieBanner = value;
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://www.youtube.com/embed/' +
        this._movieBanner.youtube_video_id +
        '?controls=0&autoplay=1&mute=1&playlist=' +
        this._movieBanner.youtube_video_id +
        '&loop=1&disablekb=1&iv_load_policy=3&rel=0'
    );
  }

  get movieBannerTitle(): string {
    return this._movieBanner.title;
  }
}
