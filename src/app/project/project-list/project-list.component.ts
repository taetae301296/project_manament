import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/_services/project.service';
import { Project } from 'src/app/_models/project';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DepartmentService } from 'src/app/_services/department.service';
import { Department } from 'src/app/_models/department';
import { Employee } from 'src/app/_models/employee';
import { Sprint } from 'src/app/_models/sprint';
import { Task } from 'src/app/_models/task';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  projects: Project[];
  formGroup: FormGroup;
  projectId: number;

  departments: Department[];
  projectRemove: Project;

  sprints: Sprint[];
  tasks: Task[];
  employees: Employee[];

  message: string = '';

  constructor(
    private projectService: ProjectService,
    private departmentService: DepartmentService,
    private router: Router, 
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.searchBox();
    this.getAllProject();
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
      projectCode: ['', [
        Validators.required,
        Validators.pattern(stringPattern),
        Validators.maxLength(50)
      ]],
      projectName: ['', [
        Validators.required,
        Validators.maxLength(100)
      ]],
      startDate: ['',],
      endDate: ['',],
      status: ['Opened', [
        Validators.required
      ]],
      departmentId: ['', [
        Validators.required
      ]],
    });

    if (this.projectId > 0) {
      this.projectService.getProjectById(this.projectId).subscribe(res => {
        this.getAllProject();
        if (res) {
          this.projects = res.project;
          this.formGroup.setValue({
            projectCode: this.projects[0].projectCode,
            projectName: this.projects[0].projectName,
            startDate: this.projects[0].startDate,
            endDate: this.projects[0].endDate,
            status: this.projects[0].status,
            departmentId: this.projects[0].departmentId
          })
        }
      });
    }
  }

  onSubmit() {
    if (this.projectId == 0) {
      if (!this.formGroup.value.startDate) {
        delete this.formGroup.value.startDate;
      }

      if (!this.formGroup.value.endDate) {
        delete this.formGroup.value.endDate;
      }
      this.projectService.postProject(this.formGroup.value).subscribe(res => {
        if (res) {
          this.message = res.message;

          if (this.message != ''){
            alert(this.message);
          }
          $('#addProject').modal('hide');
          this.getAllProject();
        }
      }, error => {
        if (error) {
          console.log(error);
          alert(error);
        }else{
          $('#addProject').modal('hide');
          this.router.navigateByUrl('/error-500');
        }
      });
    }
    else {
      this.projectService.putProject(this.projectId, this.formGroup.value).subscribe(res => {
        if (res) {
          this.message = res.message;

          if (this.message != ''){
            alert(this.message)
          }
          $('#addProject').modal('hide');
          this.getAllProject();
        }
      }, error => {
        if (error) {
          console.log(error);
          alert(error);
        }else{
          $('#addProject').modal('hide');
          this.router.navigateByUrl('/error-500');
        }
      });
    }
  }

  getId(id) {
    this.clickOutsideModal();
    this.projectService.getProjectById(id).subscribe(res => {
      if (res) {
        this.projectId = id;
        this.buildForm();
      }
    })
  }

  getAllProject() {
    this.projectService.getAllProjects().subscribe(data => {
      if (data) {
        this.projects = data.project;
      }
    }, error => {
      if (error) {
        console.log(error);
        alert(error);
      } else{
        this.router.navigateByUrl('/error-500');
      }
    })
  }

  deleteProject(id) {
    this.projectService.deleteProjectById(id).subscribe(res => {
      if (res) {
        this.message = res.message;

        if (this.message != ''){
          alert(this.message);
        }
        $('#deleteProject').modal('hide');
        this.getAllProject();
      }
    });
  }

  delete(project) {
    this.projectRemove = project;
  }

  getAllDepartment() {
    this.departmentService.getAllDepartments().subscribe(data => {
      if (data) {
        this.departments = data.department;
      }
    })
  }

  getProjectById(id) {
    this.projectService.getProjectById(id).subscribe(res => {
      if (res) {
          this.sprints = res.project[0].sprints;
          this.tasks = res.project[0].tasks;
          this.employees = res.project[0].employees;
      }
    })
  }

  clickOutsideModal() {
    $('#addProject').modal({
      backdrop: 'static',
      keyboard: false  // to prevent closing with Esc button (if you want this too)
  })
  }
}
