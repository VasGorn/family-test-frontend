import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "src/app/pages/auth/services";
import { Gender } from "../../models/gender.enum";
import { Person } from "../../models/person";

@Component({
  selector: "app-person-form",
  templateUrl: "./person-form.component.html",
  styleUrls: ["./person-form.component.scss"],
  providers: [AuthService],
})
export class PersonFormComponent implements OnChanges, OnInit {
  breakpointColumn: number = 1;
  public form: FormGroup;
  @Input() person: Person;
  @Output() savePersonEvent = new EventEmitter<Person>();
  @Output() updatePersonEvent = new EventEmitter<Person>();

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.person) {
      this.form.patchValue({
        name: this.person.name,
        birthday: this.person.birthday,
        gender: this.person.gender,
      });
    }
  }

  ngOnInit(): void {
    this.breakpointColumn = window.innerWidth <= 700 ? 1 : 2;
    this.form = new FormGroup({
      name: new FormControl("", Validators.required),
      birthday: new FormControl("01/01/2000"),
      gender: new FormControl("MALE", [Validators.required]),
    });
  }

  onResize(event) {
    this.breakpointColumn = event.target.innerWidth <= 700 ? 1 : 2;
  }

  savePerson() {
    if (this.form.valid) {
      const personToSave: Person = {
        ...this.form.value,
      };
      this.savePersonEvent.emit(personToSave);
      console.log(personToSave);
    }
  }

  public updateBtnClick(): void {
    if (this.form.valid) {
      const personToUpdate: Person = {
        id: this.person.id,
        ...this.form.value,
      };
      this.updatePersonEvent.emit(personToUpdate);
    }
  }
}
