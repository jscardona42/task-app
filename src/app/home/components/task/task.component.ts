import { Component, OnInit, ViewChild } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../interfaces/task';
import { FormControl, FormGroup } from '@angular/forms';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TaskCrudComponent } from '../task-crud/task-crud.component';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { debounceTime } from 'rxjs';
import { TableLazyLoadEvent } from 'primeng/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  @ViewChild('dtTasks') table!: TableLazyLoadEvent;
  tasks: Task[] = [];
  users: User[] = [];
  user: any = {};
  public filterForm: any;
  totalRecords: number = 0;
  first: number | undefined = 0;
  last: number | undefined = 0;
  public page = 0;
  public rows = 10;
  items: MenuItem[] | undefined;
  filters!: { [p: string]: any };
  public columnFilters = {
    title: new FormControl(''),
    description: new FormControl(''),
    expiration_date: new FormControl(''),
    completed: new FormControl(''),
    user_name: new FormControl('')
  };
  noDataMessage: string = '';
  public taskStatus!: any[];
  public ref!: DynamicDialogRef;

  constructor(
    private taskService: TaskService,
    private dialogService: DialogService,
    private userService: UserService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {

  }

  ngOnInit() {

    this.initMenu();
    this.initFilterForm();
    this.initStatus();
    this.getUsers();

    this.filterForm.valueChanges
      .pipe(debounceTime(500))
      .subscribe((value: any) => {
        this.filters = Object.entries(value).reduce(
          (acc: { [key: string]: any }, [key, val]) => {
            if (val !== '' && val !== null) {
              acc[key] = val;
            }
            return acc;
          },
          {}
        );
        this.loadTasks(this.table);
      });
  }

  loadTasks(event: TableLazyLoadEvent): void {
    const { first, rows, sortField, sortOrder } = event;

    this.filters = {
      ...this.filters,
      page: (first && rows) ? Math.ceil(first / rows!) + 1 : 1,
      per_page: rows,
      order_column: sortField ?? 'title',
      order_direction: sortOrder === 1 ? 'ASC' : 'DESC',
    };

    this.getTasks();
  }

  getTasks(): void {
    this.taskService.loadTasks(this.filters).subscribe({
      next: (tasks) => {
        if (tasks) {
          if (this.tasks.length === 0) {
            this.noDataMessage = "No se encontraron datos";
          }
          this.totalRecords = tasks.total;
          this.first = tasks.from - 1;
          this.last = tasks.to;
          this.tasks = tasks.data;
        }
      },
      error: (err) => {
        console.error('Error loading tasks', err);
      }
    });
  }

  getUsers() {
    this.userService.gerUsers().subscribe(data => {
      this.users = data.data;
    });
  }

  public initFilterForm(): void {
    this.filterForm = new FormGroup({
      ...this.columnFilters
    });
  }

  editTask(task: Task) {
    this.openDialogTask(task);
  }

  deleteTask(taskId: number) {
    this.taskService.deleteTask(taskId).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Tarea eliminada correctamente.'
        });
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: "No se pudo eliminar la tarea"
        });
      }
    });
  }

  public resetFilters() {
    this.filterForm.reset();
  }

  public initStatus(): void {
    this.taskStatus = [
      {
        label: "AMBAS",
        value: ''
      },
      {
        label: "COMPLETADA",
        value: 'COMPLETADA',
      },
      {
        label: "NO COMPLETADA",
        value: 'NO COMPLETADA',
      }
    ];
  }

  public openDialogTask(task?: Task): void {
    this.ref = this.dialogService.open(TaskCrudComponent, {
      header: task ? 'Editar tarea' : 'Nueva tarea',
      width: '30%',
      data: { task },
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
    });
    this.ref.onClose.subscribe((result: any) => {
      this.getTasks();
    });
  }

  createNewTask() {
    this.openDialogTask();
  }

  showConfirm(taskId: number) {
    this.confirmationService.confirm({
      message: '¿Estás seguro de que deseas eliminar esta tarea?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteTask(taskId);
      },
      reject: () => {
      }
    });
  }

  showConfirmCompleted(task: Task) {
    this.confirmationService.confirm({
      message: '¿Estás seguro que completó la tarea?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.checkCompletedTask(task);
      },
      reject: () => {
      }
    });
  }

  checkCompletedTask(task: Task) {
    task.completed = true;
    this.taskService.updateTask(task.id, task).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Se cambió el estado correctamente'
        });
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: "No se pudo cambiar el estado de la tarea"
        });
      }
    });
  }

  getStatusLabel(status: number): string {
    return status === 1 ? 'COMPLETADA' : 'NO COMPLETADA';
  }

  initMenu() {
    this.items = [
      {
        label: 'Tareas',
        icon: 'pi pi-fw pi-list',
        routerLink: ['/task']
      },
      {
        label: 'Salir',
        icon: 'pi pi-fw pi-power-off',
        command: () => {
          this.sinOutUser();
        },
      }
    ];
  }

  sinOutUser() {
    localStorage.removeItem("data");
    localStorage.removeItem("token");
    localStorage.removeItem("permissions");
    this.router.navigate(['/login']);
  }

  getRole() {
    this.user = localStorage.getItem('data');
  }
}
