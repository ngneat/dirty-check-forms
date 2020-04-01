import { DirtyComponent } from '@ngneat/dirty-check-forms';
import { Observable, of } from 'rxjs';
import { DirtyCheckGuard } from '../dirty-check.guard';

class MockComponent implements DirtyComponent {
  isDirty$;
}

class MockGuard extends DirtyCheckGuard {
  confirm;

  confirmChanges(): Observable<boolean> | boolean {
    return this.confirm;
  }
}

const guard = new MockGuard();
const comp = new MockComponent();

describe('DirtyCheckGuard', () => {
  it('should confirm with boolean', () => {
    const spy = jest.fn();
    const spy2 = spyOn(guard, 'confirmChanges').and.callThrough();
    guard.confirm = true;
    comp.isDirty$ = () => true;
    guard.canDeactivate(comp, null, null).subscribe(spy);
    expect(spy2).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(true);
  });

  it('should confirm with observable', () => {
    const spy = jest.fn();
    const spy2 = spyOn(guard, 'confirmChanges').and.callThrough();
    guard.confirm = of(true);
    comp.isDirty$ = () => true;
    guard.canDeactivate(comp, null, null).subscribe(spy);
    expect(spy2).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(true);
  });
});
