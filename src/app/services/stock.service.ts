import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { throwError as ObservableThrow } from 'rxjs';
import { of as ObservableOf } from 'rxjs';

import { Stock } from '../model/stock';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private stocks: Stock[];  

/*   constructor() {
    this.stocks = [
      new Stock('Test Stock Company', 'TSC', 85, 80, 'NASDAQ'),
      new Stock('Second Stock Company ', 'SSC', 10, 20, 'NSE'),
      new Stock('Last Stock Company', 'LSC', 876, 765, 'NYSE')
    ];
   } */

   constructor(private http: HttpClient) {

   }   

   /* getStocks(): Observable<Stock[]> {
     // the observable gets triggered with the array of stocks , thus emitting a data stream that represents the array
    return ObservableOf(this.stocks);
  } */  

  getStocks(query: string): Observable<Stock[]> {
    const params = new HttpParams()
      .set('q', query)
      .set('code', query);
    return this.http.get<Stock[]>('/api/stock', {
          // params: new HttpParams().set('name', query)
          params
    });
  }

  createStock(stock: Stock): Observable<any> {
    return this.http.post('/api/stock', stock);
  }

/*    createStock(stock: Stock) {
     const foundStock = this.stocks.find(each => each.code === stock.code);
     if (foundStock) {
       return ObservableThrow({
         msg: 'Stock with code ' + stock.code + 'already exists'
       });

       /* return false;
     }
     this.stocks.push(stock);
     return ObservableOf({
       msg: 'Stock with code ' + stock.code + ' successfully created'
    });

     /* return true;
   } */

/*    toggleFavorite(stock: Stock) {
     const foundStock = this.stocks.find(each => each.code === stock.code);
     foundStock.favorite = !foundStock.favorite;
     return ObservableOf(foundStock);

   } */

   toggleFavorite(stock: Stock): Observable<Stock> {
     return this.http.patch<Stock>('/api/stock' + stock.code,
      {
        favorite: !stock.favorite
      });
   }
}
