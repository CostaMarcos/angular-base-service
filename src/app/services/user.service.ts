import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { User } from '../models/Users.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService<User> {

  constructor(override http: HttpClient) { 
    super(http, "users/");
  }
}
