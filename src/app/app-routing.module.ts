import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CategoriesComponent} from './components/categories/categories.component';
import {CategoryFormCreateComponent} from './components/category-form-create/category-form-create.component';
import {CategoryFormEditComponent} from './components/category-form-edit/category-form-edit.component';
import {CategoryDetailComponent} from './components/category-detail/category-detail.component';
import {TaskFormCreateComponent} from './components/task-form-create/task-form-create.component';
import {TaskFormEditComponent} from './components/task-form-edit/task-form-edit.component';
import {CategoriesComponentModule} from './components/categories/categories.component-module';
import {CategoryServiceModule} from './services/category.service-module';
import {CategoryFormCreateComponentModule} from './components/category-form-create/category-form-create.component-module';
import {CategoryFormEditComponentModule} from './components/category-form-edit/category-form-edit.component-module';
import {CategoryDetailComponentModule} from './components/category-detail/category-detail.component-module';
import {TaskServiceModule} from './services/task.service-module';
import {TaskFormCreateComponentModule} from './components/task-form-create/task-form-create.component-module';
import {TaskFormEditComponentModule} from './components/task-form-edit/task-form-edit.component-module';
import {TeamMemberServiceModule} from "./services/team-member.service-module";
import {UploadcareServiceModule} from "./services/uploadcare.service-module";

@NgModule({
    imports: [RouterModule.forRoot([
        {path: '', component: CategoriesComponent},
        {path: 'categories/create', component: CategoryFormCreateComponent},
        {path: 'categories/edit/:id', component: CategoryFormEditComponent},
        {path: 'categories/:id', component: CategoryDetailComponent},
        {path: 'tasks/create/:categoryId', component: TaskFormCreateComponent},
        {path: 'tasks/edit/:id', component: TaskFormEditComponent}]),
        CategoriesComponentModule,
        CategoryServiceModule,
        CategoryFormCreateComponentModule,
        CategoryFormEditComponentModule,
        CategoryDetailComponentModule,
        TaskServiceModule,
        TaskFormCreateComponentModule,
        TaskFormEditComponentModule,
        TeamMemberServiceModule,
        UploadcareServiceModule],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
