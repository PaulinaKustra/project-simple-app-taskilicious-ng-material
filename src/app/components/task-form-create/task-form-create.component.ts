import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {switchMap, take, tap} from 'rxjs/operators';
import {CategoryModel} from '../../models/category.model';
import {TeamMemberModel} from '../../models/team-member.model';
import {CategoryService} from '../../services/category.service';
import {TaskService} from '../../services/task.service';
import {TeamMemberService} from '../../services/team-member.service';

@Component({
    selector: 'app-task-form-create',
    styleUrls: ['./task-form-create.component.scss'],
    templateUrl: './task-form-create.component.html',
    encapsulation: ViewEncapsulation.Emulated,
    changeDetection: ChangeDetectionStrategy.Default
})
export class TaskFormCreateComponent {
    readonly form: FormGroup = new FormGroup({
        name: new FormControl('', [Validators.required]),
        categoryId: new FormControl('', [Validators.required]),
        teamMembers: new FormArray([])
    });
    get teamMembersArray() {
        return this.form.controls['teamMembers'] as FormArray;
    }

    readonly categories$: Observable<CategoryModel[]> = this._categoryService.getAll();
    readonly teamMembers$: Observable<TeamMemberModel[]> = this._teamMemberService.getAll().pipe(switchMap((members) =>
            this._teamMemberService.getAll()
        ),
        take(1),
        tap((members) => {
            this.data = members;
            members.forEach((member) => {
                        this.teamMembersArray.push(new FormControl(false))
                    })
        })
    );

    data: TeamMemberModel[] = [];
    subscription: Subscription | undefined;


    constructor(
        private _categoryService: CategoryService,
        private _taskService: TaskService,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _teamMemberService: TeamMemberService) {
        this.subscription = this.teamMembers$.subscribe();
        this._activatedRoute.params
            .pipe(take(1),tap((dataRoute) => {
                    this.form.patchValue({categoryId: dataRoute['categoryId']})
                }
            )).subscribe();
    }


    onFormSubmitted(form: FormGroup): void {
        if (this.form.valid) {
            let teamMemberIds = this.data.filter((value, index) => form.value.teamMembers[index]).map(x => x.id)
            this._taskService.create({
                name: form.value.name,
                categoryId: form.value.categoryId,
                teamMemberIds: teamMemberIds,
            }).subscribe(() => this._router.navigate(['categories/' + this.form.value.categoryId]));
        }
    }
    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
