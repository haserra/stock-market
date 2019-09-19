import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { StockItemComponent } from './stock/stock-item/stock-item.component';
import { CreateStockComponent } from './stock/create-stock/create-stock.component';
import { StockListComponent } from './stock/stock-list/stock-list.component';
import { StockService } from './services/stock.service';
import { MessageService } from './services/message.service';

@NgModule({
  /**
   * the declarations block defines all the components that are allowed to be used within the scope of the HTML
   */
  declarations: [AppComponent, StockItemComponent, CreateStockComponent, StockListComponent],
  /**
   * the imports array allow me to import other browser functionalities
   */
  imports: [BrowserModule, FormsModule, HttpClientModule],
  providers: [StockService, MessageService],
  /**
   * the bootstrap array defines the component that acts as the entry point
   */
  bootstrap: [AppComponent]
})
export class AppModule { }
