import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { UserService } from '../services/user.service';
import { ToastComponent } from '../../shared/toast/toast.component';

@Component({
  selector: 'app-users',
  template: `
    <div class="card" *ngIf="isLoading">
      <h4 class="card-header">Loading...</h4>
      <div class="card-block text-xs-center">
        <i class="fa fa-circle-o-notch fa-spin fa-3x"></i>
      </div>
    </div>

    <app-toast [message]="toast.message"></app-toast>

    <div class="card" *ngIf="!isLoading">
      <h4 class="card-header">Current Users ({{users.length}})</h4>
      <div class="card-block">
        <table class="table table-bordered table-striped">
          <thead class="thead-default">
          <tr>
            <th>Email/Username</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Role / Level</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody *ngIf="users.length === 0">
          <tr>
            <td colspan="6">There are no users in the DB. Add a new user below.</td>
          </tr>
          </tbody>
          <tbody *ngIf="!isEditing">
          <tr *ngFor="let user of users">
            <td>{{user.emailUsername}}</td>
            <td>{{user.firstName}}</td>
            <td>{{user.lastName}}</td>
            <td>{{user.roleLevel}}</td>
            <td>{{user.password}}</td>
            <td>
              <button class="btn btn-sm btn-warning" (click)="enableEditing(user)"><i class="fa fa-pencil"></i> Edit
              </button>
              <button class="btn btn-sm btn-danger" (click)="deleteUser(user)"><i class="fa fa-trash"></i> Delete
              </button>
            </td>
          </tr>
          </tbody>
          <tbody *ngIf="isEditing">
          <tr>
            <td colspan="6">
              <form class="form-inline text-center" [formGroup]="addUserForm"
                    (ngSubmit)="editUser(userRow)">
                <input class="form-control" type="text"
                       [(ngModel)]='userRow["emailUsername"]'
                       formControlName="emailUsername" placeholder="name" min="0">
                <input class="form-control" type="text" [(ngModel)]='userRow["firstName"]'
                       formControlName="firstName" placeholder="level" min="0">
                <input class="form-control" type="text" [(ngModel)]='userRow["lastName"]'
                       formControlName="lastName" placeholder="level" min="0">
                <input class="form-control" type="text" [(ngModel)]='userRow["roleLevel"]'
                       formControlName="roleLevel" placeholder="level" min="0">
                <input class="form-control" type="text" [(ngModel)]='userRow["password"]'
                       formControlName="password" placeholder="level" min="0">
                <button class="btn btn-sm btn-primary" type="submit" [disabled]="!addUserForm.valid"><i
                  class="fa fa-floppy-o"></i> Save
                </button>
              </form>
              {{userRow | json }}
              <button class="btn btn-sm btn-warning" (click)="cancelEditing()"><i class="fa fa-times"></i> Cancel</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="card" *ngIf="!isEditing">
      <h4 class="card-header">Add new user</h4>
      <div class="card-block">
        <form class="form-inline text-center" [formGroup]="addUserForm" (ngSubmit)="addUser()">
          <input class="form-control" type="text" formControlName="emailUsername" placeholder="Email/Username" min="0">
          <input class="form-control" type="text" formControlName="firstName" placeholder="First Name" min="0">
          <input class="form-control" type="text" formControlName="lastName" placeholder="Last Name" min="0">
          <input class="form-control" type="text" formControlName="roleLevel" placeholder="Role/Level" min="0">
          <input class="form-control" type="text" formControlName="password" placeholder="Password" min="0">
          <button class="btn btn-primary" type="submit" [disabled]="!addUserForm.valid"><i class="fa fa-floppy-o"></i>
            Add
          </button>
        </form>
        {{ addUserForm.value | json }}
      </div>
    </div>
  `,
  styles: []
})
export class UsersComponent implements OnInit {

  users = [];
  isLoading = true;
  userRow = {};
  isEditing = false;

  addUserForm: FormGroup;

  constructor(private _user: UserService,
              public toast: ToastComponent,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getUsers();

    this.addUserForm = this.formBuilder.group({
      emailUsername: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      roleLevel: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  getUsers() {
    this._user.getUsers().subscribe(
      data => this.users = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  addUser() {
    this._user.addUser(this.addUserForm.value).subscribe(
      res => {
        const newUser = res.json();
        this.users.push(newUser);
        this.addUserForm.reset();
        this.toast.setMessage('item added successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  enableEditing(user) {
    this.isEditing = true;
    this.userRow = user;
  }

  cancelEditing() {
    this.isEditing = false;
    this.userRow = {};
    this.toast.setMessage('item editing cancelled.', 'warning');
    // reload the users to reset the editing
    this.getUsers();
  }

  editUser(user) {
    this._user.editUser(user).subscribe(
      res => {
        this.isEditing = false;
        this.userRow = user;
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  deleteUser(user) {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this._user.deleteUser(user).subscribe(
        res => {
          const pos = this.users.map(elem => { return elem._id; }).indexOf(user._id);
          this.users.splice(pos, 1);
          this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error)
      );
    }
  }

}
