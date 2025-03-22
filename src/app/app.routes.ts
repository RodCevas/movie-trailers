import { Routes } from '@angular/router';
import { HomeComponent } from './feature/home/home.component';
import { DetailComponent } from './shared/components/detail/detail.component';
import { LatestTrailersComponent } from './feature/latest-trailers/latest-trailers.component';
import { TrendingTrailersComponent } from './feature/trending-trailers/trending-trailers.component';
import { PageNotFoundComponent } from './feature/page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'latest', component: LatestTrailersComponent },
  { path: 'trending', component: TrendingTrailersComponent },
  {
    path: 'detail/:id',
    component: DetailComponent,
  },
  {path: '**', component: PageNotFoundComponent}
];
