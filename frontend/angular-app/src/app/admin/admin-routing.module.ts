import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../auth/guards/admin.guard';
import { ModeratorGuard } from '../auth/guards/moderator.guard';
import { PlaceEditComponent } from './places/place-edit/place-edit.component';
import { PlaceListComponent } from './places/place-list/place-list.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { UserListComponent } from './users/user-list/user-list.component';

const routes: Routes = [
  {
    path: 'users',
    component: UserListComponent,
    canActivate: [AdminGuard] },
  {
    path: 'users/create',
    component: UserEditComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'users/edit/:id',
    component: UserEditComponent,
    canActivate: [AdminGuard] },
  {
    path: 'places',
    component: PlaceListComponent,
    canActivate: [ModeratorGuard]
   },
  {
    path: 'places/create',
    component: PlaceEditComponent,
    // canActivate: [ModeratorGuard]
  },
  {
    path: 'places/edit/:id',
    component: PlaceEditComponent,
    // canActivate: [ModeratorGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
