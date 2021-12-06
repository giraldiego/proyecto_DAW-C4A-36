import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../auth/guards/admin.guard';
import { ModeratorGuard } from '../auth/guards/moderator.guard';
import { PlaceListComponent } from './places/place-list/place-list.component';
import { UserListComponent } from './users/user-list/user-list.component';

const routes: Routes = [
  {
    path: 'users',
    component: UserListComponent,
    canActivate: [AdminGuard] },

  {
    path: 'places',
    component: PlaceListComponent,
    canActivate: [ModeratorGuard]
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
