import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CategoryModel} from '../models/category.model';
import {CategoryCreateModel} from '../models/category-create.model';

@Injectable()
export class CategoryService {
    constructor(private _httpClient: HttpClient) {
    }

    getAll(): Observable<CategoryModel[]> {
        return this._httpClient.get<CategoryModel[]>('https://63761992b5f0e1eb850298da.mockapi.io/categories');
    }

    create(category: CategoryCreateModel): Observable<CategoryModel> {
        return this._httpClient.post<CategoryModel>('https://63761992b5f0e1eb850298da.mockapi.io/categories', category);
    }

    getOne(id: string): Observable<CategoryModel> {
        return this._httpClient.get<CategoryModel>('https://63761992b5f0e1eb850298da.mockapi.io/categories/' + id);
    }

    edit(category: CategoryModel): Observable<CategoryModel> {
        return this._httpClient.put<CategoryModel>('https://63761992b5f0e1eb850298da.mockapi.io/categories/' + category.id, category);
    }
}
