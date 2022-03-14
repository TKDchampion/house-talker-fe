import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private tagService: Meta, private titleService: Title) {}

  ngOnInit() {
    this.addSEO();
  }

  addSEO() {
    this.titleService.setTitle('HouseTalker');
    this.tagService.addTags([
      {
        name: 'application-name',
        content: 'HouseTalker',
      },
      {
        name: 'keywords',
        content: 'house, rent, 租屋, 黑心房東, 房東',
      },
      {
        name: 'description',
        content:
          '這是一個專門收集黑心房東或壞房東及地雷飯店名宿的平台，避免以後租到的人踩雷，使社會變得佳和諧。',
      },
      {
        property: 'og:site_name',
        content: 'HouseTalker',
      },
      {
        name: 'og:description',
        content:
          '這是一個專門收集黑心房東或壞房東及地雷飯店名宿的平台，避免以後租到的人踩雷，使社會變得佳和諧。',
      },
      { name: 'og:title', content: 'HouseTalker' },
      {
        property: 'og:image',
        content:
          'https://www.maxpixel.net/static/photo/1x/House-Illustration-Exterior-Two-Floors-House-House-4921836.jpg',
      },
    ]);
  }
}
