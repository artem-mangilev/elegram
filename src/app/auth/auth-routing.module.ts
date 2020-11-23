import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { AuthComponent } from './auth.component'
import { PhoneStepComponent } from './phone-step/phone-step.component'

const authRoutes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'phone',
        component: PhoneStepComponent,
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
