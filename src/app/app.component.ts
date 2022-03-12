import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private tagService: Meta, private titleService: Title) {
    this.addSEO();
  }

  addSEO() {
    this.titleService.setTitle('House Talker');
    this.tagService.addTag({
      name: 'description',
      content:
        '這是一個專門收集雷房東的平台，避免以後租到的人踩雷，使社會變得佳和諧。',
    });
    this.tagService.addTag({
      property: 'og:description',
      content:
        '這是一個專門收集雷房東的平台，避免以後租到的人踩雷，使社會變得佳和諧。',
    });
    this.tagService.addTag({
      property: 'og:title',
      content: 'House Talker',
    });
    this.tagService.addTag({
      property: 'og:image',
      content:
        'https://www.maxpixel.net/static/photo/1x/House-Illustration-Exterior-Two-Floors-House-House-4921836.jpg',
    });
  }
}
