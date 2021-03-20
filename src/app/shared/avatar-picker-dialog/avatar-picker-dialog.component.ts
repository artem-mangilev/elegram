import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  ViewChild,
  EventEmitter
} from '@angular/core'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { from, fromEvent, Subscription } from 'rxjs'
import { switchMap, takeUntil } from 'rxjs/operators'

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

  private initialX: number
  private initialY: number
  private xOffset: number
  private yOffset: number
  private currentX: number
  private currentY: number
  private isCutboxActive: boolean

  @ViewChild('avatar') avatarElementRef: ElementRef<HTMLImageElement>
  @ViewChild('avatarContainer')
  avatarContainerElementRef: ElementRef<HTMLDivElement>
  @ViewChild('cutbox') cutboxElementRef: ElementRef<HTMLImageElement>

  readonly imageSetEvent = new EventEmitter()
  readonly closeEvent = new EventEmitter()

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { avatar: File; canvas: HTMLCanvasElement }
  ) { }

  ngAfterViewInit(): void {
    this.fileLoadsSub = this.fileLoads$.subscribe(() => {
      const avatarElement = this.avatarElementRef.nativeElement
      avatarElement.src = <string>this.fr.result
    })

    this.fr.readAsDataURL(this.data.avatar)

    const container = this.avatarContainerElementRef.nativeElement

    const containerMouseDown$ = fromEvent<MouseEvent>(container, 'mousedown')
    const containerMouseMove$ = fromEvent<MouseEvent>(container, 'mousemove')
    const containerMouseUp$ = fromEvent<MouseEvent>(container, 'mouseup')
    containerMouseDown$.subscribe(this.dragStart.bind(this))
    containerMouseMove$.subscribe(this.drag.bind(this))
    containerMouseUp$.subscribe(this.dragEnd.bind(this))

    const containerTouchStart$ = fromEvent<TouchEvent>(container, 'touchstart')
    const containerTouchMove$ = fromEvent<TouchEvent>(container, 'touchmove')
    const containerTouchEnd$ = fromEvent<TouchEvent>(container, 'touchend')
    containerTouchStart$.subscribe(this.dragStart.bind(this))
    containerTouchMove$.subscribe(this.drag.bind(this))
    containerTouchEnd$.subscribe(this.dragEnd.bind(this))

    // put cutbox in the middle
    const avatarElement = this.avatarElementRef.nativeElement
    avatarElement.onload = () => {
      const imageWidth = avatarElement.width
      const imageHeight = avatarElement.height

      // Assume width and height the same
      const cutboxSize = this.cutboxElementRef.nativeElement.clientWidth

      const cutboxDefaultX = (imageWidth / 2) - (cutboxSize / 2);
      const cutboxDefaultY = (imageHeight / 2) - (cutboxSize / 2);

      this.xOffset = cutboxDefaultX
      this.yOffset = cutboxDefaultY

      this.setTranslate(cutboxDefaultX, cutboxDefaultY, this.cutboxElementRef.nativeElement)
    }
  }

  ngOnDestroy(): void {
    this.fileLoadsSub.unsubscribe()
  }

  onIconButtonMouseDown(): void {
    const ctx = this.data.canvas.getContext('2d')
    const avatar = this.avatarElementRef.nativeElement
    const cutboxRect = this.cutboxElementRef.nativeElement.getBoundingClientRect()

    const sizeRatioX = avatar.naturalWidth / avatar.width
    const sizeRatioY = avatar.naturalHeight / avatar.height

    ctx.drawImage(
      avatar,
      this.currentX * sizeRatioX,
      this.currentY * sizeRatioY,
      cutboxRect.width * sizeRatioX,
      cutboxRect.height * sizeRatioY,
      0,
      0,
      this.data.canvas.width,
      this.data.canvas.height
    )

    this.imageSetEvent.emit()
  }

  onClose(): void {
    this.closeEvent.emit()
  }

  private dragStart(e: MouseEvent & TouchEvent): void {
    if (e.type === 'touchstart') {
      this.initialX = e.touches[0].clientX - this.xOffset
      this.initialY = e.touches[0].clientY - this.yOffset
    } else {
      this.initialX = e.clientX - this.xOffset
      this.initialY = e.clientY - this.yOffset
    }

    if (e.target === this.cutboxElementRef.nativeElement) {
      this.isCutboxActive = true
    }
  }

  private dragEnd(e: MouseEvent & TouchEvent): void {
    this.initialX = this.currentX
    this.initialY = this.currentY

    this.isCutboxActive = false
  }

  private drag(e: MouseEvent & TouchEvent): void {
    if (this.isCutboxActive) {
      e.preventDefault()

      if (e.type === 'touchmove') {
        this.currentX = e.touches[0].clientX - this.initialX
        this.currentY = e.touches[0].clientY - this.initialY
      } else {
        this.currentX = e.clientX - this.initialX
        this.currentY = e.clientY - this.initialY
      }

      if (this.checkLeftCollision()) {
        this.currentX = 0
      }

      if (this.checkTopCollision()) {
        this.currentY = 0
      }

      const avatarRect = this.avatarElementRef.nativeElement.getBoundingClientRect()
      const cutboxRect = this.cutboxElementRef.nativeElement.getBoundingClientRect()

      if (this.checkRightCollision()) {
        this.currentX = avatarRect.width - cutboxRect.width
      }

      if (this.checkBottomCollision()) {
        this.currentY = avatarRect.height - cutboxRect.height
      }

      console.log(`X: ${this.currentX}`);
      console.log(`Y: ${this.currentY}`);

      this.xOffset = this.currentX
      this.yOffset = this.currentY

      this.setTranslate(
        this.currentX,
        this.currentY,
        this.cutboxElementRef.nativeElement
      )
    }
  }

  private setTranslate(xPos: number, yPos: number, el: HTMLElement) {
    el.style.transform = `translate(${xPos}px, ${yPos}px)`
  }

  private checkTopCollision(): boolean {
    return this.currentY < 0
  }
  private checkLeftCollision(): boolean {
    return this.currentX < 0
  }

  private checkRightCollision(): boolean {
    const cutboxRect = this.cutboxElementRef.nativeElement.getBoundingClientRect()
    const avatarRect = this.avatarElementRef.nativeElement.getBoundingClientRect()
    return this.currentX + cutboxRect.width > avatarRect.width
  }

  private checkBottomCollision(): boolean {
    const cutboxRect = this.cutboxElementRef.nativeElement.getBoundingClientRect()
    const avatarRect = this.avatarElementRef.nativeElement.getBoundingClientRect()
    return this.currentY + cutboxRect.height > avatarRect.height
  }
}
