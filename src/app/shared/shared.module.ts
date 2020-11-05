import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { MatRippleModule } from '@angular/material/core'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'

import { TranslateModule } from '@ngx-translate/core'

import { InputFieldComponent } from './input-field/input-field.component'
import { PasswordInputFieldComponent } from './password-input-field/password-input-field.component'
import { PrimaryButtonComponent } from './primary-button/primary-button.component'

@NgModule({
  declarations: [
    InputFieldComponent,
    PasswordInputFieldComponent,
    PrimaryButtonComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    MatRippleModule,
    MatProgressSpinnerModule,
  ],
  exports: [
    TranslateModule,
    FormsModule,
    InputFieldComponent,
    PasswordInputFieldComponent,
    PrimaryButtonComponent,
  ],
})
export class SharedModule {}
