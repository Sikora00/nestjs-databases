import { AggregateRoot } from '@nestjs/cqrs';
import { DocumentCreatedEvent } from './events/document-created.event';
import { DocumentContentSavedEvent } from './events/document-content-saved.event';

export class Document extends AggregateRoot {
  id: string;
  title: string;
  content: any;

  constructor() {
    super();
  }
  public static create(id: string, title: string): Document {
    const document = new Document();
    document.id = id;
    document.title = title;
    this.apply(new DocumentCreatedEvent(document));
    return document;
  }

  saveContent(content: any): void {
    this.content = content;
    this.apply(new DocumentContentSavedEvent(this));
  }
}
