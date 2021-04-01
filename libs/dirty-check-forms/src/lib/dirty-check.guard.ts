import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  RouterStateSnapshot,
} from '@angular/router';
import { defer, Observable, of } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { DirtyComponent } from './dirty-component';
import { isFunction, toObservable } from './utils/coercion';

export abstract class DirtyCheckGuard implements CanDeactivate<DirtyComponent> {
  canDeactivate(
    component: DirtyComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot
  ): Observable<boolean> {
    let dirty$: Observable<boolean>;
    const componentDirty = component.isDirty$;

    if (isFunction(componentDirty)) {
      dirty$ = defer(() => toObservable(componentDirty()));
    } else {
      dirty$ = toObservable(componentDirty);
    }

    return dirty$.pipe(
      switchMap((isDirty) => {
        if (isDirty === false) {
          return of(true);
        }
        return toObservable(this.confirmChanges(currentRoute));
      }),
      take(1)
    );
  }

  abstract confirmChanges(currentRoute: ActivatedRouteSnapshot): Observable<boolean> | boolean;
}
