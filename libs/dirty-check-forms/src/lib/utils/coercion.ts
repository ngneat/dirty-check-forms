import { Observable, of } from 'rxjs';

export function isFunction(value: any): value is Function {
  return typeof value === 'function';
}

export function isObservable(value: any): value is Observable<any> {
  return value && isFunction(value.subscribe);
}

export function toObservable<T>(source: T | Observable<T>): Observable<T> {
  return isObservable(source) ? source : of(source);
}
