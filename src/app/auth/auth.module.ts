import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AuthComponent } from './auth.component'
import { SharedModule } from 'app/shared/shared.module';
import { PhoneStepComponent } from './phone-step/phone-step.component';
import { CountryDropdownComponent } from './phone-step/country-dropdown/country-dropdown.component'

@NgModule({
  declarations: [AuthComponent, PhoneStepComponent, CountryDropdownComponent],
  imports: [CommonModule, SharedModule],
})
export class AuthModule {}
