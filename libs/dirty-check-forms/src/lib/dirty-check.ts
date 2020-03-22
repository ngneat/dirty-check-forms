import { AbstractControl } from '@angular/forms';
import * as isEqual from 'fast-deep-equal';
import {
  combineLatest,
  defer,
  fromEvent,
  merge,
  Observable,
  of,
  Subscription
} from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  finalize,
  map,
  shareReplay,
  startWith,
  withLatestFrom
} from 'rxjs/operators';

export function dirtyCheck<U>(
  control: AbstractControl,
  source: Observable<U>,
  debounce: number = 300
) {
  const valueChanges$ = merge(
    defer(() => of(control.value)),
    control.valueChanges.pipe(debounceTime(debounce), distinctUntilChanged())
  );

  let subscription: Subscription;

  const isDirty$ = combineLatest([source, valueChanges$]).pipe(
    map(([a, b]) => !isEqual(a, b)),
    finalize(() => subscription.unsubscribe()),
    startWith(false),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  subscription = fromEvent(window, 'beforeunload')
    .pipe(withLatestFrom(isDirty$))
    .subscribe(([event, isDirty]) => isDirty && (event.returnValue = false));

  return isDirty$;
}
