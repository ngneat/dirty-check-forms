import { BehaviorSubject } from 'rxjs';

export const store = new BehaviorSubject({
  settingOne: 'demo',
  settingTwo: 'jack',
  settingThree: true
});

export const store$ = store.asObservable();
