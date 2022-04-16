import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ArticleInfo, ArticleService } from 'src/services/article.service';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  cityData,
  CityModel,
  DistrictModel,
} from '../article-edit-create/article-edit.model';
import { CanonicalService } from 'src/app/core/services/canonical.service';
import { SettingTags } from 'src/app/common/seo/setting-tags';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
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
    private spinner: NgxSpinnerService,
    private canonicalService: CanonicalService,
    private tagService: Meta,
    private titleService: Title
  ) {
    this.getArticlesList();
  }

  ngOnInit(): void {
    this.canonicalService.setCanonicalURL();
    const settongSEO = new SettingTags(
      this.tagService,
      this.titleService,
      this.canonicalService
    );
    settongSEO.addSEO({
      title: 'HouseTalker',
      description:
        '這是一個專門收集惡房東或地雷飯店名宿的平台，讓有租房需求的人免於成為受害者，改善租屋大環境，使社會變得佳和諧。',
    });
  }

  clear() {
    this.selectedCity = '城市';
    this.selectDistrict = '地區';
    this.filterText = '';
    this.filterFtn();
  }

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
        this.articlesList.sort((a, b) => (a.timeTw > b.timeTw ? -1 : 1));
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
