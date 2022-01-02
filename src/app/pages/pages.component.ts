import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { StorageService } from '../core/services/storage.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
})
export class PagesComponent implements OnInit {
  modalRef?: BsModalRef;
  constructor(
    private modalService: BsModalService,
    private storage: StorageService
  ) {
    // todo
    this.storage.set(
      'user',
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjMyMzYyMTQ4LCJqdGkiOiJjYjE3MTNhYTFjMTY0NWQxOGIyZWU1ZTViZGUzNzg0NiIsInVzZXJfaWQiOjF9.c8deV_918lhoD3acPP9pqq7s4uE_LfL3x3bEi9W15Iw'
    );
  }

  ngOnInit(): void {}

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
