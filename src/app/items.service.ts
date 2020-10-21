import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Item} from './item';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  url = 'http://127.0.0.1:8080/shopping-List/';
  itemList: Item[] = [
    {id: 1, name: 'Apple', price: 100.00},
    {id: 2, name: 'Banana', price: 50.00},
    {id: 3, name: 'Grapes', price: 150.00},
    {id: 4, name: 'Fish', price: 250.00},
    {id: 5, name: 'Vegetables', price: 550.00},
    {id: 6, name: 'Milk', price: 300.00},
    {id: 7, name: 'Chiken', price: 650.00},
    {id: 8, name: 'Rice', price: 750.00},
    {id: 9, name: 'Coconut', price: 1050.00},
  ];
  private item: Item;

  constructor(private http: HttpClient) {
  }

  private rest = new BehaviorSubject<Item[]>(this.itemList);

  getItemList(): Observable<Item[]> {
    return this.http.get(this.url + 'all').pipe(map((r: any) => r));
  }

  addItem(item: Item): Observable<Item> {
    return this.http.post<Item>(this.url + 'add?name=' + item.name + '&price=' + item.price, {});
  }

  deleteItem(id: number): Observable <any> {
    return this.http.delete(this.url + 'delete-item?id=' + id);
  }

  editItem(item: Item): number {
    return this.itemList.indexOf(item);
  }

  getItem(index: number): Observable<Item> {
    return this.http.get(this.url + '/edit-item?id=' + index, {observe: 'body', responseType: 'json'}).pipe(map((r: any) => r));

  }

  // tslint:disable-next-line:typedef
  updateItemList(index: number, name: string, price: number): Observable<any> {
    return this.http.put(this.url + '/update-item?id=' + index + '&name=' + name + '&price=' + price, {});
  }

  getTotal(): Observable<number> {
    return this.http.get(this.url + '/get-total').pipe(map((r: any) => r));
  }
}
