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
import { MatSelectChange } from "@angular/material/select";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Person } from "../../models/person";

@Component({
  selector: "app-person-parents",
  templateUrl: "./person-parents.component.html",
  styleUrls: ["./person-parents.component.css"],
})
export class PersonParentsComponent implements OnChanges, OnInit {
  displayedColumns: string[] = ["name", "birthday", "gender"];
  dataSource: MatTableDataSource<Person>;
  @Input() parents: Person[] = [];
  @Input() persons: Person[] = [];

  @Output() addPersonAsParentEvent = new EventEmitter<Person>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  selectedParent: Person;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource = new MatTableDataSource<Person>(this.parents);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public onChange($event: MatSelectChange): void {
    let filterValue: string = "";
    if ($event.value === "father") {
      filterValue = "MALE";
    } else {
      filterValue = "FEMALE";
    }

    this.dataSource.filterPredicate = (data: Person, filter: string) => {
      return data.gender.toString() === filter;
    };

    this.dataSource.filter = filterValue;
  }

  public selectParentOnChange($event: MatSelectChange): void {
    this.selectedParent = $event.value;
  }

  public addPersonAsParent(): void {
    this.addPersonAsParentEvent.emit(this.selectedParent);
  }
}
