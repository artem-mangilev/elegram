import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { AvatarPickerDialogComponent } from '../avatar-picker-dialog/avatar-picker-dialog.component'

@Component({
  selector: 'app-avatar-picker',
  templateUrl: './avatar-picker.component.html',
  styleUrls: ['./avatar-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarPickerComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  onFileInput(file: File): void {
    const dialogRef = this.dialog.open(AvatarPickerDialogComponent, {
      data: { avatar: file },
    })
  }
}
