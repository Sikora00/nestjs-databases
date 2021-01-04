import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DocumentContentSavedEvent } from '../../domain/events/document-content-saved.event';
import { DocumentDocument } from '../../infrastructure/mongodb/schemas/document.schema';
import { Document } from '../../domain/document.entity';

@EventsHandler(DocumentContentSavedEvent)
export class DocumentContentSavedHandler
  implements IEventHandler<DocumentContentSavedEvent> {
  constructor(
    @InjectModel(Document.name) private documentModel: Model<DocumentDocument>,
  ) {}
  async handle(event: DocumentContentSavedEvent): Promise<void> {
    const document = await this.documentModel.findOne({
      id: event.document.id,
    });
    document.content = event.document.content;
    return document.save().then();
  }
}
