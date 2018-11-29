import { NgModule } from '@angular/core';
import {
  MatButtonModule, MatDialogModule,
  MatDividerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatMenuModule, MatRippleModule,
  MatSelectModule, MatSidenavModule, MatSnackBarModule,
} from '@angular/material';
import { MatListModule } from '@angular/material/list';

const modules = [
  MatButtonModule,
  MatListModule,
  MatDividerModule,
  MatIconModule,
  MatSelectModule,
  MatFormFieldModule,
  MatInputModule,
  MatSnackBarModule,
  MatMenuModule,
  MatDialogModule,
  MatRippleModule,
  MatSidenavModule,
];

@NgModule({
  imports: [...modules],
  exports: [...modules],
  declarations: []
})
export class AngularMaterialModule { }
