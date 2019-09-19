import { Component, OnInit } from '@angular/core';
import { Stock } from '../../model/stock';
import { StockService } from '../../services/stock.service';
import { MessageService } from '../../services/message.service';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';

@Component({
  selector: 'app-create-stock',
  templateUrl: './create-stock.component.html',
  styleUrls: ['./create-stock.component.css'],
  providers: [MessageService]
})
export class CreateStockComponent implements OnInit {

  /* public stock: Stock = new Stock('test stock 01 a', 'ts 01a', 0, 0, 'NASDAQ'); */
  public stock: Stock;
  public confirmed: boolean = false;
  public message = null;
  public exchanges = ['NYSE', 'NASDAQ', 'OTHER'];

  public stocks$: Observable<Stock[]>;

  public searchString: string = '';

  constructor(private stockService: StockService,
    public messageService: MessageService) {
    // keep this one ?
    // this.stock = new Stock('test stock 01', 'ts 01', 0, 0, 'NASDAQ');
    /** we dont have a class t instantiate any more, only a interface */
    // this.stock = new Stock('test stock 09 a', 'ts 09a', 0, 0, 'NASDAQ');
    this.initializeStock();
    this.messageService.message = 'Component level: Hello Message Service';
  }
  /**
   * instead of instantiating a new class using new operator
   */
  initializeStock() {
    // throw new Error("Method not implemented.");
    this.stock = {
      name: '',
      code: '',
      price: 0,
      previousPrice: 0,
      exchange: 'NASDAQ',
      favorite: false
    };
  }

  setStockPrice(price: number) {
    this.stock.price = price;
    this.stock.previousPrice = price;
  }

  _createStock() {
    console.log('Creating stock', this.stock);
  }

  createStock(stockForm) {
    if (stockForm.valid) {
      this.stockService.createStock(this.stock)
        .subscribe((result: any) => {
          this.message = result.msg;
          // this.stock = new Stock('', '', 0, 0, 'NASDAQ');
          this.initializeStock();
        }, (err) => {
          this.message = err.error.msg;
        });
    } else {
      console.error('Stock form is in an invalid state.');
    }
    // this.stocks$ = this.stockService.getStocks();
  }

  ngOnInit() {
    this.stocks$ = this.stockService.getStocks(this.searchString).pipe(share());

  }
}
