import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { SignupRequest } from "../../models/signup-request";

@Component({
  selector: "app-sign-form",
  templateUrl: "./sign-form.component.html",
  styleUrls: ["./sign-form.component.scss"],
})
export class SignFormComponent implements OnInit {
  @Output() sendSignForm = new EventEmitter<SignupRequest>();
  public form: FormGroup;
  private singupRequest: SignupRequest;

  constructor() {
    this.singupRequest = {
      email: "",
      username: "",
      password: "",
    };
  }

  public ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl("", [
        Validators.required,
        Validators.min(3),
        Validators.max(15),
      ]),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required]),
    });
  }

  public sign(): void {
    if (this.form.valid) {
      this.singupRequest.email = this.form.get("email").value;
      this.singupRequest.username = this.form.get("username").value;
      this.singupRequest.password = this.form.get("password").value;
      this.sendSignForm.emit(this.singupRequest);
    }
  }
}
