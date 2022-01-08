import { BoxComponent } from './box/box.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionComponent } from './accordion/accordion.component';
import { ModalComponent } from './modal/modal.component';
import { ListItemComponent } from './list-item/list-item.component';

@NgModule({
  declarations: [
    BoxComponent,
    AccordionComponent,
    ModalComponent,
    ListItemComponent,
  ],
  imports: [CommonModule],
  exports: [
    BoxComponent,
    AccordionComponent,
    ModalComponent,
    ListItemComponent,
  ],
})
export class CommonToolModule {}
