import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployesService } from '../Service/employes.service';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  gender = [
    { name: 'Male', value: 'male' },
    { name: 'Female', value: 'female' },
  ];
  employee_Type = [
    { name: 'Manager', value: 'manager' },
    { name: 'Team Lead', value: 'team lead' },
    { name: 'Developer', value: 'developer' },
    { name: 'Tester', value: 'tester' },
    { name: 'Designer', value: 'designer' },
  ];
  employeData: FormGroup;
  responseMessage: string;
  submitted = false;
  isEdit: boolean;
  empId: string = null;
  actionBtn = 'Save';
  formTitle = 'Add Employee Details';

  constructor(
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private employes: FormBuilder,
    private route: Router,
    private activetedRoute: ActivatedRoute,
    private employe: EmployesService,
    public dialogRef: MatDialogRef<DialogComponent>
  ) {
    this.employeData = this.employes.group({
      code: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      dob: new FormControl('', [Validators.required]),
      emp_type: new FormControl('', [Validators.required]),
    });
  }

  get fn() {
    return this.employeData.controls;
  }

  ngOnInit(): void {
    // console.log(this.editData);
    if (this.editData) {
      (this.actionBtn = 'Update'), (this.formTitle = 'Update Employee Details');
      this.employeData.controls['code'].setValue(this.editData.code);
      this.employeData.controls['name'].setValue(this.editData.name);
      this.employeData.controls['email'].setValue(this.editData.email);
      this.employeData.controls['gender'].setValue(this.editData.gender);
      this.employeData.controls['dob'].setValue(this.editData.dob);
      this.employeData.controls['emp_type'].setValue(this.editData.emp_type);
    }
  }

  onSubmit() {
    if (!this.editData) {
      if (this.employeData.valid) {
        this.addEmployes();
      }
    } else {
      this.updateEmployes();
    }
  }

  addEmployes() {
    const data = this.employeData.value;
    this.employe.addEmp(data).subscribe({
      next: (res: any) => {
        console.log(res);
        alert('Data Added');
        this.employeData.reset();
        this.dialogRef.close('save');
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  updateEmployes() {
    this.employe.updateEmp(this.editData.id, this.employeData.value).subscribe({
      next: (res: any) => {
        console.log('Update', res);
        alert('Update Successfully');
        this.employeData.reset();
        this.dialogRef.close('update');
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
