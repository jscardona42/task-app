import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { TaskComponent } from './components/task/task.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    TaskComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    HttpClientModule
  ]
})
export class HomeModule { }
