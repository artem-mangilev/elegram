import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'

@Component({
  selector: 'app-avatar-picker-dialog',
  templateUrl: './avatar-picker-dialog.component.html',
  styleUrls: ['./avatar-picker-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarPickerDialogComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
