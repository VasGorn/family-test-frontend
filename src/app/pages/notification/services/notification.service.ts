import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { ErrorToastrComponent } from "../components/error-toastr/error-toastr.component";
import { InfoToastrComponent } from "../components/info-toastr/info-toastr.component";
import { SuccessToastComponent } from "../components/success-toast/success-toast.component";

enum ToastPositionTypes {
  bottomCenter = "toast-bottom-center",
  bottomRight = "toast-bottom-right",
  bottomLeft = "toast-bottom-left",
  topCenter = "toast-top-center",
  topRight = "toast-top-right",
  topLeft = "toast-top-left",
}

@Injectable({
  providedIn: "root",
})
export class NotificationService {
  private toastrPositionTypes: typeof ToastPositionTypes = ToastPositionTypes;
  private toastrPosition: string = this.toastrPositionTypes.topRight;
  private timeOut: number = 3000;

  constructor(private toastr: ToastrService) {}

  public showSuccess(message: string): void {
    const toastr = this.toastr.show(message, null, {
      positionClass: this.toastrPosition,
      toastComponent: SuccessToastComponent,
      timeOut: this.timeOut,
      tapToDismiss: false,
    });
  }

  public showErrorToastr(message: string): void {
    this.toastr.show(message, null, {
      positionClass: this.toastrPosition,
      toastComponent: ErrorToastrComponent,
      timeOut: this.timeOut,
      tapToDismiss: false,
    });
  }

  public showInfoToastr(message: string): void {
    this.toastr.show(message, null, {
      positionClass: this.toastrPosition,
      toastComponent: InfoToastrComponent,
      timeOut: this.timeOut,
      tapToDismiss: false,
    });
  }
}
