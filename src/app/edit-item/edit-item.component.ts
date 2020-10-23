import {Location} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Item} from '../item';
import {ItemsService} from '../items.service';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css'],
})
export class EditItemComponent implements OnInit {
  index = 0;
  item: Item = {} as Item;
  price = '';
  quantity = '';
  constructor(
    private route: ActivatedRoute,
    private itemService: ItemsService,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getItemForEdit();
    console.log(this.item);
  }
  getItemForEdit(): void {
    this.index = Number(this.route.snapshot.paramMap.get('index'));
    this.itemService.getItem(this.index).subscribe((r) => {
      this.item = r;
      this.setCents();
    });
  }
  save(): void {
    this.itemService
      .updateItemList(this.index, this.item.name, Number(this.price), Number(this.quantity))
      .subscribe(() => this.router.navigateByUrl('/home'));
  }
  back(): void {
    this.location.back();
  }

  setCents(): void{
    this.price = this.item.price.toFixed(2);
    this.quantity = this.item.quantity.toFixed(1);
  }

}
