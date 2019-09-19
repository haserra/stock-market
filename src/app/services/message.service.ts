import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
/**
 * the idea of the message service is to provide a container that holds messages strings
 */
  public message: string = null;

  constructor() {

  }
}
