import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatTableModule } from "@angular/material/table";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatOptionModule } from "@angular/material/core";
import { MatSelectModule } from "@angular/material/select";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatRadioModule } from "@angular/material/radio";
import { MatNativeDateModule } from "@angular/material/core";

import { SharedModule } from "src/app/shared/shared.module";
import { NotificationModule } from "../notification/notification.module";
import { PersonFormComponent } from "./components/person-form/person-form.component";
import { PersonTableComponent } from "./components/person-table/person-table.component";
import { PersonsPageComponent } from "./containers/persons-page/persons-page.component";
import { PersonsRoutingModule } from "./persons-routing.module";
import { PersonChildrenComponent } from "./components/person-children/person-children.component";
import { PersonParentsComponent } from './components/person-parents/person-parents.component';

@NgModule({
  declarations: [
    PersonFormComponent,
    PersonTableComponent,
    PersonsPageComponent,
    PersonChildrenComponent,
    PersonParentsComponent,
  ],
  imports: [
    CommonModule,
    PersonsRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NotificationModule,
    MatMenuModule,
    MatTableModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatSortModule,
    MatGridListModule,
    MatSelectModule,
    MatOptionModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
})
export class PersonsModule {}
