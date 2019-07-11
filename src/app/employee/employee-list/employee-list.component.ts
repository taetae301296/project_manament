import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/_services/employee.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from 'src/app/_models/employee';
import { DepartmentService } from 'src/app/_services/department.service';
import { Department } from 'src/app/_models/department';
import { RoleService } from 'src/app/_services/roles.service';
import { Role } from 'src/app/_models/role';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss',]
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[];
  formGroup: FormGroup;
  employeeId: number;
  employeeRemove: Employee;

  departments: Department[];
  roles: Role[];
  role: number;

  message: string = '';


  constructor(
    private departmentService: DepartmentService,
    private employeeService: EmployeeService,
    private roleService: RoleService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.searchBox();
    this.getAllEmployees();
    this.getAllDepartment();
    this.getRole();
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
    const emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
    const phonePattern = /((09|03|07|08|05)+([0-9]{8})\b)/g;

    this.formGroup = this.fb.group({
      username: ['', [
        Validators.required,
        Validators.pattern(emailPattern)
      ]],
      password: ['', [
        Validators.required,
        Validators.maxLength(10)
      ]],
      firstName: ['', [
        Validators.required,
        Validators.maxLength(50)
      ]],
      lastName: ['', [
        Validators.required,
        Validators.maxLength(50)
      ]],
      email: ['', [
        Validators.required,
        Validators.pattern(emailPattern)
      ]],
      avatar: ['',],
      phone: ['', [
        Validators.required,
        Validators.pattern(phonePattern)
      ]],
      roleId: ['', [
        Validators.required
      ]],
      departmentId: ['', [
        Validators.required
      ]],
    });


    if (this.employeeId > 0) {
      this.employeeService.getIdEmployee(this.employeeId).subscribe(res => {
        this.getAllEmployees();
        if (res) {
          this.employees = res.employee;
          this.formGroup.setValue({
            username: this.employees[0].username,
            password: this.employees[0].password,
            firstName: this.employees[0].firstName,
            lastName: this.employees[0].lastName,
            email: this.employees[0].email,
            avatar: this.employees[0].avatar,
            phone: this.employees[0].phone,
            roleId: this.employees[0].roleId,
            departmentId: this.employees[0].departmentId
          })
        }
      });
    }
  }

  onSubmit() {
    if (this.employeeId == 0) {
      this.employeeService.postEmployee(this.formGroup.value).subscribe(
        res => {
          if (res) {
            this.message = res.message;

            if (this.message != '') {
              alert(this.message);
            }
            $('#addEmployee').modal('hide');
            this.getAllEmployees();
          }
        }, error => {
          if (error) {
            console.log(error);
            alert(error);
          } else {
            $('#addEmployee').modal('hide');
            this.router.navigateByUrl('/error-500');
          }
        });
    }
    else {
      this.employeeService.putIdEmployee(this.employeeId, this.formGroup.value).subscribe(res => {
        if (res) {
          if (res) {
            this.message = res.message;

            if (this.message != '') {
              alert(this.message);
              $('#addEmployee').modal('hide');
            }
            $('#addEmployee').modal('hide');
            this.getAllEmployees();
          }
        }
      }, error => {
        if (error) {
          console.log(error);
          alert(error);
        } else {
          $('#addEmployee').modal('hide');
          this.router.navigateByUrl('/error-500');
        }
      });
    }
  }

  getAllEmployees() {
    this.employeeService.getAllEmployees().subscribe(data => {
      this.employees = data.employee;
    }, error => {
      if (error) {
        console.log(error);
        alert(error);
      } else {
        this.router.navigateByUrl('/error-500');
      }
    });
  }

  deleteEmployee(id) {
    this.clickOutsideModal();
    this.employeeService.deleteIdEmployee(id).subscribe(res => {
      if (res) {
        this.message = res.message;
        if (this.message != '') {
          alert(this.message);
        }
        $('#deleteEmployee').modal('hide');
        this.getAllEmployees();
      }
    }, error => {
      if (error) {
        console.log(error);
        alert(error);
      } else {
        $('#deleteEmployee').modal('hide');
        this.router.navigateByUrl('/error-500');
      }
    });
  }

  delete(employee) {
    this.employeeRemove = employee;
  }

  getId(id) {
    this.clickOutsideModal();
    this.employeeService.getIdEmployee(id).subscribe(res => {
      this.employeeId = id;
      this.buildForm();
    })
  }

  getAllDepartment() {
    this.departmentService.getAllDepartments().subscribe(data => {
      if (data) {
        this.departments = data.department;
      }
    })
  }

  getRole() {
    this.roleService.getAllRole().subscribe(data => {
      if (data) {
        this.roles = data.role;
      }
    })
  }

  clickOutsideModal() {
    $('#addEmployee').modal({
      backdrop: 'static',
      keyboard: false  // to prevent closing with Esc button (if you want this too)
  })
  }
}
