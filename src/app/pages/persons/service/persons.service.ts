import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Person } from "../models/person";
import { environment as env } from "src/environments/environment";
import { Relatives } from "../models/relatives";
import { AgeFilter } from "../models/age-filter";

@Injectable({
  providedIn: "root",
})
export class PersonsService {
  constructor(private http: HttpClient) {}

  public getAll(): Observable<Person[]> {
    return this.http.get<Person[]>(`${env.BASE_URL}/person`);
  }

  public getPersonsFilteredByAge(ageFilter: AgeFilter): Observable<Person[]> {
    return this.http.get<Person[]>(
      `${env.BASE_URL}/person/filter/from/${ageFilter.ageFrom}/to/${ageFilter.ageTo}`
    );
  }

  public getRelatives(personId: number): Observable<Relatives> {
    return this.http.get<Relatives>(`${env.BASE_URL}/relatives/${personId}`);
  }

  public save(person: Person): Observable<Person> {
    return this.http.post<Person>(`${env.BASE_URL}/person`, person);
  }

  public update(person: Person): Observable<Person> {
    return this.http.put<Person>(`${env.BASE_URL}/person`, person);
  }

  public delete(id: number) {
    return this.http.delete(`${env.BASE_URL}/person/${id}`);
  }

  public addPersonAsParent(
    selectedPerson: Person,
    parent: Person
  ): Observable<Relatives> {
    return this.http.get<Relatives>(
      `${env.BASE_URL}/relatives/${selectedPerson.id}/parent/${parent.id}`
    );
  }
}
