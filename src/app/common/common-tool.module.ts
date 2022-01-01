import { BoxComponent } from './box/box.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionComponent } from './accordion/accordion.component';

@NgModule({
  declarations: [BoxComponent, AccordionComponent],
  imports: [CommonModule],
  exports: [BoxComponent, AccordionComponent],
})
export class CommonToolModule {}
