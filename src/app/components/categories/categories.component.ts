import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {BehaviorSubject, combineLatest, map, Observable, of} from 'rxjs';
import {CategoryModel} from '../../models/category.model';
import {CategoryService} from '../../services/category.service';
import {Router} from "@angular/router";
import {FormControl, Validators} from "@angular/forms";

@Component({
    selector: 'app-categories',
    styleUrls: ['./categories.component.scss'],
    templateUrl: './categories.component.html',
    encapsulation: ViewEncapsulation.Emulated,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesComponent {
    private readonly _ascFilter = "A-Z";
    private readonly _descFilter = "Z-A"
    private _data$: Observable<CategoryModel[]> = this._categoryService.getAll();
    public sortingData$: Observable<string[]> = of([this._ascFilter, this._descFilter]);
    public sortingForm = new FormControl(this._ascFilter, [Validators.required])
    private _sortSubject: BehaviorSubject<string> = new BehaviorSubject<string>(this._ascFilter);

    public  filteredData$ = combineLatest([this._data$, this._sortSubject]).pipe(
        map(([data, filter]) => {
            data.sort((a, b) => {
                if (filter === this._ascFilter)
                    return a.name.toUpperCase() < b.name.toUpperCase() ? -1 : 1;
                else
                    return a.name.toUpperCase() > b.name.toUpperCase() ? -1 : 1;
            });
            return data;
        })
    )

    constructor(private _categoryService: CategoryService, private _router: Router) {
    }

    onSortChange(sortType: any) {
        this._sortSubject.next(sortType);
    }
}
