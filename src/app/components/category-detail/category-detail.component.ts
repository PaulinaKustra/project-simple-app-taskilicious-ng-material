import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import {Observable, switchMap, take} from "rxjs";
import {CategoryModel} from "../../models/category.model";
import {CategoryService} from "../../services/category.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-category-detail',
  styleUrls: ['./category-detail.component.scss'],
  templateUrl: './category-detail.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryDetailComponent {

  readonly data$: Observable<CategoryModel> = this._activatedRoute.params
      .pipe(switchMap((data) => this._categoryService.getOne(data['id'])),
          take(1)
      );

  constructor(private _categoryService: CategoryService, private _activatedRoute: ActivatedRoute, private _router: Router) {
    this.data$.subscribe()
  }
}
