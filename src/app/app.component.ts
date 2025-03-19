import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { HomeComponent } from "./feature/home/home.component";
import { DetailComponent } from "./shared/components/detail/detail.component";
import { LatestTrailersComponent } from "./feature/latest-trailers/latest-trailers.component";
import { TrendingTrailersComponent } from "./feature/trending-trailers/trending-trailers.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, HomeComponent, DetailComponent, LatestTrailersComponent, TrendingTrailersComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'movie-trailers';
}
