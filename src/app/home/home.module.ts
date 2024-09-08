import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { TaskComponent } from './components/task/task.component';
import { HttpClientModule } from '@angular/common/http';

import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskCrudComponent } from './components/task-crud/task-crud.component';
import { DialogService } from 'primeng/dynamicdialog';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MenubarModule } from 'primeng/menubar';
import { SharedModule } from '../shared/shared.module';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
  declarations: [
    TaskComponent,
    TaskCrudComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HomeRoutingModule,
    HttpClientModule,
    InputTextModule,
    DropdownModule,
    TableModule,
    ButtonModule,
    CardModule,
    DialogModule,
    CalendarModule,
    ToastModule,
    ConfirmDialogModule,
    MenubarModule,
    SharedModule,
    TooltipModule
  ],
  providers: [
    DialogService,
    MessageService,
    ConfirmationService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeModule { }
