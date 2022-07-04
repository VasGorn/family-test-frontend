import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";

import { SharedModule } from "../../shared/shared.module";
import { SuccessToastComponent } from "./components/success-toast/success-toast.component";
import { ErrorToastrComponent } from "./components/error-toastr/error-toastr.component";
import { InfoToastrComponent } from "./components/info-toastr/info-toastr.component";
import { NotificationService } from "./services/notification.service";

@NgModule({
  declarations: [
    SuccessToastComponent,
    ErrorToastrComponent,
    InfoToastrComponent,
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    SharedModule,
  ],
  providers: [NotificationService],
})
export class NotificationModule {}
