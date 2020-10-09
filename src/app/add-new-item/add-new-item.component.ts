import { Location } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from '../item';
import { ItemsService } from '../items.service';

@Component({
  selector: 'app-add-new-item',
  templateUrl: './add-new-item.component.html',
  styleUrls: ['./add-new-item.component.css'],
})
export class AddNewItemComponent implements OnInit {
  item: Item = {} as Item;
  id: number = 0;
  itemListLength: number;
  constructor(
    private location: Location,
    private itemService: ItemsService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  addItem() {
    this.itemService.addItem(this.item).subscribe(() => this.router.navigateByUrl('/home') );
    // , () => this.router.navigateByUrl('/home')
  }

  goBack(): void {
    this.location.back();
  }

  keyBoardIsEnterKeypressed() {
    this.addItem();
    console.log('key up enter');
  }
}
