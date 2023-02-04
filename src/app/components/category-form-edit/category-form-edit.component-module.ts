import { NgModule } from '@angular/core';
import { CategoryFormEditComponent } from './category-form-edit.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {ReactiveFormsModule} from "@angular/forms";
import {AsyncPipe, NgIf} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@NgModule({
    imports: [
        MatFormFieldModule,
        ReactiveFormsModule,
        NgIf,
        MatButtonModule,
        MatInputModule,
        MatProgressSpinnerModule,
        AsyncPipe
    ],
  declarations: [CategoryFormEditComponent],
  providers: [],
  exports: [CategoryFormEditComponent]
})
export class CategoryFormEditComponentModule {
}
