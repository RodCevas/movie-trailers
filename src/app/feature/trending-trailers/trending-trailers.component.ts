import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  OnInit,
  signal,
} from '@angular/core';
import { Movie } from '../../core/models/models';
import { DataService } from '../../core/services/data.service';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';
import { CardComponent } from '../../shared/components/card/card.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-trending-trailers',
  imports: [PaginationComponent, CardComponent],
  templateUrl: './trending-trailers.component.html',
  styleUrl: './trending-trailers.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrendingTrailersComponent implements OnInit {
  moviesTrending = signal<Movie[]>([]);

  currentPage = signal<number>(1);
  totalMovies = signal<number>(100);
  limitPages = signal<number>(20);

  slicedMovies = computed(() => {
    return this.sliceMovies(
      this.currentPage(),
      this.limitPages(),
      this.moviesTrending()
    );
  });

  constructor(
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    effect(() => {
      if (this.currentPage()) {
        this.getMovies();
      }
    });
  }

  ngOnInit() {
    this.setCurrentPage();
    this.getMovies();
  }

  getMovies() {
    this.dataService
      .getAll('/trending', `&limit=${this.totalMovies()}`)
      .subscribe({
        next: (data) => {
          this.moviesTrending.set(Object.values(data));
        },
      });
  }

  sliceMovies(currentPage: number, limitPages: number, movies: Movie[]) {
    let trimStart = (currentPage - 1) * limitPages;
    let trimEnd = trimStart + limitPages;
    return movies.slice(trimStart, trimEnd);
  }

  changePage($event: number) {
    this.setCurrentPage();
    this.setPaginationParam($event);
    window.scrollTo(0, 0);
  }

  setPaginationParam(page: number) {
    this.router.navigate(['/trending'], {
      queryParams: { page: page },
      queryParamsHandling: 'merge',
    });
  }

  setCurrentPage() {
    this.route.queryParams.subscribe((params) => {
      this.currentPage.set(Number(params['page'] ? +params['page'] : 1));
    });
  }
}
