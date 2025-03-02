import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { HomeComponent } from "./feature/home/home.component";
import { DetailComponent } from "./shared/components/detail/detail.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, HomeComponent, DetailComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'movie-trailers';
}
