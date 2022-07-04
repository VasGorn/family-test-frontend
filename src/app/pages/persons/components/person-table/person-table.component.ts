import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { AgeFilter } from "../../models/age-filter";
import { Person } from "../../models/person";

@Component({
  selector: "app-person-table",
  templateUrl: "./person-table.component.html",
  styleUrls: ["./person-table.component.css"],
})
export class PersonTableComponent implements OnChanges, OnInit {
  displayedColumns: string[] = [
    "name",
    "birthday",
    "gender",
    "select",
    "delete",
  ];
  dataSource: MatTableDataSource<Person>;
  @Input() persons: Person[] = [];
  @Output() selectPersonEvent = new EventEmitter<Person>();
  @Output() deletePersonEvent = new EventEmitter<Person>();
  @Output() filterPersonsByAgeEvent = new EventEmitter<AgeFilter>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public ageFrom: number;
  public ageTo: number;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.persons.length > 0) {
      this.dataSource = new MatTableDataSource<Person>(this.persons);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  ngOnInit(): void {}

  filterPersonsByAge() {
    const ageFilter: AgeFilter = {
      ageFrom: this.ageFrom,
      ageTo: this.ageTo,
    };
    this.filterPersonsByAgeEvent.emit(ageFilter);
  }

  selectPerson(person: Person) {
    this.selectPersonEvent.emit(person);
  }

  deletePerson(person: Person) {
    this.deletePersonEvent.emit(person);
  }
}
