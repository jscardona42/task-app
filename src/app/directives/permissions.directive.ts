import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appPermissions]'
})
export class PermissionsDirective {
  private userPermissions: string[] = [];

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {
    const storedPermissions = localStorage.getItem('permissions');

    if (storedPermissions) {
      this.userPermissions = JSON.parse(storedPermissions);
    }
  }

  @Input() set appPermissions(requiredPermission: string) {
    if (this.userPermissions.includes(requiredPermission)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
