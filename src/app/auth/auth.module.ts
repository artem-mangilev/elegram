import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { AuthComponent } from './auth.component'
import { SharedModule } from 'app/shared/shared.module'
import { AuthRoutingModule } from './auth-routing.module'
import { PhoneStepComponent } from './phone-step/phone-step.component'
import { CountryDropdownComponent } from './country-dropdown/country-dropdown.component'
import { PhoneMaskDirective } from './phone-step/phone-mask.directive'

@NgModule({
  declarations: [
    AuthComponent,
    PhoneStepComponent,
    CountryDropdownComponent,
    PhoneMaskDirective,
  ],
  imports: [CommonModule, SharedModule, AuthRoutingModule],
})
export class AuthModule {}
