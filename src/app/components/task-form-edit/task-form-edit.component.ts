import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {TaskService} from '../../services/task.service';
import {CategoryService} from "../../services/category.service";
import {Observable, Subscription, switchMap, take, tap} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {TaskModel} from "../../models/task.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CategoryModel} from "../../models/category.model";

@Component({
    selector: 'app-task-form-edit',
    styleUrls: ['./task-form-edit.component.scss'],
    templateUrl: './task-form-edit.component.html',
    encapsulation: ViewEncapsulation.Emulated,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskFormEditComponent {
    readonly form: FormGroup = new FormGroup({
        name: new FormControl('', [Validators.required]),
        categoryId: new FormControl('', [Validators.required])
    });
    readonly data$: Observable<TaskModel> = this._activatedRoute.params
        .pipe(switchMap((data) => this._taskService.getOne(data['id'])),
            take(1)
            , tap((data) => this.form.patchValue({name: data.name, categoryId : data.categoryId}))
        );
    subscription: Subscription | undefined;
    readonly categories$: Observable<CategoryModel[]> = this._categoryService.getAll();

    constructor(private _categoryService: CategoryService, private _taskService: TaskService, private _activatedRoute: ActivatedRoute, private _router: Router) {
        this.subscription = this.data$.subscribe()
    }

    onFormSubmitted(form: FormGroup): void {

        if (this.form.valid) {
            this._activatedRoute.params.pipe(
                take(1),
                switchMap((data) => this._taskService.edit({
                    name: form.value.name,
                    categoryId: form.value.categoryId
                }, data['id']))).subscribe(() => this._router.navigate(['categories/' + this.form.value.categoryId]));
        }
    }
    onDestroy() {
        this.subscription?.unsubscribe();
    }
}
