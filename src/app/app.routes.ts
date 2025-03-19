import { Routes } from '@angular/router';
import { HomeComponent } from './feature/home/home.component';
import { DetailComponent } from './shared/components/detail/detail.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'detail/:id',
    component: DetailComponent,
  },
];
