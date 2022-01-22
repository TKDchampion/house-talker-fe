import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-article-edit-create',
  templateUrl: './article-edit-create.component.html',
  styleUrls: ['./article-edit-create.component.scss'],
})
export class ArticleEditCreateComponent implements OnInit {
  articleForm = this.fb.group({
    title: [''],
    description: [''],
    cityName: ['', [Validators.required]],
    tips: [''],
  });
  constructor(public fb: FormBuilder) {}

  ngOnInit(): void {}

  onSubmit() {
    console.log(this.articleForm.valid);

    if (!this.articleForm.valid) {
      alert('error');
    }
  }
}
