import { Observable } from 'rxjs';

export interface DirtyComponent {
  isDirty$: Observable<boolean> | boolean | (() => boolean);
}
