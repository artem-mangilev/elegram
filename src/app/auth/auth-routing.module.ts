import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { AuthComponent } from './auth.component'
import { CodeStepComponent } from './code-step/code-step.component'
import { PasswordStepComponent } from './password-step/password-step.component'
import { PhoneStepComponent } from './phone-step/phone-step.component'
import { SignupStepComponent } from './signup-step/signup-step.component'

const authRoutes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'phone',
        component: PhoneStepComponent,
      },
      {
        path: 'code/:phone',
        component: CodeStepComponent,
      },
      {
        path: 'password',
        component: PasswordStepComponent,
      },
      {
        path: 'signup',
        component: SignupStepComponent,
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
