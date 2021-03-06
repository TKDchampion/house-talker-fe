import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { StorageService } from 'src/app/core/services/storage.service';
import {
  ArticleService,
  CreateArticleParams,
} from 'src/services/article.service';
import { cityData, DistrictModel, quillSetting } from './article-edit.model';
import { CanonicalService } from 'src/app/core/services/canonical.service';
@Component({
  selector: 'app-article-edit-create',
  templateUrl: './article-edit-create.component.html',
  styleUrls: ['./article-edit-create.component.scss'],
})
export class ArticleEditCreateComponent implements OnInit {
  quill: any;
  modules = quillSetting;
  city = cityData;
  districts: DistrictModel[] = [];
  articleForm = this.fb.group({
    title: ['', [Validators.required, Validators.pattern('^.{0,12}$')]],
    summaryContent: [
      '',
      [Validators.required, Validators.pattern('^.{12,30}$')],
    ],
    cityName: ['', [Validators.required]],
    districts: ['', [Validators.required]],
    tips: ['', [Validators.required]],
    content: ['', [Validators.required]],
    isHiddenName: [false, [Validators.required]],
  });
  articleId: string;

  constructor(
    private fb: FormBuilder,
    private storage: StorageService,
    private articleService: ArticleService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private route: ActivatedRoute,
    private canonicalService: CanonicalService
  ) {
    this.articleId = this.route.snapshot.paramMap.get('id') as string;
  }

  ngOnInit(): void {
    this.canonicalService.setCanonicalURL();
    if (this.articleId) {
      this.getArticleDetail();
    }
  }

  changeCity(event: any, type = 'create') {
    const cityName = type === 'create' ? event.target.value : event;
    const cityDistrict = this.city.find((i) => i.name === cityName)?.districts;
    this.districts = !!cityDistrict ? cityDistrict : [];
    this.articleForm.patchValue({ districts: '' });
  }

  getArticleDetail() {
    this.spinner.show();
    this.articleService.getArticleDetail(this.articleId).subscribe(
      (resp: any) => {
        const info = resp;
        info['cityName'] = resp.location.split(' ')[0];
        this.changeCity(info['cityName'], 'update');
        info['districts'] = resp.location.split(' ')[1];
        this.articleForm.patchValue(info);
        this.spinner.hide();
      },
      (error) => this.spinner.hide()
    );
  }

  getEditorInstance(editorInstance: any) {
    this.quill = editorInstance;
    const toolbar = editorInstance.getModule('toolbar');
    toolbar.addHandler('image', this.showImage);
    toolbar.addHandler('link', this.showlink);
  }

  showlink() {
    const range = this.quill.getSelection();
    const text = this.quill.getText(
      range.index,
      range.index + (range.length - 1)
    );
    const value = prompt('please copy paste the image url here.');
    if (value) {
      this.quill.insertText(range, text, 'link', value);
    }
  }

  showImage() {
    var range = this.quill.getSelection();
    var value = prompt('please copy paste the image url here.');
    if (value) {
      this.quill.insertEmbed(range.index, 'image', value);
    }
  }

  createArticle() {}

  onSubmit() {
    if (this.articleForm.valid) {
      this.spinner.show();
      const createParam: CreateArticleParams = {
        title: this.articleForm.get('title')?.value,
        content: this.articleForm.get('content')?.value,
        location: `${this.articleForm.get('cityName')?.value} ${
          this.articleForm.get('districts')?.value
        }`,
        nickName: this.storage.get('nickName') as any,
        summaryContent: this.articleForm.get('summaryContent')?.value,
        tips: this.articleForm.get('tips')?.value,
        isHiddenName: this.articleForm.get('isHiddenName')?.value,
      };

      !this.articleId
        ? this.createAtricleService(createParam)
        : this.updateArticleService(createParam);
    }
  }

  private updateArticleService(updateParam: CreateArticleParams) {
    this.articleService.updateArticle(this.articleId, updateParam).subscribe(
      () => {
        this.router.navigate(['/app']);
        this.spinner.hide();
      },
      () => {
        this.spinner.hide();
        alert('Save Fail!!!');
      }
    );
  }

  private createAtricleService(createParam: CreateArticleParams) {
    this.articleService.createArticle(createParam).subscribe(
      () => {
        this.router.navigate(['/app']);
        this.spinner.hide();
      },
      () => {
        this.spinner.hide();
        alert('Save Fail!!!');
      }
    );
  }
}
