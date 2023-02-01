import { NgModule } from '@angular/core';
import { CategoryDetailComponent } from './category-detail.component';
import {AsyncPipe} from "@angular/common";

@NgModule({
    imports: [
        AsyncPipe
    ],
  declarations: [CategoryDetailComponent],
  providers: [],
  exports: [CategoryDetailComponent]
})
export class CategoryDetailComponentModule {
}
