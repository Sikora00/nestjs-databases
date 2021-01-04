import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateDocumentCommand } from './create-document.command';
import { Document } from '../../../domain/document.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DocumentDocument } from '../../../infrastructure/mongodb/schemas/document.schema';
import { BadRequestException } from '@nestjs/common';

@CommandHandler(CreateDocumentCommand)
export class CreateDocumentHandler
  implements ICommandHandler<CreateDocumentCommand> {
  constructor(
    @InjectModel(Document.name) private documentModel: Model<DocumentDocument>,
    private publisher: EventPublisher,
  ) {}
  async execute(command: CreateDocumentCommand): Promise<void> {
    if (await this.documentModel.findOne({ id: command.data.id })) {
      throw new BadRequestException(command.data, 'Document already exists');
    }
    const document = this.publisher.mergeObjectContext(
      Document.create(command.data.id, command.data.title),
    );
    document.commit();
  }
}
