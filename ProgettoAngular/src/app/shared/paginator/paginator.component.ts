import { Component } from '@angular/core';
import { IconDefinition, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { PaginatorService } from '../../core/services/paginator.service';


@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
  providers: [PaginatorService]
})
export class PaginatorComponent {
  faChevronLeft: IconDefinition = faChevronLeft;
  faChevronRight: IconDefinition = faChevronRight;
  page: number = 1;

  constructor (private paginatorService: PaginatorService) { }

  goToPreviousPage() {
    if (this.page > 1) {
      this.page -= 1;
      this.paginatorService.goToPage(this.page);
    }
  }

  goToNextPage() {
    this.page += 1;
    this.paginatorService.goToPage(this.page);
  }

  goToPage(event: Event) {
    const target = event.target as HTMLInputElement;
    const value: number = +target.value;

    if ( value >= 1 ) {
      this.page = value;
      this.paginatorService.goToPage(this.page);
    }
  }
}
