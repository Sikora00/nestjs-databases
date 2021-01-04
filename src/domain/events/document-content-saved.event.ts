import { Document } from '../document.entity';
import { IEvent } from '@nestjs/cqrs';

export class DocumentContentSavedEvent implements IEvent {
  constructor(public document: Document) {}

  get streamName() {
    // this is the stream name to which the event will be pushed.
    return `documents-${this.document.id}`;
  }
}
