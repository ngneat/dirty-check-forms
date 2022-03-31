import { BehaviorSubject } from 'rxjs';

interface Data {
  settingOne: string;
  settingTwo: string;
  settingThree: boolean;
  ignore: string;
}

export const store = new BehaviorSubject<Data>({
  settingOne: 'Initial Value',
  settingTwo: 'jack',
  settingThree: true,
  ignore: '',
});

export const store$ = store.asObservable();
