import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core'
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
  selector: 'app-avatar-picker-dialog',
  templateUrl: './avatar-picker-dialog.component.html',
  styleUrls: ['./avatar-picker-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarPickerDialogComponent implements OnInit, AfterViewInit {
  @ViewChild('avatar') avatarElementRef: ElementRef<HTMLImageElement>

  constructor(@Inject(MAT_DIALOG_DATA) public data: { avatar: File }) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const fr = new FileReader()
    fr.onload = () => {
      const avatarElement = this.avatarElementRef.nativeElement
      console.log(fr.result)
      avatarElement.src = <string>fr.result
    }
    fr.readAsDataURL(this.data.avatar)
  }
}
