import { Component, OnInit } from '@angular/core';
import { ArticleInfo, ArticleService } from 'src/services/article.service';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  cityData,
  CityModel,
  DistrictModel,
} from '../article-edit-create/article-edit.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  articlesList: ArticleInfo[] = [];
  defalutArticlesList: ArticleInfo[] = [];
  city = cityData;
  selectedCity = '城市';
  districts?: DistrictModel[];
  selectDistrict = '地區';
  filterText = '';

  constructor(
    private articleService: ArticleService,
    private spinner: NgxSpinnerService
  ) {
    this.getArticlesList();
  }

  ngOnInit(): void {}

  selectedCityFtn(item: CityModel) {
    this.selectedCity = item.name;
    this.districts = item.districts;
    this.selectDistrict = '地區';
  }

  selectedDistrictFtn(item: DistrictModel) {
    this.selectDistrict = item.name;
  }

  filterFtn() {
    switch (!!this.defalutArticlesList) {
      case this.selectedCity === '城市':
        this.articlesList = this.defalutArticlesList.filter(
          (i) =>
            i.nickName.includes(this.filterText) ||
            i.tips.includes(this.filterText) ||
            i.title.includes(this.filterText)
        );
        break;
      case this.selectDistrict === '地區' && this.selectedCity !== '城市':
        this.articlesList = this.defalutArticlesList.filter(
          (i) =>
            i.city === this.selectedCity &&
            (i.nickName.includes(this.filterText) ||
              i.tips.includes(this.filterText) ||
              i.title.includes(this.filterText))
        );
        break;

      default:
        this.articlesList = this.defalutArticlesList.filter(
          (i) =>
            i.city === this.selectedCity &&
            i.district === this.selectDistrict &&
            (i.nickName.includes(this.filterText) ||
              i.tips.includes(this.filterText) ||
              i.title.includes(this.filterText))
        );
        break;
    }
  }

  getArticlesList() {
    this.spinner.show();
    this.articleService.getAllNewsArticles().subscribe(
      (resp: ArticleInfo[]) => {
        this.articlesList = resp;
        this.articlesList.forEach((item: ArticleInfo) => {
          const locationSplit = item.location.split(' ');
          item.city = locationSplit[0];
          item.district = locationSplit[1];
        });
        this.articlesList.sort((a, b) => (a.time > b.time ? -1 : 1));
        this.defalutArticlesList = JSON.parse(
          JSON.stringify(this.articlesList)
        );
        this.spinner.hide();
      },
      (error) => {
        this.spinner.hide();
      }
    );
  }
}
