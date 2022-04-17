import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { Card } from '../shared/model/card.model';
import { CardService } from '../shared/service/card/card.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent {
  cards!: Observable<Card[]>;
  start = 0;
  end = 50;
  length!: Observable<number>;
  filter!: string | number;
  constructor(private cardService: CardService) {
    this.init();
  }

  OnPageChange(event: PageEvent) {
    this.start = event.pageIndex * event.pageSize;
    this.end = this.start + event.pageSize;
    if (this.filter) {
      this.setFilter();
    }else {
      this.init();
    }
  }

  OnKeyUp(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.filter = value;
    this.setFilter();
  }

  init() {
    this.cards = this.cardService.selectPaginatedCards(this.start, this.end);
    this.length = this.cardService.selectTotalCards();
  }

  setFilter() {
    this.cards = this.cardService.selectFilteredAndPaginatedCards(this.filter, this.start, this.end);
    this.length = this.cardService.selectFilteredTotal(this.filter);
  }
}
