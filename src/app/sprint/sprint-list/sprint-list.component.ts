import { Component, OnInit } from '@angular/core';
import { SprintService } from 'src/app/_services/sprint.service';
import { Sprint } from 'src/app/_models/sprint';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProjectService } from 'src/app/_services/project.service';
import { Project } from 'src/app/_models/project';
import { Task } from 'src/app/_models/task';
import { UserService } from 'src/app/_services/userService.service';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-sprint-list',
  templateUrl: './sprint-list.component.html',
  styleUrls: ['./sprint-list.component.css']
})
export class SprintListComponent implements OnInit {
  sprints: Sprint[];
  formGroup: FormGroup;
  sprintId: number;

  projects: Project[];
  sprintRemove: Project;

  tasks: Task[];
  role: number;
  isHideEdit: boolean;
  isHideDelete: boolean;

  message: string = '';

  constructor(
    private sprintService: SprintService,
    private projectService: ProjectService,
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.getUser();
    this.searchBox();
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

  buildForm() {
    this.formGroup = this.fb.group({
      sprintName: ['', [
        Validators.required,
        Validators.maxLength(100)
      ]],
      startDate: ['',],
      endDate: ['',],
      status: ['Opened', [
        Validators.required
      ]],
      projectId: ['', [
        Validators.required
      ]]
    });

    if (this.sprintId > 0) {
      this.sprintService.getSprintById(this.sprintId).subscribe(res => {
        this.getAllSprint();
        if (res) {
          this.sprints = res.sprint;
          this.formGroup.setValue({
            sprintName: this.sprints[0].sprintName,
            startDate: this.sprints[0].startDate,
            endDate: this.sprints[0].endDate,
            status: this.sprints[0].status,
            projectId: this.sprints[0].projectId
          })
        }
      });
    }
  }

  onSubmit() {
    if (this.sprintId == 0) {
      if (!this.formGroup.value.startDate) {
        delete this.formGroup.value.startDate;
      }

      if (!this.formGroup.value.endDate) {
        delete this.formGroup.value.endDate;
      }
      this.sprintService.postSprint(this.formGroup.value).subscribe(res => {
        if (res) {
          this.message = res.message;

          if(this.message != ''){
            alert(this.message);
          }
          $('#addSprint').modal('hide');
          this.getAllSprint();
        }
      }, error => {
        if (error) {
          console.log(error);
          alert(error);
        }
        $('#addSprint').modal('hide');
        this.router.navigateByUrl('/error-500');
      });
    }
    else {
      this.sprintService.putSprint(this.sprintId, this.formGroup.value).subscribe(res => {
        if (res) {
          this.message = res.message;

          if(this.message != ''){
            alert(this.message);
          }
          $('#addSprint').modal('hide');
          this.getAllSprint();
        }
      }, error => {
        if (error) {
          console.log(error);
          alert(error);
        } else{
          $('#addSprint').modal('hide');
          this.router.navigateByUrl('/error-500');
        }
      });
    }
  }

  getId(id) {
    this.clickOutsideModal();
    this.sprintService.getSprintById(id).subscribe(res => {
      if (res) {
        this.sprintId = id;
        this.buildForm();
      }
    }, error => {
      if (error) {
        console.log(error);
        alert(error);
      }
      this.router.navigateByUrl('/error-500');
    });
  }

  getAllSprint() {
    this.sprintService.getAllSprint().subscribe(data => {
      if (data) {
        this.sprints = data.sprint;
      }
    }, error => {
      if (error) {
        console.log(error);
        alert(error);
      }else{
        this.router.navigateByUrl('/error-500');
      }
    })
  }

  deleteSprint(id) {
    this.sprintService.deleteSprint(id).subscribe(res => {
      if (res) {
        this.message = res.message;

        if (this.message != ''){
          alert(this.message);
        }
        $('#deleteSprint').modal('hide');
        this.getAllSprint();
      }
    });
  }

  delete(sprint) {
    this.sprintRemove = sprint;
  }

  getAllProject() {
    this.projectService.getAllProjects().subscribe(data => {
      if (data) {
        this.projects = data.project;
      }
    })
  }

  getSprintById(id) {
    this.sprintService.getSprintById(id).subscribe(res => {
      if (res) {
        this.tasks = res.sprint[0].tasks;
      }
    })
  }

  getUser(){
    this.userService.getUser().subscribe(res =>{
      this.role = res.profile.role;

      if (this.role == 1){
        this.isHideEdit = this.isHideDelete = false;
      } else {
        this.isHideEdit = this.isHideDelete = true;
      }
    })
  }

  clickOutsideModal() {
    $('#addSprint').modal({
      backdrop: 'static',
      keyboard: false  // to prevent closing with Esc button (if you want this too)
  })
  }
}
