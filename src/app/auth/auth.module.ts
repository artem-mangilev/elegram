import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { MatCheckboxModule } from '@angular/material/checkbox'

import { AuthComponent } from './auth.component'
import { SharedModule } from 'app/shared/shared.module'
import { AuthRoutingModule } from './auth-routing.module'
import { PhoneStepComponent } from './phone-step/phone-step.component'
import { CountryDropdownComponent } from './country-dropdown/country-dropdown.component'
import { PhoneMaskDirective } from './phone-step/phone-mask.directive'
import { CodeStepComponent } from './code-step/code-step.component';
import { PasswordStepComponent } from './password-step/password-step.component';
import { SignupStepComponent } from './signup-step/signup-step.component'

@NgModule({
  declarations: [
    AuthComponent,
    PhoneStepComponent,
    CountryDropdownComponent,
    PhoneMaskDirective,
    CodeStepComponent,
    PasswordStepComponent,
    SignupStepComponent,
  ],
  imports: [CommonModule, SharedModule, AuthRoutingModule, MatCheckboxModule],
})
export class AuthModule {}
