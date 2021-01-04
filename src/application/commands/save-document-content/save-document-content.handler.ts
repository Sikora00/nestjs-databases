import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { SaveDocumentContentCommand } from './save-document-content.command';
import { InjectModel } from '@nestjs/mongoose';
import { Document } from '../../../domain/document.entity';
import { Model } from 'mongoose';
import { DocumentDocument } from '../../../infrastructure/mongodb/schemas/document.schema';

@CommandHandler(SaveDocumentContentCommand)
export class SaveDocumentContentHandler
  implements ICommandHandler<SaveDocumentContentCommand> {
  constructor(
    @InjectModel(Document.name) private documentModel: Model<DocumentDocument>,
    private publisher: EventPublisher,
  ) {}
  async execute(command: SaveDocumentContentCommand): Promise<void> {
    const model = await this.documentModel.findOne({ id: command.id });
    const document = this.publisher.mergeObjectContext(
      Object.assign(new Document(), model.toObject()),
    );
    document.saveContent(command.content);
    document.commit();
  }
}
