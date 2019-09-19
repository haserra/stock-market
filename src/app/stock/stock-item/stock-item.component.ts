import {
  Component, SimpleChanges, OnInit, ViewEncapsulation, OnChanges, OnDestroy,
  DoCheck, AfterViewChecked, AfterViewInit, AfterContentChecked,
  AfterContentInit, Input, Output, EventEmitter, ChangeDetectionStrategy
} from '@angular/core';

import { Stock } from '../../model/stock';

import { StockService } from '../../services/stock.service';

@Component({
  selector: 'app-stock-item',
  templateUrl: './stock-item.component.html',
  styleUrls: ['./stock-item.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default
})
export class StockItemComponent implements OnInit {

  public testCaption: string = 'Now I am testing alternative class and style binding syntax';
  /* now this component is only responsible for receiving the value of the stock from the parent component*/
  @Input() public stock: Stock;
  // @Output() private toggleFavorite: EventEmitter<Stock>; /* this way we garantee the output will be a stock ! */
  public stocks: Array<Stock>;
  public stockClasses: object;
  public stockStyles: object;

  constructor(private stockService: StockService) {
    /**
   * We need to ensure that the EventEmitter instance is initialized, as it is not autoinitialized
for us. Either do it inline or do it in the constructor
   */
    /**
     * otherwise we may assume that it's important that the EventEmmiter instance is initialized even
     * before the component UI has been rendered ?
     */
    /**
     * we are instantiating a new instance of toggleFavorite which is of type EventEmmitter of Stocks!
     */
    /**
     * we don't need t emmit an event anymore
     * this.toggleFavorite = new EventEmitter<Stock>();
     */
  }

  /* onToggleFavorite(event){
    this.toggleFavorite.emit(this.stock);
  } */

  onToggleFavorite(event) {
    this.stockService.toggleFavorite(this.stock)
      .subscribe((stock) => {
        this.stock.favorite = !this.stock.favorite;
      });
  }

  ngOnInit(): void {
    console.log('Stock Item Component - On Init');
    // this.toggleFavorite = new EventEmitter<Stock>();
  }
  ngAfterViewInit(): void {
    console.log('Stock Item Component - After View Init');
  }
  ngAfterViewChecked(): void {
    console.log('Stock Item Component - After View Checked');
  }
  ngAfterContentInit(): void {
    console.log('Stock Item Component - After Content Init');
  }
  ngAfterContentChecked(): void {
    console.log('Stock Item Component - After Content Checked');
  }
  ngDoCheck(): void {
    console.log('Stock Item Component - Do Check');
  }
  ngOnDestroy(): void {
    console.log('Stock Item Component - On Destroy');
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('Stock Item Component - On Changes - ', changes);
  }

  _toggleFavorite(event) {
    console.log(`We are toggling the favorite state for this stock! using the event: ${event} :) `);
    this.stock.favorite = !this.stock.favorite;
  }

  trackStockByCode(index, stock) {
    return stock.code;
  }

}