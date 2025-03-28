import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  OnInit,
} from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  NavigationEnd,
} from '@angular/router';
import { filter } from 'rxjs/operators';
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
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  imports: [CommonModule, FormsModule, CardComponent, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
export class HeaderComponent implements OnInit {
  movies = signal<Movie[]>([]);
  filteredMovies = signal<Movie[]>([]);
  error = signal<string>('');

  menuOpen = false;
  dropdownOpen = false;

  constructor(private router: Router) {}
  isGenresActive: boolean = false;

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {        
        if (event.url.includes('/genres')) {
          this.isGenresActive = true;
        } else this.isGenresActive = false;
      });
  }

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
