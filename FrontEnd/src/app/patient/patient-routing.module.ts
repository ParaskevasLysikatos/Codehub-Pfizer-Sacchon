import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { InsertDataComponent } from "./insert-data/insert-data.component";
import { ListDataComponent } from "./list-data/list-data.component";
import { ChartsDataComponent } from "./charts-data/charts-data.component";

const routes: Routes =
[
{path: 'insertdata',  component: InsertDataComponent},
 {path: 'listdata',  component: ListDataComponent},
// {path: 'averagedata',  component: AverageDataComponent},
 {path: 'chartsdata',  component: ChartsDataComponent},
// {path: 'updateaccount',  component: UpdateComponent},
// {path: 'patientconsultation',  component: PatientConsultationComponent},
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
