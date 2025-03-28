import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import { CardComponent } from '../../shared/components/card/card.component';
import { DataService } from '../../core/services/data.service';
import { Movie } from '../../core/models/models';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-genres',
  imports: [CardComponent],
  templateUrl: './genres.component.html',
  styleUrl: './genres.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenresComponent {
  moviesGenres = signal<Movie[]>([]);
  genresTitle = signal<string | undefined>('');
  error = signal<string>('');

  filteredMoviesGenres = computed(() => {
    return this.moviesGenres().filter(movie => movie.genres?.some(genre => {
      const genreString = genre?.toString().toLowerCase() || '';
      const titleString = (this.genresTitle() || '').toString().toLowerCase();
      return genreString === titleString;
    }));
  })

  constructor(private dataService: DataService, private router: Router) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        let urlParam = val.url.split('/').pop();
        this.genresTitle.set(urlParam?.replaceAll('%20', ' '));
      }
    })
  }

  ngOnInit() {
    this.getMovies();   
  }

  getMovies() {
    this.dataService.getAll('', '&limit=100').subscribe({
      next: (data) => this.moviesGenres.set(Object.values(data)),
      error: (err) => (this.error = err),
    });
  }
}
