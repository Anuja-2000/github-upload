import {Injectable} from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';
import {Item} from './item';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  createDb(): { id: number; name: string; price: string; }[]{
    const Items = [
      {id: 1, name: 'Apple', price: '100.00'},
      {id: 2, name: 'Banana', price: '50.00'}
    ];
    return Items;
  }

  genId(items: Item[]): number {
    return items.length > 0 ? Math.max(...items.map(item => item.id)) + 1 : 1;
  }

}
