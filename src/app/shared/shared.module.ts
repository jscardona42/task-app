import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermissionsDirective } from '../directives/permissions.directive';



@NgModule({
  declarations: [PermissionsDirective],
  imports: [
    CommonModule
  ],
  exports: [
    PermissionsDirective
  ]
})
export class SharedModule { }
