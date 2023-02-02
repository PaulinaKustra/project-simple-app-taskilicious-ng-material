export interface TaskCreateModel {
  readonly name: string;
  readonly categoryId: string;
  readonly teamMemberIds: string[];
  readonly imageUrl : string;
}
