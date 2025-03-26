import {
  ChangeDetectionStrategy,
  Component,
  Input
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { DetailComponent } from '../detail/detail.component';
import { Movie } from '../../../core/models/models';

@Component({
  selector: 'app-card',
  imports: [DetailComponent, RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  @Input() movie!: Movie;
}
