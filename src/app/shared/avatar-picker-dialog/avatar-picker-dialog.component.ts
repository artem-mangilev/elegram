import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  ViewChild,
} from '@angular/core'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { fromEvent, Subscription } from 'rxjs'

@Component({
  selector: 'app-avatar-picker-dialog',
  templateUrl: './avatar-picker-dialog.component.html',
  styleUrls: ['./avatar-picker-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarPickerDialogComponent implements OnDestroy, AfterViewInit {
  private fr = new FileReader()
  private fileLoads$ = fromEvent(this.fr, 'load')
  private fileLoadsSub: Subscription

  @ViewChild('avatar') avatarElementRef: ElementRef<HTMLImageElement>

  constructor(@Inject(MAT_DIALOG_DATA) public data: { avatar: File }) {}

  ngAfterViewInit(): void {
    this.fileLoadsSub = this.fileLoads$.subscribe(() => {
      const avatarElement = this.avatarElementRef.nativeElement
      avatarElement.src = <string>this.fr.result
    })

    this.fr.readAsDataURL(this.data.avatar)
  }

  ngOnDestroy(): void {
    this.fileLoadsSub.unsubscribe()
  }
}
