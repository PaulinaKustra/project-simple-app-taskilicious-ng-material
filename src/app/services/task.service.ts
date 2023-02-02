import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TaskModel} from '../models/task.model';
import {TaskCreateModel} from "../models/task-create.model";
import {TaskEditModel} from "../models/task-edit.model";

@Injectable()
export class TaskService {
    constructor(private _httpClient: HttpClient) {
    }

    getAll(): Observable<TaskModel[]> {
        return this._httpClient.get<TaskModel[]>('https://63761992b5f0e1eb850298da.mockapi.io/tasks');
    }

    create(task: TaskCreateModel): Observable<TaskModel> {
        return this._httpClient.post<TaskModel>('https://63761992b5f0e1eb850298da.mockapi.io/tasks', task);
    }

    remove(id: string): Observable<TaskModel> {
        return this._httpClient.delete<TaskModel>('https://63761992b5f0e1eb850298da.mockapi.io/tasks/' + id);
    }

    edit(task: TaskEditModel, id: string): Observable<TaskModel> {
        return this._httpClient.put<TaskModel>('https://63761992b5f0e1eb850298da.mockapi.io/tasks/' + id, task);
    }
    getOne(id: string): Observable<TaskModel> {
        return this._httpClient.get<TaskModel>('https://63761992b5f0e1eb850298da.mockapi.io/tasks/' + id);
    }
}
