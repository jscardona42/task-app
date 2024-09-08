import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TaskService } from '../../services/task.service';
import { MessageService } from 'primeng/api';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { Task } from '../../interfaces/task';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-crud',
  templateUrl: './task-crud.component.html',
  styleUrls: ['./task-crud.component.css']
})
export class TaskCrudComponent {
  taskForm: FormGroup = new FormGroup([]);
  users: User[] = [];
  userOptions: any = [];
  task: Task | null = null;
  minDate: Date = new Date(); // Fecha actual
  disabledDates: Date[] = [];

  constructor(
    private fb: FormBuilder,
    public ref: DynamicDialogRef,
    private taskService: TaskService,
    private messageService: MessageService,
    private userService: UserService,
    public config: DynamicDialogConfig,
    private router: Router
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      expiration_date: ['', Validators.required],
      user_id: ['', Validators.required]
    });
    this.initializeDisabledDates();
  }

  ngOnInit() {
    this.getUsers();
    this.initForm();
    this.loadTaskData()
  }

  initForm() {

  }

  initUsers() {
    this.userOptions = this.users.map(user => ({
      label: user.name,
      value: user.id
    }));
  }

  getUsers() {
    this.userService.gerUsers().subscribe(data => {
      this.users = data.data;
      this.initUsers();
    });
  }

  updateTask(formValues: Task) {
    this.taskService.updateTask(this.task?.id, formValues).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Tarea actualizada correctamente.'
        });
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: "No se pudo actualizar la tarea"
        });
      }
    });
  }

  createTask(formValues: Task) {
    this.taskService.createTask(formValues).subscribe({
      next: (task) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Tarea creada correctamente.'
        });

      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: "No se pudo crear la tarea"
        });
      }
    });
  }

  onSubmit() {
    const formValues = { ...this.taskForm.value };
    formValues.user_id = formValues.user_id.value;
    const expirationDate = formValues.expiration_date;
    formValues.expiration_date = expirationDate.toISOString().split('T')[0];

    if (this.taskForm.valid) {
      if (this.task) {
        this.updateTask(formValues);
      } else {
        this.createTask(formValues);
      }
      this.ref.close(this.taskForm.value);
    }
  }

  onCancel() {
    this.ref.close();
  }

  loadTaskData() {
    this.task = this.config.data?.task;
    if (this.task) {
      this.taskForm.patchValue({
        title: this.task.title,
        description: this.task.description,
        expiration_date: new Date(this.task.expiration_date),
        user_id: this.task.user_id
      });
    }
  }

  initializeDisabledDates() {
    this.disabledDates = this.getPastDates(this.minDate);
  }

  getPastDates(minDate: Date): Date[] {
    const dates: Date[] = [];
    const today = new Date(minDate);
    today.setHours(0, 0, 0, 0);

    for (let i = 1; i <= 30; i++) {
      const pastDate = new Date(today);
      pastDate.setDate(today.getDate() - i);
      dates.push(pastDate);
    }

    return dates;
  }
}
