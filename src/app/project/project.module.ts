import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectListComponent } from './project-list/project-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProjectRoutingModule } from './project-routing.module';

@NgModule({
  declarations: [
    ProjectListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProjectRoutingModule
  ]
})
export class ProjectModule { }
