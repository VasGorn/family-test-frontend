import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { AuthGuard } from "./pages/auth/guards/auth.guard";
import { NotFoundComponent } from "./pages/not-found/not-found.component";
import { PersonsPageComponent } from "./pages/persons/containers/persons-page/persons-page.component";

const routes: Routes = [
  {
    path: "login",
    loadChildren: () =>
      import("./pages/auth/auth.module").then((m) => m.AuthModule),
  },
  {
    path: "",
    pathMatch: "full",
    redirectTo: "persons",
  },
  {
    path: "404",
    component: NotFoundComponent,
  },
  {
    path: "persons",
    pathMatch: "full",
    canActivate: [AuthGuard],
    component: PersonsPageComponent,
    loadChildren: () =>
      import("./pages/persons/persons.module").then((m) => m.PersonsModule),
  },
  {
    path: "**",
    redirectTo: "404",
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      preloadingStrategy: PreloadAllModules,
      relativeLinkResolution: "legacy",
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
