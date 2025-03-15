import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
  signal,
} from '@angular/core';
import { CardComponent } from '../../shared/components/card/card.component';
import { CommonModule } from '@angular/common';
import { DataService } from '../../core/services/data.service';
import { Movie } from '../../core/models/models';

@Component({
  selector: 'app-home',
  imports: [CardComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  movies = signal<Movie[]>([]);
  error: string = '';

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.getMovies();
  }

  getMovies() {
    this.dataService.getAll().subscribe({
      next: (data) => (this.movies.set(Object.values(data))),
      error: (err) => (this.error = err),
    });
  }

  /*   cards = [
    {
      title: 'Card 1',
      subtitle: 'Subtitle for Card 1',
      description: 'This is the detailed description for Card 1.',
      showDescription: false,
    },
    {
      title: 'Card 2',
      subtitle: 'Subtitle for Card 2',
      description: 'This is the detailed description for Card 2.',
      showDescription: false,
    },
    {
      title: 'Card 3',
      subtitle: 'Subtitle for Card 3',
      description: 'This is the detailed description for Card 3.',
      showDescription: false,
    },
  ];

  toggleDescription(card: any): void {
    card.showDescription = !card.showDescription;
  } */
}
