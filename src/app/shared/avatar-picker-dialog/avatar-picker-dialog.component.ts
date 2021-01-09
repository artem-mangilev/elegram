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
  private xOffset = 0
  private yOffset = 0
  private currentX: number
  private currentY: number
  private isCutboxActive: boolean

  @ViewChild('avatar') avatarElementRef: ElementRef<HTMLImageElement>
  @ViewChild('avatarContainer')
  avatarContainerElementRef: ElementRef<HTMLDivElement>
  @ViewChild('cutbox') cutboxElementRef: ElementRef<HTMLImageElement>

  constructor(@Inject(MAT_DIALOG_DATA) public data: { avatar: File }) {}

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
    this.setTranslate(10, 10, this.cutboxElementRef.nativeElement)
  }

  ngOnDestroy(): void {
    this.fileLoadsSub.unsubscribe()
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

      this.xOffset = this.currentX
      this.yOffset = this.currentY

      console.log(`currentX: ${this.currentX}`)
      console.log(`currentY: ${this.currentY}`)
      console.log(`xOffset: ${this.xOffset}`)
      console.log(`yOffset: ${this.yOffset}`)
      console.log(`initialX: ${this.initialX}`)
      console.log(`initialY: ${this.initialY}`)
      console.log('-----------')

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
