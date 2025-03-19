import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  signal,
} from '@angular/core';
import { CardComponent } from '../../shared/components/card/card.component';
import { CommonModule } from '@angular/common';
import { DataService } from '../../core/services/data.service';
import { Movie } from '../../core/models/models';
import { BannerTopComponent } from "../../shared/components/banner-top/banner-top.component";

@Component({
  selector: 'app-home',
  imports: [CardComponent, CommonModule, BannerTopComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  moviesTrending = signal<Movie[]>([]);
  moviesLatest = signal<Movie[]>([]);
  error = signal<string>('');

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.getMovies();
  }

  getMovies() {
    this.dataService.getAll('/latest', '&limit=9').subscribe({
      next: (data) => this.moviesLatest.set(Object.values(data)),
      error: (err) => (this.error = err),
    });
    this.dataService.getAll('/trending', '&limit=9').subscribe({
      next: (data) => this.moviesTrending.set(Object.values(data)),
      error: (err) => (this.error = err),
    });
  }
}
