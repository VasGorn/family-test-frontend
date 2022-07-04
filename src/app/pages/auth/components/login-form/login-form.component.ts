import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { LoginRequest } from "../../models/login-request";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.scss"],
})
export class LoginFormComponent implements OnInit {
  @Output() sendLoginForm: EventEmitter<LoginRequest> = new EventEmitter();
  public loginForm: FormGroup;
  public loginRequest: LoginRequest;
  public defaultUsername = "user";
  public defaultPassword = "1111";

  public ngOnInit(): void {
    this.loginRequest = {
      username: "",
      password: "",
    };

    this.loginForm = new FormGroup({
      username: new FormControl(this.defaultUsername, [
        Validators.required,
        Validators.min(3),
        Validators.max(15),
      ]),
      password: new FormControl(this.defaultPassword, [Validators.required]),
    });
  }

  public login(): void {
    if (this.loginForm.valid) {
      this.loginRequest.username = this.loginForm.get("username").value;
      this.loginRequest.password = this.loginForm.get("password").value;
      this.sendLoginForm.emit(this.loginRequest);
    }
  }
}
