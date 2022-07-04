import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PersonsPageComponent } from "./containers/persons-page/persons-page.component";

const routes: Routes = [
  {
    path: "",
    component: PersonsPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonsRoutingModule {}
