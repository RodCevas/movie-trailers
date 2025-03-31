import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-detail',
  imports: [DatePipe],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailComponent {
  queryParams: any = {};
  queryParamsGenres: string[] = [];
  safeUrl: SafeResourceUrl = '';

  private sanitizer = inject(DomSanitizer);
  private route = inject(ActivatedRoute);

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      this.queryParams = params;
      this.queryParamsGenres = params.getAll('genres');     
    });
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://www.youtube.com/embed/' +
        this.queryParams.params.youtube_video_id +
        '?controls=1&autoplay=0&playlist=' +
        this.queryParams.params.youtube_video_id +
        '&loop=0&disablekb=1&iv_load_policy=3&rel=0'
    ); 
  }
}
