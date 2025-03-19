import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-pagination',
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {
  @Input() currentPage!: number;
  @Input() totalMovies!: number;
  @Input() limitPages!: number;
  @Output() changePage = new EventEmitter<number>();

  pages: number[] = [];
  pagesCount!: number;

  ngOnChanges(): void {
    this.pagesCount = Math.ceil(this.totalMovies / this.limitPages);
    this.pages = this.rage(1, this.pagesCount);
  }

  rage(start: number, end: number): number[] {
    return [...Array(end).keys()].map((el) => el + start);
  }
}
