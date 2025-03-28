import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  OnInit,
  signal,
} from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { Movie } from '../../core/models/models';
import { CardComponent } from '../../shared/components/card/card.component';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';
import { __metadata } from 'tslib';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-latest-trailers',
  imports: [CardComponent, PaginationComponent],
  templateUrl: './latest-trailers.component.html',
  styleUrl: './latest-trailers.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LatestTrailersComponent implements OnInit {
  moviesLatest = signal<Movie[]>([]);
  error = signal<string>('');

  currentPage = signal<number>(1);
  totalMovies = signal<number>(100);
  limitPages = signal<number>(20);

  slicedMovies = computed(() => {
    return this.sliceMovies(
      this.currentPage(),
      this.limitPages(),
      this.moviesLatest()
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
      .getAll('/latest', `&limit=${this.totalMovies()}`)
      .subscribe({
        next: (data) => {
          this.moviesLatest.set(Object.values(data));
          /*           let metadata = Object.values(data).length - 1;
          this.totalMovies.set(Object.values(data)[metadata].total_count);   */
          console.log(this.moviesLatest());
        },
        error: (err) => (this.error = err),
      });
  }

  changePage($event: number) {
    this.currentPage.set($event);
    window.scrollTo(0, 0);
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
    this.router.navigate(['/home'], {
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
