import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LogoutButtonComponent } from './components/logout-button/logout-button.component';
import { SharedModule } from '@app/shared/shared.module';
import { HeartbeatComponent } from './components/heartbeat/heartbeat.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  declarations: [
    LoginPageComponent,
    LogoutButtonComponent,
    HeartbeatComponent,
  ],
  exports: [
    LogoutButtonComponent,
    HeartbeatComponent,
  ],
})
export class AuthenticationModule { }
