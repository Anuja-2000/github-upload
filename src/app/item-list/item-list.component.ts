import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Item } from '../item';
import { ItemsService } from '../items.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css'],
})
export class ItemListComponent implements OnInit {
  itemList = [];
  index: number = 0;
  confirmBoxResult: boolean = false;
  constructor(private itemService: ItemsService, private router: Router) {}

  ngOnInit(): void {
    this.getItems();
  }

  getItems(): void {
    this.itemService.getItemList().subscribe((r) =>(this.itemList = r));
  }

  deleteItem(id: number) {
    this.confirmBoxResult = confirm('Delete Selected Item!');
    if (this.confirmBoxResult) {
      this.itemService.deleteItem(id).subscribe(() => window.location.reload());
    }
  }

  editItem(item: Item) {
    this.itemService.editItem(item);
    this.router.navigateByUrl('/edit-Item/' + item.id);
    // this.route.snapshot.paramMap.get('index')
  }

  setId(){
    this.itemList.length
  }
}
