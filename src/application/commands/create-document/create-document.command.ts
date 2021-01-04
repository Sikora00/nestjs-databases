import { CreateDocumentRequest } from '../../../infrastructure/http/document/requests/create-document.request';

export class CreateDocumentCommand {
  constructor(public data: CreateDocumentRequest) {}
}
