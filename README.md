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

> The Library Slogan

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

```ts
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  isDirty$: Observable<boolean>;

  constructor(orivate store: UsersStore,
              private fb: FormBuilder) {}  

  ngOnInit() {
    this.userForm = this.fb.group({
      firstName: 'Dirty',
      lastName: 'Check'
    });
    
    this.isDirty$ = dirtyCheck(this.userForm, this.store.selectUser());
  }
}
```

```html
<form [formGroup]="userForm">
  <input type="text" formControlName="firstName" placeholder="First name"/>
  <input type="text" formControlName="lastName" placeholder="Last name"/>
  
  <button (click)="submit()" [disabled]="isDirty$ | async">Submit</button>
</form>
```

## How to ...

Simple - call `dirtyCheck` function which accepts 2 arguments:
1. AbstractControl (FormControl, FormGroup, FormArray)
2. A stream with the original value which to compare  

#### Utilities

We also got you covered with:

1. `DirtyComponent` - an interface which you can re-use in your own guard
2. `DirtyCheckGuard`- an implementation of `CanDeactivate` guard that only requires you to implement `confirmChanges` method  


## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
