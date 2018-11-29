import { Routes } from '@angular/router';
import { NotFoundPageComponent } from '@app/core/components/not-found-page/not-found-page.component';
import { ContainerComponent } from '@app/conversations/components/container/container.component';
import { LoginPageComponent } from '@app/authentication/components/login-page/login-page.component';
import { AuthGuard } from '@app/guards/auth.guard';
import { AuthenticatedPageComponent } from '@app/core/components/authenticated-page/authenticated-page.component';
import { HomePageComponent } from '@app/core/components/home-page/home-page.component';
import { DirectorMessageEditorComponent } from '@app/backoffice/director-message-editor/director-message-editor.component';

export const appRoutes: Routes = [
  {
    path: 'auth',
    children: [
      { path: 'login', component: LoginPageComponent },
    ],
  },
  {
    path: 'app',
    component: AuthenticatedPageComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: HomePageComponent, outlet: 'authenticatedRouter' },
      { path: 'conversation/:id', component: ContainerComponent, outlet: 'authenticatedRouter' },
      { path: 'backoffice', component: DirectorMessageEditorComponent, outlet: 'authenticatedRouter' },
    ],
  },
  {
    path: '',
    redirectTo: '/app',
    pathMatch: 'full',
  },
  { path: '**', component: NotFoundPageComponent },
];
