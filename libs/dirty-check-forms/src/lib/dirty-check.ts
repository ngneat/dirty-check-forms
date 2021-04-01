import { AbstractControl, FormArray, FormGroup } from '@angular/forms';
import { combineLatest, defer, fromEvent, merge, Observable, of } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
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
): Observable<boolean> {
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

  return new Observable((observer) => {
    const isDirty$: Observable<boolean> = combineLatest([
      source,
      valueChanges$,
    ]).pipe(
      map(([a, b]) => !isEqual(a, b)),
      startWith(false),
      shareReplay({ bufferSize: 1, refCount: true })
    );

    observer.add(
      fromEvent(window, 'beforeunload')
        .pipe(withLatestFrom(isDirty$))
        .subscribe(([event, isDirty]) => {
          if (isDirty) {
            event.preventDefault();
            event.returnValue = false;
          }
        })
    );

    return isDirty$.subscribe(observer);
  });
}
