import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { AuthService } from "../../services";
import { routes } from "../../../../consts";
import { LoginRequest } from "../../models/login-request";
import { NotificationService } from "src/app/pages/notification/services/notification.service";
import { HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";
import { SignupRequest } from "../../models/signup-request";
import { ErrorResponse } from "src/app/shared/types/error-response.interface";

@Component({
  selector: "app-auth-page",
  templateUrl: "./auth-page.component.html",
  styleUrls: ["./auth-page.component.scss"],
})
export class AuthPageComponent {
  public todayDate: Date = new Date();
  public routers: typeof routes = routes;

  constructor(
    private service: AuthService,
    private router: Router,
    private notification: NotificationService
  ) {}

  public sendLoginForm(loginRequest: LoginRequest): void {
    this.service.login(loginRequest).subscribe({
      next: (isLogin: boolean) => {
        this.router.navigateByUrl(this.routers.PERSONS);
        this.notification.showSuccess("You are logged in");
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 403) {
          const authenticationErrorMessage: string = "Authentication error!";
          this.notification.showErrorToastr(authenticationErrorMessage);
          console.error(error);
          throwError(() => error.message);
        }
        this.handleApiError(error);
      },
    });
  }

  public sendSignForm(signupRequest: SignupRequest): void {
    console.log("request", signupRequest);

    this.service.signup(signupRequest).subscribe({
      next: (data: string) => {
        this.router.navigateByUrl(this.routers.LOGIN);
        this.notification.showInfoToastr(
          "You are registered! Please contact with admin " +
            "to activate account!"
        );
        console.log(data);
      },
      error: (error: HttpErrorResponse) => {
        this.handleApiError(error);
      },
    });
  }

  private handleApiError(httpError: HttpErrorResponse): void {
    const strApiError: string = httpError.error;
    const apiError: ErrorResponse = JSON.parse(strApiError);
    this.notification.showErrorToastr(apiError.message);
    console.error(apiError);
    throwError(() => apiError);
  }
}
