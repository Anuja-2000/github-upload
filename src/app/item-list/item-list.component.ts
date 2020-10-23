import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Item} from '../item';
import {ItemsService} from '../items.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {DeleteItemDialogComponent} from '../delete-item-dialog/delete-item-dialog.component';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*', margin: '5px 0 5px 0', ['justify-content']: 'space-between'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ItemListComponent implements OnInit {
  itemList: Item[] = [];
  index = 0;
  total = 0;
  expandedElement: any;
  displayedColumns: string[] = ['id', 'name', 'price', 'quantity', 'total'];
  isDataRecieved = false;
  // confirmBoxResult = false;
  private dialogRef: MatDialogRef<DeleteItemDialogComponent>;

  constructor(private itemService: ItemsService, private router: Router, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getItemList();
  }

  getItemList(): void {
    this.itemService.getItemList().subscribe((r) => {
      this.itemList = r;
      this.isDataRecieved = true;
    });
    this.itemService.getTotal().subscribe(r => {
      this.total = r;
      console.log(r);
    });
  }

  deleteItem(id: number): void {
    // this.confirmBoxResult = confirm('Delete Selected Item!');
    // if (this.confirmBoxResult) {
    //   this.itemService.deleteItem(id).subscribe(() => window.location.reload());
    // }
    this.dialogRef = this.dialog.open(DeleteItemDialogComponent,
      {
        width: '500px',
        data: id
      });
    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.itemService.deleteItem(id).subscribe(() => this.getItemList());
      }
    });
  }

  editItem(item: Item): void{
    this.itemService.editItem(item);
    this.router.navigateByUrl('/edit-Item/' + item.id);
    // this.route.snapshot.paramMap.get('index')
  }

}
