import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';
import { TeamMemberModel } from '../../models/team-member.model';
import { CategoryModel } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';
import { TaskService } from '../../services/task.service';
import { TeamMemberService } from '../../services/team-member.service';
import { UploadcareService } from '../../services/uploadcare.service';

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
    imageUrl: new FormControl(),
    imageFile: new FormControl(),
    teamMembers: new FormArray([])
  });

  get teamMembersArray() {
    return this.form.controls['teamMembers'] as FormArray;
  }

  readonly teamMembers$: Observable<TeamMemberModel[]> = this._teamMemberService.getAll().pipe(switchMap(() =>
    this._teamMemberService.getAll()
  ),
    take(1),
    tap((members) => {

      members.forEach(() => {
        this.teamMembersArray.push(new FormControl(false))
      })
      this.data = members;
    })
  );
  readonly categories$: Observable<CategoryModel[]> = this._categoryService.getAll();
  data: TeamMemberModel[] = [];
  subscription: Subscription | undefined;


  constructor(
    private _categoryService: CategoryService,
    private _taskService: TaskService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _teamMemberService: TeamMemberService,
    private _uploadcareService: UploadcareService) {
    this.subscription = this.teamMembers$.subscribe();
    this._activatedRoute.params
      .pipe(take(1), tap((dataRoute) => {
        this.form.patchValue({ categoryId: dataRoute['categoryId'] })
      }
      )).subscribe();
  }


  onFormSubmitted(form: FormGroup): void {
    if (form.valid) {
      if (form.value.imageFile) {
        this._uploadcareService.upload(form.value.imageFile).then((result) => {
          this.form.patchValue({ imageUrl: result.cdnUrl })
          this.createTask(form);
        })
      } else {
        this.createTask(form);
      }
    }
  }

  createTask(form: FormGroup) {
    let teamMemberIds = this.data.filter((value, index) => form.value.teamMembers[index]).map(x => x.id)
    this._taskService.create({
      name: form.value.name,
      categoryId: form.value.categoryId,
      teamMemberIds: teamMemberIds,
      imageUrl: form.value.imageUrl
    }).subscribe(() => this._router.navigate(['categories/' + this.form.value.categoryId]));
  }

  public onFileSelected(event: any) {
    if (event && event.target && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.form.patchValue({ imageUrl: e.target.result, imageFile: file })
      };
      reader.readAsDataURL(file);
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
