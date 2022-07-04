import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatTabsModule } from "@angular/material/tabs";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { SharedModule } from "src/app/shared/shared.module";
import { AuthPageComponent } from "./containers/auth-page/auth-page.component";
import { YearPipe } from "./pipes/year.pipe";
import { LoginFormComponent } from "./components/login-form/login-form.component";
import { SignFormComponent } from "./components/sign-form/sign-form.component";
import { AuthRoutingModule } from "./auth-routing.module";
import { AuthService } from "./services/auth.service";
import { AuthGuard } from "./guards/auth.guard";
import { NotificationModule } from "../notification/notification.module";

@NgModule({
  declarations: [
    AuthPageComponent,
    YearPipe,
    LoginFormComponent,
    SignFormComponent,
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    AuthRoutingModule,
    NotificationModule,
  ],
  providers: [AuthService, AuthGuard],
})
export class AuthModule {}
