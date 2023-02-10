import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { TaskListComponent } from './task-list.component';

@NgModule({
  imports: [MatListModule, CommonModule],
  declarations: [TaskListComponent],
  providers: [],
  exports: [TaskListComponent]
})
export class TaskListComponentModule {
}
