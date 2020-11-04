import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { TranslateModule } from '@ngx-translate/core'

import { InputFieldComponent } from './input-field/input-field.component'
import { PasswordInputFieldComponent } from './password-input-field/password-input-field.component'

@NgModule({
  declarations: [InputFieldComponent, PasswordInputFieldComponent],
  imports: [CommonModule, TranslateModule, FormsModule],
  exports: [
    TranslateModule,
    FormsModule,
    InputFieldComponent,
    PasswordInputFieldComponent,
  ],
})
export class SharedModule {}
