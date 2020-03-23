import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { dirtyCheck } from '../dirty-check';

describe('dirtyCheck', () => {
  let result;
  const form = new FormGroup({
    name: new FormControl('ngneat'),
    id: new FormControl(1)
  });

  const store$ = new BehaviorSubject({
    name: 'ngneat',
    id: 1
  });

  dirtyCheck(form, store$, 0).subscribe(v => (result = v));

  it('no change - should not be dirty', () => {
    expect(result).toBeFalsy();
  });

  it('update store - should be dirty after change', () => {
    store$.next({ ...store$.getValue(), name: 'dirty-check' });
    expect(result).toBeTruthy();
  });
});
