import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {CategoryService} from '../../services/category.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-category-form-create',
    styleUrls: ['./category-form-create.component.scss'],
    templateUrl: './category-form-create.component.html',
    encapsulation: ViewEncapsulation.Emulated,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryFormCreateComponent {
    name = new FormControl('', [Validators.required]);

    constructor(private _categoryService: CategoryService, private _router: Router) {
    }

    onCreateButtonClicked() {
      console.log("this.name", this.name.value)
      this._categoryService.create({
        name: this.name.value ?? ''
      }).subscribe(() => this._router.navigate(['']));
    }
}
