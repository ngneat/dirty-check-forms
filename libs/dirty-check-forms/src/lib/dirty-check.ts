import { AbstractControl } from '@angular/forms';
import { equal as isEqual } from './is-equal';
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

interface DirtyCheckConfig {
  debounce?: number;
}

function mergeConfig(config: DirtyCheckConfig) {
  return {
    debounce: 300,
    ...config,
  };
}

export function dirtyCheck<U>(
  control: AbstractControl,
  source: Observable<U>,
  config: DirtyCheckConfig = {}
) {
  const { debounce } = mergeConfig(config);

  const valueChanges$ = merge(
    defer(() => of(control.value)),
    control.valueChanges.pipe(debounceTime(debounce), distinctUntilChanged())
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
