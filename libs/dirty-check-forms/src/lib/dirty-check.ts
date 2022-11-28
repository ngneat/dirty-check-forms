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
import omit from 'lodash-es/omit';

interface DirtyCheckConfig<U = unknown> {
  debounce?: number;
  withDisabled?: boolean;
  useBeforeunloadEvent?: boolean;
  excludeKeys?: Array<keyof U>;
}

const defaults: DirtyCheckConfig = {
  debounce: 300,
  withDisabled: true,
  useBeforeunloadEvent: true,
};

function getControlValue(control: AbstractControl, withDisabled: boolean) {
  if (
    withDisabled &&
    (control instanceof FormGroup || control instanceof FormArray)
  ) {
    return control.getRawValue();
  }
  return control.value;
}

export function dirtyCheck<
  U,
  Config extends U extends object
    ? DirtyCheckConfig<U>
    : Omit<DirtyCheckConfig<U>, 'excludeKeys'>
>(
  control: AbstractControl,
  source: Observable<U>,
  config: Config = {} as Config
): Observable<boolean> {
  const { debounce, withDisabled, useBeforeunloadEvent, excludeKeys } = {
    ...defaults,
    ...config,
  };
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
      map(([a, b]) => {
        if (excludeKeys) {
          return !isEqual(omit(a, excludeKeys), omit(b, excludeKeys));
        }

        return !isEqual(a, b);
      }),
      startWith(false),
      shareReplay({ bufferSize: 1, refCount: true })
    );

    if (useBeforeunloadEvent) {
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
    }

    return isDirty$.subscribe(observer);
  });
}
