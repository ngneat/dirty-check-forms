import { Injectable } from '@angular/core';
import { DirtyCheckGuard } from '@ngneat/dirty-check-forms';
import { NzModalService } from 'ng-zorro-antd';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class FormDirtyGuard extends DirtyCheckGuard {
  constructor(private modalService: NzModalService) {
    super();
  }

  confirmChanges(): Observable<boolean> | boolean {
    let navigate;
    return this.modalService
      .confirm({
        nzTitle: 'Confirm',
        nzContent: 'You have unsaved changes. Are you sure you want to leave?',
        nzOkText: 'Stay',
        nzCancelText: 'Leave',
        nzOnOk() {
          navigate = false;
        },
        nzOnCancel() {
          navigate = true;
        }
      })
      .afterClose.pipe(map(() => navigate));
  }
}
