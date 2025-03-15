import {
  ChangeDetectionStrategy,
  Component,
  input,
  Input,
  signal,
} from '@angular/core';
import { DetailComponent } from '../detail/detail.component';
import { Movie } from '../../../core/models/models';

@Component({
  selector: 'app-card',
  imports: [DetailComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  @Input() movie!: Movie;
  @Input() error!: string;
}
