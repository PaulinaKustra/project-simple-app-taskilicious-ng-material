import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CategoryDetailComponent } from './category-detail.component';
import {RouterLink} from "@angular/router";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@NgModule({
    imports: [
        AsyncPipe,
        CommonModule,
        MatTableModule,
        MatButtonModule,
        MatIconModule,
        RouterLink,
        MatProgressSpinnerModule
    ],
  declarations: [CategoryDetailComponent],
  providers: [],
  exports: [CategoryDetailComponent]
})
export class CategoryDetailComponentModule {
}
