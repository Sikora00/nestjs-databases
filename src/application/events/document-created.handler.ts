import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DocumentCreatedEvent } from '../../domain/events/document-created.event';
import { InjectModel } from '@nestjs/mongoose';
import { Document } from '../../domain/document.entity';
import { Model } from 'mongoose';
import { DocumentDocument } from '../../infrastructure/mongodb/schemas/document.schema';
import { Neo4jService } from '@iammhc/nestjs-neo4j';

@EventsHandler(DocumentCreatedEvent)
export class DocumentCreatedHandler
  implements IEventHandler<DocumentCreatedEvent> {
  constructor(
    @InjectModel(Document.name) private documentModel: Model<DocumentDocument>,
    private neo4jService: Neo4jService,
  ) {}

  async handle(event: DocumentCreatedEvent): Promise<void> {
    const document = new this.documentModel(event.document);
    await document.save();
    await this.neo4jService.write(`CREATE (document:Document $data)`, {
      data: { id: document.id, title: document.title },
    });
  }
}
