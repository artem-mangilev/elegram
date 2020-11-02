import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { TranslateModule } from '@ngx-translate/core'

import { TextInputComponent } from './text-input/text-input.component'

@NgModule({
  declarations: [TextInputComponent],
  imports: [CommonModule, TranslateModule, FormsModule],
  exports: [TranslateModule, FormsModule],
})
export class SharedModule {}
