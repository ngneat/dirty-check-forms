import { AbstractControl, FormArray, FormGroup } from '@angular/forms';
import {
  combineLatest,
  defer,
  fromEvent,
  merge,
  Observable,
  of,
  Subscription,
} from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  finalize,
  map,
  shareReplay,
  startWith,
  withLatestFrom,
} from 'rxjs/operators';
import { equal as isEqual } from './is-equal';

interface DirtyCheckConfig {
  debounce?: number;
  withDisabled?: boolean;
}

function mergeConfig(config: DirtyCheckConfig): DirtyCheckConfig {
  return {
    debounce: 300,
    withDisabled: true,
    ...config,
  };
}

function getControlValue(control: AbstractControl, withDisabled: boolean) {
  if (
    withDisabled &&
    (control instanceof FormGroup || control instanceof FormArray)
  ) {
    return control.getRawValue();
  }
  return control.value;
}

export function dirtyCheck<U>(
  control: AbstractControl,
  source: Observable<U>,
  config: DirtyCheckConfig = {}
) {
  const { debounce, withDisabled } = mergeConfig(config);
  const value = () => getControlValue(control, withDisabled);
  const valueChanges$ = merge(
    defer(() => of(value())),
    control.valueChanges.pipe(
      debounceTime(debounce),
      distinctUntilChanged(),
      map(() => value())
    )
  );

  let subscription: Subscription;

  const isDirty$: Observable<boolean> = combineLatest([
    source,
    valueChanges$,
  ]).pipe(
    map(([a, b]) => !isEqual(a, b)),
    finalize(() => subscription.unsubscribe()),
    startWith(false),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  subscription = fromEvent(window, 'beforeunload')
    .pipe(withLatestFrom(isDirty$))
    .subscribe(([event, isDirty]) => {
      if (isDirty) {
        event.preventDefault();
        event.returnValue = false;
      }
    });

  return isDirty$;
}
