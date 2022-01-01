import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'house-talker-fe';
  constructor(private meta: Meta) {
    this.meta.addTag({
      name: 'description',
      content: 'This is an article about Angular Meta service',
    });
  }
}
