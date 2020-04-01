<p align="center">
 <img width="20%" height="20%" src="./logo.svg">
</p>

<br />

![Test](https://github.com/ngneat/dirty-check-forms/workflows/Test/badge.svg?branch=master)
[![MIT](https://img.shields.io/packagist/l/doctrine/orm.svg?style=flat-square)]()
[![commitizen](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)]()
[![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)]()
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors-)
[![ngneat](https://img.shields.io/badge/@-ngneat-383636?style=flat-square&labelColor=8f68d4)](https://github.com/ngneat/)
[![spectator](https://img.shields.io/badge/tested%20with-spectator-2196F3.svg?style=flat-square)]()

> The cleanest way to do the dirty job

Detect Unsaved Changes in Angular Forms

<img src="https://miro.medium.com/max/1400/1*OEA-Gdmy4GFmkNPCtwHXKg.gif">

## Features

- ✅ Dirty Check Forms!
- ✅ Support In-App Navigation
- ✅ Support Form Departure

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [In-App Navigation](#In-App-Navigation)

## Installation

`npm install @ngneat/dirty-check-forms`

## Usage

Call the `dirtyCheck` function, which accepts two arguments:

1. AbstractControl (`FormControl`, `FormGroup`, `FormArray`)
2. A stream with the original value to compare

The function returns an `Observable<boolean>`, which notifies whether the form is dirty. Furthermore, it also hooks on the browser's `beforeunload` event to confirm upon refreshing/closing the tab when needed.

For example:

```ts
import { dirtyCheck } from '@ngneat/dirty-check-forms';

@Component({ ... })
export class SettingsComponent {
  storeSub: Subscription;

  settings = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl('')
  });

  isDirty$: Observable<boolean>;

  constructor(private store: Store) {}

  ngOnInit() {
    // Update the form with the current store value
    this.storeSub = this.store.selectSettings()
      .subscribe(state => this.settings.patchValue(state, { emitEvent: false }));

    // Initialize dirtyCheck
    this.isDirty$ = dirtyCheck(this.settings, this.store.selectSettings());
  }

  ngOnDestroy() {
    this.storeSub && this.storeSub.unsubscribe();
  }
}
```

```html
<form [formGroup]="settings">
  <input type="text" formControlName="firstName" placeholder="First name" />
  <input type="text" formControlName="lastName" placeholder="Last name" />

  <button (click)="submit()" [disabled]="isDirty$ | async">Submit</button>
</form>
```

### In-App Navigation:

Create a guard that extends `DirtyCheckGuard`, and provide the `confirmChanges` method:

```ts
import { DirtyCheckGuard, DirtyComponent } from '@ngneat/dirty-check-forms';

@Injectable()
export class DirtyGuard extends DirtyCheckGuard<DirtyComponent> {
  constructor() {
    super();
  }

  confirmChanges(): Observable<boolean> | boolean {
    return confirm('Are you sure you want to discard changes?');
  }
}
```

Note that when using a guard, your component **must** implement the `DirtyComponent` interface:

```ts
import { dirtyCheck, DirtyComponent } from '@ngneat/dirty-check-forms';

@Component({ ... })
export class SettingsComponent implements DirtyComponent { ... }
```

The last step is to activate the `DirtyCheckGuard`:

```ts
const routes: Routes = [
  {
    path: 'settings',
    component: SettingsComponent,
    canDeactivate: [DirtyCheckGuard],
  },
];
```

You can find a complete example [here](https://github.com/ngneat/dirty-check-forms/tree/master/apps/playground).

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/danzrou"><img src="https://avatars3.githubusercontent.com/u/6433766?v=4" width="100px;" alt=""/><br /><sub><b>Dan Roujinsky</b></sub></a><br /><a href="https://github.com/@ngneat/dirty-check-forms/commits?author=danzrou" title="Code">💻</a> <a href="https://github.com/@ngneat/dirty-check-forms/commits?author=danzrou" title="Documentation">📖</a> <a href="#example-danzrou" title="Examples">💡</a> <a href="#ideas-danzrou" title="Ideas, Planning, & Feedback">🤔</a> <a href="#projectManagement-danzrou" title="Project Management">📆</a></td>
    <td align="center"><a href="https://www.netbasal.com"><img src="https://avatars1.githubusercontent.com/u/6745730?v=4" width="100px;" alt=""/><br /><sub><b>Netanel Basal</b></sub></a><br /><a href="#blog-NetanelBasal" title="Blogposts">📝</a> <a href="https://github.com/@ngneat/dirty-check-forms/commits?author=NetanelBasal" title="Code">💻</a> <a href="#content-NetanelBasal" title="Content">🖋</a> <a href="#design-NetanelBasal" title="Design">🎨</a> <a href="https://github.com/@ngneat/dirty-check-forms/commits?author=NetanelBasal" title="Documentation">📖</a> <a href="#example-NetanelBasal" title="Examples">💡</a> <a href="#infra-NetanelBasal" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#maintenance-NetanelBasal" title="Maintenance">🚧</a> <a href="#projectManagement-NetanelBasal" title="Project Management">📆</a> <a href="https://github.com/@ngneat/dirty-check-forms/commits?author=NetanelBasal" title="Tests">⚠️</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
