import { Component, ViewEncapsulation, OnInit, OnChanges, OnDestroy,
         DoCheck, AfterViewChecked, AfterViewInit, AfterContentChecked,
         AfterContentInit,
         SimpleChanges} from '@angular/core';
import { Stock } from './model/stock';
import { MessageService } from './services/message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class AppComponent implements OnInit, OnChanges, OnDestroy, DoCheck,
             AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit {

  public title: string = 'stock-market, my first Angular App';
  public stockObj: Stock;

  constructor(public messageService: MessageService) {
    this.title = 'stock-market, my first Angular App!';
  }

  ngOnInit(): void {
    // this.stockObj = new Stock('Test Stock Company', 'TSC', 85, 80, 'NASDAQ' );
    this.stockObj = {
      name: '',
      code: '',
      price: 0,
      previousPrice: 0,
      exchange: 'NASDAQ',
      favorite: false
    };
    this.messageService.message = 'Hello Message Service';
  }
  ngAfterViewInit(): void {
    console.log('App Component - After View Init');
  }
  ngAfterViewChecked(): void {
    console.log('App Component - After View Checked');
  }
  ngAfterContentInit(): void {
    console.log('App Component - After Content Init');
  }
  ngAfterContentChecked(): void {
    console.log('App Component - After Content Checked');
  }
  ngDoCheck(): void {
    console.log('App Component - Do Check');
  }
  ngOnDestroy(): void {
    console.log('App Component - On Destroy');
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('App Component - On Changes - ', changes);
  }

  testMethod() {
    console.log('Test Method in AppComponent has been triggered');
  }

  onToggleFavorite(stock: Stock) {
    console.log('Favorite for stock', stock, 'was triggered');
    this.stockObj.favorite = !this.stockObj.favorite;
  }

}
