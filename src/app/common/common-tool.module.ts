import { BoxComponent } from './box/box.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionComponent } from './accordion/accordion.component';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [BoxComponent, AccordionComponent, ModalComponent],
  imports: [CommonModule],
  exports: [BoxComponent, AccordionComponent, ModalComponent],
})
export class CommonToolModule {}
