import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable, switchMap, take, tap} from 'rxjs';
import {CategoryModel} from '../../models/category.model';
import {CategoryService} from '../../services/category.service';
import {TaskService} from '../../services/task.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-task-form-create',
    styleUrls: ['./task-form-create.component.scss'],
    templateUrl: './task-form-create.component.html',
    encapsulation: ViewEncapsulation.Emulated,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskFormCreateComponent {
    readonly form: FormGroup = new FormGroup({
        name: new FormControl('', [Validators.required]),
        categoryId: new FormControl('', [Validators.required])
    });
    private selectedId: string = ''
    readonly categories$: Observable<CategoryModel[]> = this._activatedRoute.params
        .pipe(switchMap((dataRoute) => {
                    this.selectedId = dataRoute['categoryId']
                    return this._categoryService.getAll()
                }
            ),
            take(1)
            , tap((data) => {
                let id = data.find(x => x.id === this.selectedId)?.id
                this.form.patchValue({categoryId: id})
            })
        );

    constructor(private _categoryService: CategoryService, private _taskService: TaskService, private _router: Router, private _activatedRoute: ActivatedRoute) {
    }


    onFormSubmitted(form: FormGroup): void {

        if (this.form.valid) {
          this._taskService.create({
            name: form.value.name,
            categoryId: form.value.categoryId
          }).subscribe(() => this._router.navigate(['categories/' + this.form.value.categoryId]));
        }
    }
}
