import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/_services/task.service';
import { Task } from 'src/app/_models/task';
import { EmployeeService } from 'src/app/_services/employee.service';
import { Employee } from 'src/app/_models/employee';
import { SprintService } from 'src/app/_services/sprint.service';
import { Sprint } from 'src/app/_models/sprint';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from 'src/app/_services/project.service';
import { Project } from 'src/app/_models/project';
import { UserService } from 'src/app/_services/userService.service';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[];
  taskId: number;
  formGroup: FormGroup;
  taskRemove: Task;

  employees: Employee[];
  sprints: Sprint[];
  projects: Project[];
  role: number;

  isHideDelete: boolean;
  isHideEdit: boolean;

  message: string = '';

  constructor(
    private taskService: TaskService,
    private employeeService: EmployeeService,
    private sprintService: SprintService,
    private projectService: ProjectService,
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.getUser();
    this.searchBox();
    this.getAllTask();
    this.getAllEmployees();
    this.getAllSprint();
    this.getAllProject();
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

  getAllTask() {
    this.taskService.getAllTask().subscribe(data => {
      if (data) {
        this.tasks = data.task;
      }
    }, error => {
      if (error) {
        console.log(error);
      } else {
        this.router.navigateByUrl('/error-500');
      }
    })
  }

  buildForm() {
    this.formGroup = this.fb.group({
      taskName: ['', [
        Validators.required
      ]],
      estimateTime: ['',],
      startDate: ['',],
      endDate: ['',],
      status: ['Opened', [
        Validators.required
      ]],
      projectId: ['', [
        Validators.required
      ]],
      employeeId: ['', [
        Validators.required
      ]],
      sprintId: ['', [
        Validators.required
      ]]
    });


    if (this.taskId > 0) {
      this.taskService.getTaskById(this.taskId).subscribe(res => {
        this.getAllTask();
        if (res) {
          this.tasks = res.task;
          this.formGroup.setValue({
            taskName: this.tasks[0].taskName,
            estimateTime: this.tasks[0].estimateTime,
            startDate: this.tasks[0].startDate,
            endDate: this.tasks[0].endDate,
            status: this.tasks[0].status,
            projectId: this.tasks[0].projectId,
            employeeId: this.tasks[0].employeeId,
            sprintId: this.tasks[0].sprintId
          })
        }
      });
    }
  }

  onSubmit() {
    if (this.taskId == 0) {
      if (!this.formGroup.value.estimateTime) {
        delete this.formGroup.value.estimateTime;
      }

      if (!this.formGroup.value.startDate) {
        delete this.formGroup.value.startDate;
      }

      if (!this.formGroup.value.endDate) {
        delete this.formGroup.value.endDate;
      }

      this.taskService.postTask(this.formGroup.value).subscribe(res => {
        if (res) {
          this.message = res.message;

          if (this.message != '') {
            alert(this.message);
          }
          $('#addTask').modal('hide');
          this.getAllTask();
        }
      }, error => {
        if (error) {
          console.log(error);
        } else {
          $('#addTask').modal('hide');
          this.router.navigateByUrl('/error-500');
        }
      });
    }
    else {
      this.taskService.putTask(this.taskId, this.formGroup.value).subscribe(res => {
        if (res) {
          this.message = res.message;

          if (this.message != '') {
            alert(this.message);
          }
          $('#addTask').modal('hide');
          this.getAllTask();
        }
      }, error => {
        if (error) {
          console.log(error);
          alert(error);
        } else {
          $('#addTask').modal('hide');
          this.router.navigateByUrl('/error-500');
        }
      });
    }
  }

  getId(id) {
    this.clickOutsideModal();
    this.taskService.getTaskById(id).subscribe(res => {
      if (res) {
        this.taskId = id;
        this.buildForm();
      }
    }, error => {
      if (error) {
        console.log(error);
        alert(error);
      } else {
        this.router.navigateByUrl('/error-500');
      }
    });
  }

  deleteTask(id) {
    this.taskService.deleteTask(id).subscribe(res => {
      if (res) {
        this.message = res.message;

        if (this.message != '') {
          alert(this.message);
        }
        $('#deleteTask').modal('hide');
        this.getAllTask();
      }
    }, error => {
      if (error) {
        console.log(error);
        alert(error);
      } else {
        this.router.navigateByUrl('/error-500');
      }
    });
  }

  delete(task) {
    this.taskRemove = task;
  }

  getAllEmployees() {
    this.employeeService.getAllEmployees().subscribe(data => {
      if (data) {
        this.employees = data.employee;
      }
    });
  }

  getAllSprint() {
    this.sprintService.getAllSprint().subscribe(data => {
      if (data) {
        this.sprints = data.sprint;
      }
    })
  }

  getAllProject() {
    this.projectService.getAllProjects().subscribe(data => {
      if (data) {
        this.projects = data.project;
      }
    })
  }

  getUser() {
    this.userService.getUser().subscribe(res => {
      this.role = res.profile.role;

      if (this.role == 1) {
        this.isHideEdit = this.isHideDelete = false;
      } else {
        this.isHideEdit = this.isHideDelete = true;
      }
    })
  }

  clickOutsideModal() {
    $('#addTask').modal({
      backdrop: 'static',
      keyboard: false  // to prevent closing with Esc button (if you want this too)
  })
  }
}
