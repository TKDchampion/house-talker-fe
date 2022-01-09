import { Component, OnInit, Input } from '@angular/core';
import { ArticleInfo } from 'src/services/article.service';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
})
export class ListItemComponent implements OnInit {
  @Input() setting?: ArticleInfo;

  constructor() {}

  ngOnInit(): void {}
}
