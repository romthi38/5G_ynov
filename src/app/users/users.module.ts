import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { ListComponent } from '@app/users/components/list/list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ListFiltersComponent } from './components/list-filters/list-filters.component';
import { AngularMaterialModule } from '@app/angular-material.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  declarations: [
    ListComponent,
    ListFiltersComponent,
  ],
  exports: [
    ListComponent,
    ListFiltersComponent,
  ],
})
export class UsersModule { }
