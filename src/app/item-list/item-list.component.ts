import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Item} from '../item';
import {ItemsService} from '../items.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {DeleteItemDialogComponent} from '../delete-item-dialog/delete-item-dialog.component';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css'],
})
export class ItemListComponent implements OnInit {
  itemList = [];
  index = 0;
  // confirmBoxResult = false;
  private dialogRef: MatDialogRef<DeleteItemDialogComponent>;

  constructor(private itemService: ItemsService, private router: Router, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getItems();
  }

  getItems(): void {
    this.itemService.getItemList().subscribe((r) => (this.itemList = r));
  }

  deleteItem(id: number, index: number) {
    // this.confirmBoxResult = confirm('Delete Selected Item!');
    // if (this.confirmBoxResult) {
    //   this.itemService.deleteItem(id).subscribe(() => window.location.reload());
    // }
    this.dialogRef = this.dialog.open(DeleteItemDialogComponent,
      {
        width: '500px',
        data: index
      });
    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.itemService.deleteItem(id).subscribe(() => window.location.reload());
      }
    });
  }

  editItem(item: Item) {
    this.itemService.editItem(item);
    this.router.navigateByUrl('/edit-Item/' + item.id);
    // this.route.snapshot.paramMap.get('index')
  }
}
