import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {Observable, Subscription, switchMap, take, tap} from 'rxjs';
import {CategoryModel} from '../../models/category.model';
import {CategoryService} from '../../services/category.service';
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, Validators} from "@angular/forms";

@Component({
    selector: 'app-category-form-create-edit',
    styleUrls: ['./category-form-edit.component.scss'],
    templateUrl: './category-form-edit.component.html',
    encapsulation: ViewEncapsulation.Emulated,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryFormEditComponent {
    name = new FormControl('', [Validators.required])
    subscription: Subscription | undefined;

    readonly data$: Observable<CategoryModel> = this._activatedRoute.params
        .pipe(switchMap((data) => this._categoryService.getOne(data['id'])),
            take(1)
            , tap((data) => this.name.patchValue(data.name))
        );

    constructor(private _categoryService: CategoryService, private _activatedRoute: ActivatedRoute, private _router: Router) {
       this.subscription = this.data$.subscribe()
    }

    onSubmitButtonClicked() {
        if (this.name.valid) {
            this._activatedRoute.params.pipe(
                take(1),
                switchMap((data) => this._categoryService.edit({
                    id: data['id'],
                    name: this.name.value ?? '',

                }))).subscribe(() => this._router.navigate(['']));
        }
    }

    onDestroy() {
        this.subscription?.unsubscribe();
    }
}
