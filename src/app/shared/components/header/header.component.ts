import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { DataService } from '../../../core/services/data.service';
import { Movie } from '../../../core/models/models';
import { CardComponent } from '../card/card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule, FormsModule, CardComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  movies = signal<Movie[]>([]);
  filteredMovies = signal<Movie[]>([]);
  error = signal<string>('');

  menuOpen = false;

  inputText: string = '';

  private searchSubject = new Subject<string>();

  constructor(private dataService: DataService) {
    this.searchSubject
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((query) => {
        this.search(query);
        this.inputText = query;
      });
  }

  ngOnInit(): void {
    this.getMovies();
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  getMovies() {
    this.dataService.getAll('', '&limit=100').subscribe({
      next: (data) => this.movies.set(Object.values(data)),
      error: (err) => (this.error = err),
    });
  }

  onSearch(event: Event): void {
    const query = (event.target as HTMLInputElement).value;
    this.searchSubject.next(query);
  }
  search(query: string): void {
    query = (query || '').toString().toLowerCase();
    if (query != '') {
      this.filteredMovies.set(
        this.movies().filter((movie) =>
          (movie.title || '').toString().toLowerCase().includes(query)
        )
      );
    } else {
      this.filteredMovies.set([]);
    }
    /* window.scrollTo(0, 0); */
  }

  clearInput() {
    this.inputText = '';
  }
}
