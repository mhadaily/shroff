import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { RoleService } from '../services/role.service';
import { ToastComponent } from '../../shared/toast/toast.component';

@Component({
  selector: 'app-roles',
  template: `
    <div class="card" *ngIf="isLoading">
      <h4 class="card-header">Loading...</h4>
      <div class="card-block text-xs-center">
        <i class="fa fa-circle-o-notch fa-spin fa-3x"></i>
      </div>
    </div>

    <app-toast [message]="toast.message"></app-toast>

    <div class="card" *ngIf="!isLoading">
      <h4 class="card-header">Current Roles ({{roles.length}})</h4>
      <div class="card-block">
        <table class="table table-bordered table-striped">
          <thead class="thead-default">
          <tr>
            <th>Name</th>
            <th>Level</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody *ngIf="roles.length === 0">
          <tr>
            <td colspan="6">There are no roles in the DB. Add a new role below.</td>
          </tr>
          </tbody>
          <tbody *ngIf="!isEditing">
          <tr *ngFor="let role of roles">
            <td>{{role.name}}</td>
            <td>{{role.level}}</td>
            <td>
              <button class="btn btn-sm btn-warning" (click)="enableEditing(role)"><i class="fa fa-pencil"></i> Edit
              </button>
              <button class="btn btn-sm btn-danger" (click)="deleteRole(role)"><i class="fa fa-trash"></i> Delete
              </button>
            </td>
          </tr>
          </tbody>
          <tbody *ngIf="isEditing">
          <tr>
            <td colspan="6">
              <form class="form-inline text-center" enctype="multipart/form-data" [formGroup]="addRoleForm"
                    (ngSubmit)="editRole(roleRow)">
                <input class="form-control" type="text" [(ngModel)]='roleRow.name' formControlName="name" placeholder="name" min="0">
                <input class="form-control" type="text" [(ngModel)]='roleRow.level' formControlName="level" placeholder="level" min="0">
                <button class="btn btn-sm btn-primary" type="submit" [disabled]="!addRoleForm.valid"><i
                  class="fa fa-floppy-o"></i> Save
                </button>
              </form>
              {{roleRow | json }}
              <button class="btn btn-sm btn-warning" (click)="cancelEditing()"><i class="fa fa-times"></i> Cancel</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="card" *ngIf="!isEditing">
      <h4 class="card-header">Add new role</h4>
      <div class="card-block">
        <form class="form-inline text-center" [formGroup]="addRoleForm" (ngSubmit)="addRole()">
          <input class="form-control" type="text" formControlName="name" placeholder="name" min="0">
          <input class="form-control" type="text" formControlName="level" placeholder="code" min="0">
          <button class="btn btn-primary" type="submit" [disabled]="!addRoleForm.valid"><i class="fa fa-floppy-o"></i>
            Add
          </button>
        </form>
        {{ addRoleForm.value | json }}
      </div>
    </div>
  `,
  styles: []
})
export class RolesComponent implements OnInit {

  uploaded;
  roles = [];
  isLoading = true;
  roleRow = {};
  isEditing = false;

  addRoleForm: FormGroup;

  constructor(private _role: RoleService,
              public toast: ToastComponent,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getRoles();

    this.addRoleForm = this.formBuilder.group({
      name: ['', Validators.required],
      level: ['', Validators.required]
    });
  }

  getRoles() {
    this._role.getRoles().subscribe(
      data => this.roles = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  addRole() {
    this._role.addRole(this.addRoleForm.value).subscribe(
      res => {
        const newRole = res.json();
        this.roles.push(newRole);
        this.addRoleForm.reset();
        this.toast.setMessage('item added successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  enableEditing(role) {
    this.isEditing = true;
    this.roleRow = role;
  }

  cancelEditing() {
    this.isEditing = false;
    this.roleRow = {};
    this.toast.setMessage('item editing cancelled.', 'warning');
    // reload the roles to reset the editing
    this.getRoles();
  }

  editRole(role) {
    this._role.editRole(role).subscribe(
      res => {
        this.isEditing = false;
        this.roleRow = role;
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  deleteRole(role) {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this._role.deleteRole(role).subscribe(
        res => {
          const pos = this.roles.map(elem => { return elem._id; }).indexOf(role._id);
          this.roles.splice(pos, 1);
          this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error)
      );
    }
  }

}
