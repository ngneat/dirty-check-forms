import { async, TestBed } from '@angular/core/testing';
import { DirtyCheckFormsModule } from './dirty-check-forms.module';

describe('DirtyCheckFormsModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DirtyCheckFormsModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(DirtyCheckFormsModule).toBeDefined();
  });
});
