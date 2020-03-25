import { BehaviorSubject } from 'rxjs';

export const store = new BehaviorSubject({
  settingOne: 'Initial Value',
  settingTwo: 'jack',
  settingThree: true
});

export const store$ = store.asObservable();
