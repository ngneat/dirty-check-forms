import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { dirtyCheck, DirtyComponent } from '@ngneat/dirty-check-forms';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Observable } from 'rxjs';
import { store, store$ } from '../store';

@Component({
  selector: 'pg-settings',
  templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit, DirtyComponent, OnDestroy {
  settings = new FormGroup({
    settingOne: new FormControl(null),
    settingTwo: new FormControl(null),
    settingThree: new FormControl(true)
  });

  isDirty$: Observable<boolean>;

  ngOnInit() {
    store$
      .pipe(untilDestroyed(this))
      .subscribe(state =>
        this.settings.patchValue(state, { emitEvent: false })
      );

    this.isDirty$ = dirtyCheck(this.settings, store$);
  }

  ngOnDestroy() {}

  submit() {
    store.next(this.settings.value);
  }
}
