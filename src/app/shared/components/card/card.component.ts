import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DetailComponent } from "../detail/detail.component";

@Component({
  selector: 'app-card',
  imports: [DetailComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {

}
