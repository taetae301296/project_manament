import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SprintListComponent } from './sprint-list/sprint-list.component';

const routes: Routes = [
    { path: '', component: SprintListComponent }
]

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class SprintRoutingModule { }