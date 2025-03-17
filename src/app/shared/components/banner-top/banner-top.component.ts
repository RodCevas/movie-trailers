import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Movie } from '../../../core/models/models';
import { SafeUrlPipe } from '../../pipes/SafeUrl.pipe';

@Component({
  selector: 'app-banner-top',
  imports: [SafeUrlPipe],
  templateUrl: './banner-top.component.html',
  styleUrl: './banner-top.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BannerTopComponent {
  private _movieBannerUrl: string = '';

  @Input() set movieBanner(value: Movie) {
    this._movieBannerUrl = value.youtube_video_id;
  }

  get movieBannerUrl(): string {
    return (
      'https://www.youtube.com/embed/' +
      this._movieBannerUrl +
      '?controls=0&autoplay=1&mute=1&playsinline=1&loop=1'
    );
  }
}
