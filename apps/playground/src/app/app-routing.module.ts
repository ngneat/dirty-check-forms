import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormDirtyGuard } from './dirty-form.guard';
import { HomeComponent } from './home/home.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  {
    path: 'settings',
    component: SettingsComponent,
    canDeactivate: [FormDirtyGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
