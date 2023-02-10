import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskModel } from '../../models/task.model';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-list',
  styleUrls: ['./task-list.component.scss'],
  templateUrl: './task-list.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListComponent {
  readonly data$: Observable<TaskModel[]> = this._taskService.getAll();

  constructor(private _taskService: TaskService) {
  }
}
