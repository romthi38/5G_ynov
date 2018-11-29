import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectorMessageEditorComponent } from './director-message-editor.component';

describe('DirectorMessageEditorComponent', () => {
  let component: DirectorMessageEditorComponent;
  let fixture: ComponentFixture<DirectorMessageEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectorMessageEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectorMessageEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
