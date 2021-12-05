import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { UserListComponent } from './users/user-list/user-list.component';
import { PlaceListComponent } from './places/place-list/place-list.component';


@NgModule({
  declarations: [
  
    UserListComponent,
       PlaceListComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
