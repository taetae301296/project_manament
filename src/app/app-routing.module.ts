import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { AuthGuard } from './_guards/auth.guard';
import { SharedComponent } from './shared/shared.component';
import { ErrorPage2Component } from './error-page2/error-page2.component';

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path:'auth', loadChildren: './auth/auth.module#AuthModule' },
    { path: 'employees', component: SharedComponent, loadChildren: './employee/employee.module#EmployeeModule' },
    { path: 'departments',component: SharedComponent, loadChildren: './department/department.module#DepartmentModule'},
    { path: 'projects',component: SharedComponent, loadChildren: './project/project.module#ProjectModule' },
    { path: 'sprints',component: SharedComponent, loadChildren: './sprint/sprint.module#SprintModule' },
    { path: 'tasks',component: SharedComponent, loadChildren: './task/task.module#TaskModule' },
    { path: 'error-500',component: ErrorPage2Component },
    { path: '**', pathMatch: 'full', redirectTo:'/' }
] ;

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
export class AppRoutingModule { }