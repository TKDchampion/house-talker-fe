import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { StorageService } from 'src/app/core/services/storage.service';
import {
  ArticleService,
  CreateArticleParams,
} from 'src/services/article.service';
import { cityData, District, quillSetting } from './article-edit.model';
@Component({
  selector: 'app-article-edit-create',
  templateUrl: './article-edit-create.component.html',
  styleUrls: ['./article-edit-create.component.scss'],
})
export class ArticleEditCreateComponent implements OnInit {
  quill: any;
  modules = quillSetting;
  city = cityData;
  districts: District[] = [];
  articleForm = this.fb.group({
    title: ['', [Validators.required]],
    summaryContnet: ['', [Validators.required]],
    cityName: ['', [Validators.required]],
    districts: ['', [Validators.required]],
    tips: ['', [Validators.required]],
    content: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private storage: StorageService,
    private articleService: ArticleService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  changeCity($event: any) {
    const cityName = $event.target.value;
    const cityDistrict = this.city.find((i) => i.name === cityName)?.districts;
    this.districts = !!cityDistrict ? cityDistrict : [];
    this.articleForm.patchValue({ districts: '' });
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
        summaryContnet: this.articleForm.get('summaryContnet')?.value,
        tips: this.articleForm.get('tips')?.value,
      };

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
    } else {
      alert('Format Error!!!');
    }
  }
}
