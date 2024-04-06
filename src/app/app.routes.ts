import { Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { NotFoundComponent } from './fallback-pages/not-found/not-found.component';
import { ForbiddenComponent } from './fallback-pages/forbidden/forbidden.component';

export const routes: Routes = [
  { path: '', component: UsersComponent, pathMatch: 'full' },
  { path: '403', component: ForbiddenComponent },
  { path: '**', component: NotFoundComponent },
];
