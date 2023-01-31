import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CategoryFormCreateComponent } from './category-form-create.component';
import {AsyncPipe, JsonPipe, NgIf} from "@angular/common";
import {MatInputModule} from "@angular/material/input";
import {RouterLink} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
    imports: [ReactiveFormsModule, MatFormFieldModule, NgIf, AsyncPipe, JsonPipe, MatInputModule, RouterLink, MatButtonModule],
  declarations: [CategoryFormCreateComponent],
  providers: [],
  exports: [CategoryFormCreateComponent]
})
export class CategoryFormCreateComponentModule {
}
