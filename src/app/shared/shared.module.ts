import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { MatRippleModule } from '@angular/material/core'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatDialogModule } from '@angular/material/dialog'

import { TranslateModule } from '@ngx-translate/core'

import { InputFieldComponent } from './input-field/input-field.component'
import { PrimaryButtonComponent } from './primary-button/primary-button.component'
import { InputRefDirective } from './input-field/input-ref.directive'
import { CheckboxComponent } from './checkbox/checkbox.component'
import { OnlyNumbersDirective } from './only-numbers.directive'
import { AvatarPickerComponent } from './avatar-picker/avatar-picker.component'
import { AvatarPickerDialogComponent } from './avatar-picker-dialog/avatar-picker-dialog.component'
import { IconButtonComponent } from './icon-button/icon-button.component'

@NgModule({
  declarations: [
    InputFieldComponent,
    PrimaryButtonComponent,
    InputRefDirective,
    CheckboxComponent,
    OnlyNumbersDirective,
    AvatarPickerComponent,
    AvatarPickerDialogComponent,
    IconButtonComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    MatRippleModule,
    MatProgressSpinnerModule,
    MatDialogModule,
  ],
  exports: [
    TranslateModule,
    FormsModule,
    InputFieldComponent,
    InputRefDirective,
    PrimaryButtonComponent,
    CheckboxComponent,
    OnlyNumbersDirective,
    AvatarPickerComponent,
  ],
})
export class SharedModule {}
