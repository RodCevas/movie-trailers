import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  OnInit,
  signal,
} from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  NavigationEnd,
} from '@angular/router';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { Movie } from '../../../core/models/models';
import { Subject } from 'rxjs';
import { DataService } from '../../../core/services/data.service';
import { CardComponent } from "../card/card.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, CommonModule, CardComponent, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  movies = signal<Movie[]>([]);
  filteredMovies = signal<Movie[]>([]);
  error = signal<string>('');

  menuOpen = false;
  dropdownOpen = false;

  isGenresActive: boolean = false;

  inputText: string = '';
  private searchSubject = new Subject<string>();

  constructor(private router: Router, private dataService: DataService) {
    this.searchSubject
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((query) => {
        this.search(query);
        this.inputText = query;
      });
  }

  ngOnInit() {
    this.getMovies();
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        if (event.url.includes('/genres')) {
          this.isGenresActive = true;
        } else this.isGenresActive = false;
      });
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

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  closeDropdown(event?: Event) {
    if (event) {
      const target = event.target as HTMLElement;
      if (!target.closest('.dropdown')) {
        this.dropdownOpen = false;
      }
    } else {
      this.dropdownOpen = false;
    }
  }
}
