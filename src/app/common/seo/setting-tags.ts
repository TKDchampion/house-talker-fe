import { Meta, Title } from '@angular/platform-browser';
import { CanonicalService } from 'src/app/core/services/canonical.service';

export class SettingTags {
  constructor(
    private tagService: Meta,
    private titleService: Title,
    private canonicalService: CanonicalService
  ) {}

  addSEO(data: { title: string; description: string }) {
    this.titleService.setTitle(data.title);
    this.canonicalService.setCanonicalURL();
    this.tagService.updateTag({
      name: 'description',
      content: data.description,
    });
    this.tagService.updateTag({
      property: 'og:description',
      content: data.description,
    });
    this.tagService.updateTag({
      property: 'og:title',
      content: data.title,
    });
  }
}
