<p align="center">
 <img width="20%" height="20%" src="./logo.svg">
</p>

<br />

[![MIT](https://img.shields.io/packagist/l/doctrine/orm.svg?style=flat-square)]()
[![commitizen](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)]()
[![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)]()
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![All Contributors](https://img.shields.io/badge/all_contributors-0-orange.svg?style=flat-square)](#contributors-)
[![ngneat](https://img.shields.io/badge/@-ngneat-383636?style=flat-square&labelColor=8f68d4)](https://github.com/ngneat/)
[![spectator](https://img.shields.io/badge/tested%20with-spectator-2196F3.svg?style=flat-square)]()

> The cleanest way to do the dirty job

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid assumenda atque blanditiis cum delectus eligendi ipsam iste iure, maxime modi molestiae nihil obcaecati odit officiis pariatur quibusdam suscipit temporibus unde.
Accusantium aliquid corporis cupiditate dolores eum exercitationem illo iure laborum minus nihil numquam odit officiis possimus quas quasi quos similique, temporibus veritatis? Exercitationem, iure magni nulla quo sapiente soluta. Esse?

## Features

- ✅ One
- ✅ Two
- ✅ Three

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [FAQ](#faq)

## Installation

### NPM

`npm install @ngneat/dirty-check-forms --save-dev`

### Yarn

`yarn add @ngneat/dirty-check-forms --dev`

## Usage

Simply call `dirtyCheck` function which accepts 2 arguments:

1. AbstractControl (FormControl, FormGroup, FormArray)
2. A stream with the original value to compare

The function returns an `Observable<boolean>` and also hooks on the browser's `beforeunload` event to confirm upon refreshing / closing the tab.


```ts
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit, DirtyComponent, OnDestroy {
  sub: Subscription;

  settings = new FormGroup({
    firstName: new FormControl(null),
    lastName: new FormControl(null)
  });

  isDirty$: Observable<boolean>;

  constructor(private store: Store) {} 

  ngOnInit() {
    this.sub = this.store.selectSettings().subscribe(state =>
      this.settings.patchValue(state, { emitEvent: false })
    );

    this.isDirty$ = dirtyCheck(this.settings, this.store.selectSettings());
  }

  ngOnDestroy() {
    this.sub && this.sub.unsubscribe();
  }

  submit() {
    this.store.updateSettings(this.settings.value);
  }
}
```

```html
<form [formGroup]="settings">
  <input type="text" formControlName="firstName" placeholder="First name"/>
  <input type="text" formControlName="lastName" placeholder="Last name"/>
  
  <button (click)="submit()" [disabled]="isDirty$ | async">Submit</button>
</form>
```

### Utilities

We also got you covered with:

1. `DirtyComponent` - an interface which you can re-use in your own guard
2. `DirtyCheckGuard`- an implementation of `CanDeactivate` guard that only requires you to implement `confirmChanges` method

```ts
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
