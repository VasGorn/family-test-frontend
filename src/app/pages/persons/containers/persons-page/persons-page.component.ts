import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { throwError } from "rxjs";

import { NotificationService } from "src/app/pages/notification/services/notification.service";
import { ErrorResponse } from "src/app/shared/types/error-response.interface";
import { AgeFilter } from "../../models/age-filter";
import { Gender } from "../../models/gender.enum";
import { Person } from "../../models/person";
import { Relatives } from "../../models/relatives";
import { PersonsService } from "../../service/persons.service";

@Component({
  selector: "app-persons-page",
  templateUrl: "./persons-page.component.html",
  styleUrls: ["./persons-page.component.scss"],
})
export class PersonsPageComponent implements OnInit {
  persons: Person[] = [];
  selectedPerson: Person;
  childrenOfSelectedPerson: Person[] = [];
  parentsOfSelectedPerson: Person[] = [];

  constructor(
    private personService: PersonsService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.personService.getAll().subscribe({
      next: (persons: Person[]) => {
        this.persons = persons;
        console.log(persons);
      },
      error: (error: HttpErrorResponse) => {
        this.handleApiError(error);
      },
    });
  }

  public savePerson(person: Person) {
    this.personService.save(person).subscribe({
      next: (person: Person) => {
        this.persons = [...this.persons, person];
        console.log(person);
      },
      error: (error: HttpErrorResponse) => {
        this.handleApiError(error);
      },
    });
  }

  public updatePerson(person: Person) {
    this.personService.update(person).subscribe({
      next: (person: Person) => {
        this.persons = this.persons.filter((personInArray: Person) => {
          return personInArray.id !== person.id;
        });
        this.persons.push(person);
        //TODO update in children and parents
        console.log(person);
      },
      error: (error: HttpErrorResponse) => {
        this.handleApiError(error);
      },
    });
  }

  public selectPerson(person: Person) {
    this.selectedPerson = person;

    this.personService.getRelatives(person.id).subscribe({
      next: (relatives: Relatives) => {
        this.parentsOfSelectedPerson = relatives.parents;
        this.childrenOfSelectedPerson = relatives.children;
        console.log(relatives);
      },
      error: (error: HttpErrorResponse) => {
        this.handleApiError(error);
      },
    });
  }

  public deletePerson(person: Person) {
    const id = person.id;
    this.personService.delete(id).subscribe({
      next: () => {
        this.persons = this.persons.filter((person: Person) => {
          return id !== person.id;
        });
        this.parentsOfSelectedPerson = this.parentsOfSelectedPerson.filter(
          (person: Person) => {
            return id !== person.id;
          }
        );
        this.childrenOfSelectedPerson = this.childrenOfSelectedPerson.filter(
          (person: Person) => {
            return id !== person.id;
          }
        );
      },
      error: (error: HttpErrorResponse) => {
        this.handleApiError(error);
      },
    });
  }

  public addPersonAsParent(parent: Person) {
    console.log(parent);
    this.personService
      .addPersonAsParent(this.selectedPerson, parent)
      .subscribe({
        next: (relatives: Relatives) => {
          this.parentsOfSelectedPerson = relatives.parents;
          this.childrenOfSelectedPerson = relatives.children;
          console.log(relatives);
        },
        error: (error: HttpErrorResponse) => {
          this.handleApiError(error);
        },
      });
  }

  public filterPersonsByAge(ageFilter: AgeFilter) {
    this.personService.getPersonsFilteredByAge(ageFilter).subscribe({
      next: (persons: Person[]) => {
        this.persons = persons;
        console.log(persons);
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
