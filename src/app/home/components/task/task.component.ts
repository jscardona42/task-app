import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../interfaces/task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  tasks: Task[] = [];

  constructor(private taskService: TaskService) {

  }

  ngOnInit() {
    this.taskService.getTasks().subscribe(data => {
      this.tasks = data;
      console.log(this.tasks);
    });
  }
}
