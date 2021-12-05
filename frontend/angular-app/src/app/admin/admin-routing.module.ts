import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlaceListComponent } from './places/place-list/place-list.component';
import { UserListComponent } from './users/user-list/user-list.component';

const routes: Routes = [
  { path: 'users', component: UserListComponent },
  { path: 'places', component: PlaceListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
