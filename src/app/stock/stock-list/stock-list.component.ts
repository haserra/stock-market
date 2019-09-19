import { Component, OnInit } from '@angular/core';
import { StockService } from '../../services/stock.service';
import { Stock } from '../../model/stock';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';

import { Subject } from 'rxjs';
import {
  debounceTime, switchMap,
  distinctUntilChanged, startWith
} from 'rxjs/operators';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent implements OnInit {

  public stocks: Stock[];
  public stocks$: Observable<Stock[]>;
  public searchString: string = '';

  private searchTerms: Subject<string> = new Subject();

  constructor(private stockService: StockService) {

  }

  /*   ngOnInit() {
      this.stocks = [
        new Stock('Test Stock Company', 'TSC', 85, 80, 'NASDAQ'),
        new Stock('Second Stock Company', 'SSC', 10, 20, 'NSE'),
        new Stock('Last Stock Company', 'LSC', 876, 765, 'NYSE'),
      ];
    } */

  /***
   * instead of initializing the array os stocks in the ngOnInit hook, let's use the service
   */

  ngOnInit() {
    /***
     * Follows a number of different approaches to get the stocks OnInit
     */

    /* 1st approach
    this.stocks = this.stockService.getStocks(); */

    /* 2nd approach
    this.stockService.getStocks().subscribe((stocks) => {
      this.stocks = stocks; 
     }); */

    /**
     * 3rd approach
     * we are back to a similar implementation as the 1st approach but using the Observable as a property member of the class
     */
    /* this.stocks$ = this.stockService.getStocks(this.searchString).pipe(share()); */

    /**
     * 4th approach
     * The first major thing we have done is that we have introduced a member variable called searchTerms, 
     * which is a Subject
     */
    this.stocks$ = this.searchTerms.pipe(
      startWith(this.searchString),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((query) => this.stockService.getStocks(query)),
      share()
    );

    this.stocks$.subscribe((stock) => {
      this.stocks = stock;
    });
  }

  search() {
    /***
     * Now playing with the search feature
     */
    
    /* this.stocks$ = this.stockService.getStocks(this.searchString)
    .pipe(share());

    this.stocks$.subscribe(  (stock) => {
      this.stocks = stock;
     }); */

    this.searchTerms.next(this.searchString);
  }
}
