import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ItemListComponent} from './item-list/item-list.component';
import {AddNewItemComponent} from './add-new-item/add-new-item.component';
import {EditItemComponent} from './edit-item/edit-item.component';

const routes: Routes = [
  {path: 'home', component: ItemListComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'add-Item', component: AddNewItemComponent},
  {path: 'edit-Item/:index', component: EditItemComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
