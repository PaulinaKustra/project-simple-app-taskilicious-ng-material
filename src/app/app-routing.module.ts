import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CategoriesComponent } from './components/categories/categories.component';
import { CategoryFormCreateComponent } from './components/category-form-create/category-form-create.component';
import { CategoryFormEditComponent } from './components/category-form-edit/category-form-edit.component';
import { CategoryDetailComponent } from './components/category-detail/category-detail.component';
import { CategoriesComponentModule } from './components/categories/categories.component-module';
import { CategoryServiceModule } from './services/category.service-module';
import { CategoryFormCreateComponentModule } from './components/category-form-create/category-form-create.component-module';
import { CategoryFormEditComponentModule } from './components/category-form-edit/category-form-edit.component-module';
import { CategoryDetailComponentModule } from './components/category-detail/category-detail.component-module';

@NgModule({
  imports: [RouterModule.forRoot([
    { path: '', component: CategoriesComponent },
    { path: 'categories/create', component: CategoryFormCreateComponent },
    { path: 'categories/edit/:id', component: CategoryFormEditComponent },
    { path: 'categories/:id', component: CategoryDetailComponent }
  ]), CategoriesComponentModule, CategoryServiceModule, CategoryFormCreateComponentModule, CategoryFormEditComponentModule, CategoryDetailComponentModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
