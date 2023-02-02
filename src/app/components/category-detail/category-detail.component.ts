import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BehaviorSubject, map, Observable, tap} from 'rxjs';
import {switchMap, take} from 'rxjs/operators';
import {CategoryModel} from '../../models/category.model';
import {TaskModel} from '../../models/task.model';
import {CategoryService} from '../../services/category.service';
import {TaskService} from '../../services/task.service';

@Component({
    selector: 'app-category-detail',
    styleUrls: ['./category-detail.component.scss'],
    templateUrl: './category-detail.component.html',
    encapsulation: ViewEncapsulation.Emulated,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryDetailComponent {
    _deleteSubject: BehaviorSubject<void> = new BehaviorSubject<void>(void 0);
    readonly data$: Observable<CategoryModel> = this._activatedRoute.params
        .pipe(switchMap((data) => this._categoryService.getOne(data['id'])),
            take(1)
        );

    readonly tasks$: Observable<TaskModel[]> = this._deleteSubject.asObservable().pipe(switchMap(() =>
        this._activatedRoute.params
            .pipe(switchMap((data) =>
                    this._taskService.getAll().pipe(map((tasks) => tasks.filter(x => x.categoryId === data['id'])))),
                take(1)
            )));

    constructor(private _categoryService: CategoryService, private _activatedRoute: ActivatedRoute, private _router: Router, private _taskService: TaskService) {
        this.data$.subscribe()
    }

    onCreateButtonClicked() {
        this._activatedRoute.params.pipe(
            take(1),
            tap((data) => {
                this._router.navigate(['tasks/create', data['id']])
            })
        ).subscribe();
    }

    onRemoveButtonClicked(id: string) {
        this._taskService.remove(id).subscribe(() => this._deleteSubject.next());
    }
}
