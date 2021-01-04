import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document } from '../../domain/document.entity';
import { Model } from 'mongoose';
import { DocumentDocument } from '../../infrastructure/mongodb/schemas/document.schema';
import { CreateDocumentRequest } from '../../infrastructure/http/document/requests/create-document.request';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateDocumentCommand } from '../commands/create-document/create-document.command';
import { SaveDocumentContentCommand } from '../commands/save-document-content/save-document-content.command';
import { GetUserDocumentsQuery } from '../queries/get-user-documents/get-user-documents.query';

@Injectable()
export class DocumentService {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
    @InjectModel(Document.name) private documentModel: Model<DocumentDocument>,
  ) {}

  async getDocument(id: string): Promise<DocumentDocument> {
    return this.documentModel.findOne({ id });
  }

  getUserDocuments(userId: string): Promise<Document[]> {
    return this.queryBus.execute(new GetUserDocumentsQuery(userId));
  }

  create(data: CreateDocumentRequest): Promise<void> {
    return this.commandBus.execute(new CreateDocumentCommand(data));
  }

  async saveDocumentContent(id: string, data: any): Promise<void> {
    return this.commandBus.execute(new SaveDocumentContentCommand(id, data));
  }
}
