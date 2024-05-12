import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
  @Input() totalItems = 0;
  @Output() pageChanged = new EventEmitter<{
    pageIndex: number;
    pageSize: number;
  }>();

  pageSizeOptions: number[] = [10, 20, 50, 100];
  pageSize = 10;
  pageIndex = 0;

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.pageChanged.emit({
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
    });
  }
}
