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

  dirtyCheck(form, store$, { debounce: 0 }).subscribe(v => (result = v));

  it('no change - should not be dirty', () => {
    expect(result).toBeFalsy();
  });

  it('update store - should be dirty after change', () => {
    jest.useFakeTimers();
    form.patchValue({ name: 'new name' });
    jest.runAllTimers();
    expect(result).toBeTruthy();
  });
});
