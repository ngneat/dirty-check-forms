import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { dirtyCheck, DirtyComponent } from '@ngneat/dirty-check-forms';
import { Observable, Subscription } from 'rxjs';
import { store, store$ } from '../store';

@Component({
  selector: 'pg-settings',
  templateUrl: './settings.component.html',
})
export class SettingsComponent implements OnInit, DirtyComponent, OnDestroy {
  sub: Subscription;

  settings = new FormGroup({
    settingOne: new FormControl(null),
    ignore: new FormControl(null),
    settingTwo: new FormControl(null),
    settingThree: new FormControl(true),
  });

  isDirty$: Observable<boolean>;

  ngOnInit() {
    this.sub = store$.subscribe((state) =>
      this.settings.patchValue(state, { emitEvent: false })
    );

    this.isDirty$ = dirtyCheck(this.settings, store$, {
      excludeKeys: ['ignore'],
    });
  }

  ngOnDestroy() {
    this.sub && this.sub.unsubscribe();
  }

  submit() {
    store.next(this.settings.value);
  }
}
