import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DepartmentService } from 'src/app/_services/department.service';
import { Department } from 'src/app/_models/department';
import { Employee } from 'src/app/_models/employee';
import { Project } from 'src/app/_models/project';
import { Router } from '@angular/router';
declare var $: any;
declare var swal: any;

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css',]
})


export class DepartmentListComponent implements OnInit {
  departments: Department[];
  formGroup: FormGroup;
  departmentId: number;
  departmentRemove: Department;

  employees: Employee[];
  projects: Project[];

  message: string = '';

  constructor(
    private departmentService: DepartmentService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.searchBox();
    this.getAllDepartment();
  }

  searchBox() {
    $(document).ready(function () {
      $("#myInput").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#myTable tr").filter(function () {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });
    });
  }

  buildForm() {
    const stringPattern = '^[a-zA-Z0-9]*$'; 

    this.formGroup = this.fb.group({
      departmentCode: ['', [
        Validators.required,
        Validators.pattern(stringPattern),
        // Validators.maxLength(50)
      ]],
      departmentName: ['', [
        Validators.required,
        Validators.maxLength(100)
      ]],
    });

    if (this.departmentId > 0) {
      this.departmentService.getDepartmentById(this.departmentId).subscribe(res => {
        this.getAllDepartment();
        if (res) {
          this.departments = res.department;
          this.formGroup.setValue({
            departmentCode: this.departments[0].departmentCode,
            departmentName: this.departments[0].departmentName
          })
        }
      });
    }
  }

  onSubmit() {
    if (this.departmentId == 0) {
      this.departmentService.postDepartment(this.formGroup.value).subscribe(res => {
        if (res) {
          this.message = res.message;

          if(this.message != ''){
            alert(this.message);
          }
          $('#addDepartment').modal('hide');
          this.getAllDepartment();
        }
      }, error => {
        if (error) {
          console.log(error);
          alert(error);
        } else{
          $('#addDepartment').modal('hide');
          this.router.navigateByUrl('/error-500');
        }
      });
    }
    else {
      this.departmentService.putIdDepartment(this.departmentId, this.formGroup.value).subscribe(res => {
        if (res) {
          this.message = res.message;

          if (this.message != ''){
            alert(this.message);
          }
          $('#addDepartment').modal('hide');
          this.getAllDepartment();
        }
      }, error => {
        if (error) {
          console.log(error);
          alert(error);
        }else{
          $('#addDepartment').modal('hide');
          this.router.navigateByUrl('/error-500');
        }
      });
    }
  }

  getAllDepartment() {
    this.departmentService.getAllDepartments().subscribe(data => {
      if (data) {
        this.departments = data.department;
      }
    }, error => {
      if (error) {
        console.log(error);
        alert(error);
      } else{
        this.router.navigateByUrl('/error-500');
      }
    });
  }

  deleteDepartment(id) {
    this.departmentService.deleteDepartment(id).subscribe(res => {
      if (res) {
        this.message = res.message;

        if (this.message != ''){
          alert(this.message);
        }
        $('#deleteDepartment').modal('hide');
        this.getAllDepartment();
      }
    });
  }

  getId(id) {
    this.clickOutsideModal();
    this.departmentService.getDepartmentById(id).subscribe(res => {
        this.departmentId = id;
        this.buildForm();
    })
  }

  delete(department) {
    this.departmentRemove = department;
  }

  getDepartmentById(id) {
    this.departmentService.getDepartmentById(id).subscribe(res => {
      if (res) {
        this.employees = res.department[0].employees;
        this.projects = res.department[0].projects;
      }
    })
  }

  clickOutsideModal() {
    $('#addDepartment').modal({
      backdrop: 'static',
      keyboard: false  // to prevent closing with Esc button (if you want this too)
  })
  }
}
