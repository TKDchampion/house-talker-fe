import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
    title: [''],
    description: [''],
    cityName: ['', [Validators.required]],
    districts: [''],
    tips: [''],
    editor: [''],
  });

  constructor(public fb: FormBuilder) {}

  ngOnInit(): void {}

  changeCity($event: any) {
    const cityName = $event.target.value;
    const cityDistrict = this.city.find((i) => i.name === cityName)?.districts;
    this.districts = !!cityDistrict ? cityDistrict : [];
    this.articleForm.patchValue({ districts: '' });
  }

  getEditorInstance(editorInstance: any) {
    this.quill = editorInstance;
    let toolbar = editorInstance.getModule('toolbar');
    toolbar.addHandler('image', this.showImageUI);
  }

  showImageUI() {
    var range = this.quill.getSelection();
    var value = prompt('please copy paste the image url here.');
    if (value) {
      this.quill.insertEmbed(range.index, 'image', value);
    }
  }

  onSubmit() {
    console.log(this.articleForm.value);

    if (!this.articleForm.valid) {
      alert('error');
    }
  }
}
