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

  private cutboxScaleRatio = 1
  private readonly minCutboxScaleRatio = 0.4
  private readonly cutboxScaleRatioStep = 0.1
  private cutboxDefaultSize: number
  private cutboxScaleStep: number

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

    this.cutboxDefaultSize = this.cutboxElementRef.nativeElement.clientWidth
    this.cutboxScaleStep = this.cutboxDefaultSize * this.cutboxScaleRatioStep
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

  onCutboxWheel(e: WheelEvent): void {
    const cutbox = this.cutboxElementRef.nativeElement

    // TODO: I think there is a better solution to undo changes
    const prevCutboxScaleRatio = this.cutboxScaleRatio
    const prevXOffset = this.xOffset
    const prevYOffset = this.yOffset

    if (e.deltaY < 0) {
      // scroll up
      this.cutboxScaleRatio += this.cutboxScaleRatioStep

      this.xOffset = this.xOffset - (this.cutboxScaleStep / 2)
      this.yOffset = this.yOffset - (this.cutboxScaleStep / 2)
    } else if (e.deltaY > 0) {
      // scroll down
      if (this.minCutboxScaleRatio === +this.cutboxScaleRatio.toPrecision(2)) {
        return
      }

      this.cutboxScaleRatio -= this.cutboxScaleRatioStep

      this.xOffset = this.xOffset + (this.cutboxScaleStep / 2)
      this.yOffset = this.yOffset + (this.cutboxScaleStep / 2)
    }

    const newSize = this.cutboxDefaultSize * this.cutboxScaleRatio

    // check if new size smaller then width and height of container
    const imageWidth = this.avatarElementRef.nativeElement.getBoundingClientRect().width
    const imageHeight = this.avatarElementRef.nativeElement.getBoundingClientRect().height

    const lowestSide = imageHeight <= imageWidth ? imageHeight : imageWidth
    if (newSize > lowestSide) {
      this.resize(lowestSide, cutbox)

      this.cutboxScaleRatio = prevCutboxScaleRatio
      this.xOffset = prevXOffset
      this.yOffset = prevYOffset
    } else {
      this.resize(newSize, cutbox)
    }

    this.setTranslate(this.xOffset, this.yOffset, cutbox)
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

  private resize(size: number, el: HTMLElement): void {
    el.style.width = `${size}px`
    el.style.height = `${size}px`
  }

  private setTranslate(xPos: number, yPos: number, el: HTMLElement): void {
    this.applyTransform(`translate(${xPos}px, ${yPos}px)`, el)
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

  // maybe will needed later if I decide to use transform: scale() for scaling
  private applyTransform(transform: string, element: HTMLElement): void {
    const transformRuleCleanName = transform.match(/[a-z]+(?=\()/)[0]
    const transformRuleRegex = new RegExp(`${transformRuleCleanName}\\(.+?\\)`)

    // if such transform exists, replace it with new,
    if (element.style.transform.includes(transformRuleCleanName)) {
      element.style.transform = element.style.transform.replace(transformRuleRegex, transform)
    } // otherwise add new transform
    else {
      element.style.transform += ` ${transform}`
    }
  }
}
