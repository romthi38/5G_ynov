import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectorMessageEditorComponent } from './director-message-editor/director-message-editor.component';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  declarations: [DirectorMessageEditorComponent]
})
export class BackofficeModule { }
