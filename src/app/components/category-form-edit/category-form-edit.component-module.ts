import { NgModule } from '@angular/core';
import { CategoryFormEditComponent } from './category-form-edit.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {ReactiveFormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";

@NgModule({
    imports: [
        MatFormFieldModule,
        ReactiveFormsModule,
        NgIf,
        MatButtonModule,
        MatInputModule
    ],
  declarations: [CategoryFormEditComponent],
  providers: [],
  exports: [CategoryFormEditComponent]
})
export class CategoryFormEditComponentModule {
}
