import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core";
import { Router } from "@angular/router";

import { AuthService } from "../../../../pages/auth/services";
import { routes } from "../../../../consts";
import { HttpErrorResponse } from "@angular/common/http";
import { Subscription, throwError } from "rxjs";
import { NotificationService } from "src/app/pages/notification/services/notification.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() isMenuOpened: boolean;
  @Output() isShowSidebar = new EventEmitter<boolean>();
  public routers: typeof routes = routes;
  public clicked: boolean = false;

  constructor(
    private authService: AuthService,
    private notification: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  public openMenu(): void {
    this.isMenuOpened = !this.isMenuOpened;
    this.isShowSidebar.emit(this.isMenuOpened);
  }

  public logout(): void {
    this.authService.logout().subscribe({
      next: (data: string) => {
        this.notification.showInfoToastr(data);
        console.log(data);
        this.router.navigateByUrl(this.routers.LOGIN);
      },
      error: (error: HttpErrorResponse) => {
        this.notification.showErrorToastr(error.message);
        throwError(() => console.log(error.message));
      },
    });
  }
}
