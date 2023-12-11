import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { HeaderComponent } from './header/header.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "../app-routing.module";

@NgModule({
  declarations: [
    HeaderComponent,
    PaginatorComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule
  ],
  exports: [
    HeaderComponent,
    PaginatorComponent
  ]
})
export class SharedModule {}
