import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SprintListComponent } from './sprint-list/sprint-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SprintRoutingModule } from './sprint-routing.module';

@NgModule({
  declarations: [
    SprintListComponent
  ],
  imports: [
    CommonModule,
    SprintRoutingModule,
    ReactiveFormsModule
  ]
})
export class SprintModule { }
