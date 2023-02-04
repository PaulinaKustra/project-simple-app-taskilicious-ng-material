import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";
import {TeamMemberModel} from "../models/team-member.model";

@Injectable()
export class TeamMemberService {

    getAll(): Observable<TeamMemberModel[]> {
        return this._httpClient.get<TeamMemberModel[]>('https://63761992b5f0e1eb850298da.mockapi.io/team-members');
    }
  constructor(private _httpClient: HttpClient) {
  }
}
