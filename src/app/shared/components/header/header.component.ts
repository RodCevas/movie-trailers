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

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
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
}
