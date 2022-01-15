import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleEditCreateComponent } from './article-edit-create.component';

describe('ArticleEditCreateComponent', () => {
  let component: ArticleEditCreateComponent;
  let fixture: ComponentFixture<ArticleEditCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleEditCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleEditCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
