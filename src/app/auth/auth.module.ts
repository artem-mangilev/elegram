import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { AuthComponent } from './auth.component'
import { SharedModule } from 'app/shared/shared.module'
import { AuthRoutingModule } from './auth-routing.module'
import { PhoneStepComponent } from './phone-step/phone-step.component'
import { CountryDropdownComponent } from './country-dropdown/country-dropdown.component'
import { PhoneMaskDirective } from './phone-step/phone-mask.directive';
import { CodeStepComponent } from './code-step/code-step.component'

@NgModule({
  declarations: [
    AuthComponent,
    PhoneStepComponent,
    CountryDropdownComponent,
    PhoneMaskDirective,
    CodeStepComponent,
  ],
  imports: [CommonModule, SharedModule, AuthRoutingModule],
})
export class AuthModule {}
