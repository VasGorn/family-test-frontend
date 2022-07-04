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
  selector: "app-person-children",
  templateUrl: "./person-children.component.html",
  styleUrls: ["./person-children.component.css"],
})
export class PersonChildrenComponent implements OnChanges, OnInit {
  displayedColumns: string[] = ["name", "birthday", "gender"];
  dataSource: MatTableDataSource<Person>;
  @Input() children: Person[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource = new MatTableDataSource<Person>(this.children);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {}

  public onChange($event: MatSelectChange): void {
    let filterValue: string = "";
    if ($event.value === "son") {
      filterValue = "MALE";
    } else {
      filterValue = "FEMALE";
    }

    this.dataSource.filterPredicate = (data: Person, filter: string) => {
      return data.gender.toString() === filter;
    };

    this.dataSource.filter = filterValue;
  }
}
