import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import {map, Observable, of, Subject} from 'rxjs';
import { CategoryModel } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';
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
  sortingForm = new FormControl('A-Z', [Validators.required])
  data$: Observable<CategoryModel[]> = this._categoryService.getAll();

  private _sortSubject: Subject<string> = new Subject<string>();

  constructor(private _categoryService: CategoryService, private _router: Router) {
    this._sortSubject.subscribe((sortType) => {

      this.data$ = this.data$.pipe(map((data) => {
        data.sort((a, b) => {
          if (sortType === "A-Z")
            return a.name.toUpperCase() < b.name.toUpperCase() ? -1 : 1;
          else
            return a.name.toUpperCase() > b.name.toUpperCase() ? -1 : 1;
        });
        return data;
      }))
    })

  }

  ngOnDestroy(): void {
    this._sortSubject.unsubscribe();
  }

  sortingData$: Observable<string[]> = of(["A-Z", "Z-A"]);



  onSortChange(sortType: any) {
    this._sortSubject.next(sortType);
    // console.log("event: ", sortType)
    //
    // this.data$ = this.data$.pipe(map((data) => {
    //   data.sort((a, b) => {
    //     if (sortType === "A-Z")
    //       return a.name.toUpperCase() < b.name.toUpperCase() ? -1 : 1;
    //     else
    //       return a.name.toUpperCase() > b.name.toUpperCase() ? -1 : 1;
    //   });
    //   return data;
    // }))
  }
}
