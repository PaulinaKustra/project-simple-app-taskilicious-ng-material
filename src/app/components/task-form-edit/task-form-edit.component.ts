import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {TaskService} from '../../services/task.service';
import {CategoryService} from "../../services/category.service";
import {combineLatest, map, Observable, Subscription, switchMap, take, tap} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {TaskModel} from "../../models/task.model";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {CategoryModel} from "../../models/category.model";
import {TeamMemberModel} from "../../models/team-member.model";
import {TeamMemberService} from "../../services/team-member.service";

@Component({
    selector: 'app-task-form-edit',
    styleUrls: ['./task-form-edit.component.scss'],
    templateUrl: './task-form-edit.component.html',
    encapsulation: ViewEncapsulation.Emulated,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskFormEditComponent {
    readonly form: FormGroup = new FormGroup({
        name: new FormControl('', [Validators.required]),
        categoryId: new FormControl('', [Validators.required]),
        teamMembers: new FormArray([])
    });
    get teamMembersArray() {
        return this.form.controls['teamMembers'] as FormArray;
    }
    readonly members$: Observable<TeamMemberModel[]> = this._teamMemberService.getAll();

    readonly data$: Observable<TaskModel> = this._activatedRoute.params
        .pipe(switchMap((data) => this._taskService.getOne(data['id'])),
            take(1)
            , tap((data) => this.form.patchValue({name: data.name, categoryId : data.categoryId}))
        );
    subscription: Subscription | undefined;
    data: TeamMemberModel[] = [];
    readonly categories$: Observable<CategoryModel[]> = this._categoryService.getAll();

    constructor(private _categoryService: CategoryService, private _taskService: TaskService, private _activatedRoute: ActivatedRoute, private _router: Router,
                private _teamMemberService: TeamMemberService) {
        this.subscription = this.data$.subscribe()
         combineLatest([this.data$, this.members$]).pipe(take(1),
            map(([details, members]) => {
                    this.data = members;
                    members.forEach((member) => {
                        this.teamMembersArray.push(new FormControl(details.teamMemberIds ? details.teamMemberIds.some(e =>
                            {
                                return e === member.id
                            }
                        ) : false))
                    })
                }
            )
        ).subscribe()

    }

    onFormSubmitted(form: FormGroup): void {

        if (this.form.valid) {
            let teamMemberIds = this.data.filter((value, index) => form.value.teamMembers[index]).map(x => x.id)
            this._activatedRoute.params.pipe(
                take(1),
                switchMap((data) => this._taskService.edit({
                    name: form.value.name,
                    categoryId: form.value.categoryId,
                    teamMemberIds: teamMemberIds
                }, data['id']))).subscribe(() => this._router.navigate(['categories/' + this.form.value.categoryId]));
        }
    }
    onDestroy() {
        this.subscription?.unsubscribe();
    }
}
