import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AuthComponent } from './auth.component'
import { SharedModule } from 'app/shared/shared.module';
import { PhoneStepComponent } from './phone-step/phone-step.component'

@NgModule({
  declarations: [AuthComponent, PhoneStepComponent],
  imports: [CommonModule, SharedModule],
})
export class AuthModule {}
