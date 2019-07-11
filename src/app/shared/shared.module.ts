import { NgModule } from '@angular/core';
import { HeaderComponent } from '../template/header/header.component';
import { FooterComponent } from '../template/footer/footer.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedComponent } from './shared.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SharedComponent
  ],
  exports: [
      HeaderComponent,
      FooterComponent,
      SharedComponent
  ],
  imports: [
    RouterModule,
    CommonModule
  ]
})
export class SharedModule { }
