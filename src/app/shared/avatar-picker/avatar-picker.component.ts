import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  Output,
  ViewChild,
  EventEmitter
} from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { AvatarPickerDialogComponent } from '../avatar-picker-dialog/avatar-picker-dialog.component'

@Component({
  selector: 'app-avatar-picker',
  templateUrl: './avatar-picker.component.html',
  styleUrls: ['./avatar-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarPickerComponent implements OnInit {
  @ViewChild('canvas') canvasElementRef: ElementRef<HTMLCanvasElement>
  @ViewChild('fileInput') fileInputElementRef: ElementRef<HTMLInputElement>

  @Output() readonly avatarSet = new EventEmitter<string>()

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void { }

  onFileInput(file: File): void {
    const dialogRef = this.dialog.open(AvatarPickerDialogComponent, {
      data: {
        avatar: file,
        canvas: this.canvasElementRef.nativeElement,
      },
    })

    dialogRef.componentInstance.imageSetEvent.subscribe(() => {
      dialogRef.close()
      this.avatarSet.emit(this.canvasElementRef.nativeElement.toDataURL())
    })

    dialogRef.componentInstance.closeEvent.subscribe(() => {
      dialogRef.close()
    })

    this.fileInputElementRef.nativeElement.value = null
  }
}
