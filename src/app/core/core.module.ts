import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticatedPageComponent } from '@app/core/components/authenticated-page/authenticated-page.component';
import { UsersModule } from '@app/users/users.module';
import { ConversationsModule } from '@app/conversations/conversations.module';
import { SharedModule } from '@app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { appRoutes } from '@app/configs/routes';
import { AuthenticationModule } from '@app/authentication/authentication.module';
import { HomePageComponent } from './components/home-page/home-page.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(
        appRoutes,
    ),
    UsersModule,
    ConversationsModule,
    AuthenticationModule,
    SharedModule,
  ],
  declarations: [
    AuthenticatedPageComponent,
    HomePageComponent,
  ],
})
export class CoreModule { }
