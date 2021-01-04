import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateDocumentRequest } from './requests/create-document.request';
import { DocumentService } from '../../../application/services/document.service';

@Controller('document')
export class DocumentController {
  constructor(private documentService: DocumentService) {}

  @Get('user/:userId')
  async getUserDocuments(@Param('userId') userId: string): Promise<any> {
    return this.documentService.getUserDocuments(userId);
  }

  @Get(':id')
  async getDocument(@Param('id') id: string): Promise<any> {
    return this.documentService.getDocument(id);
  }

  @Post()
  async addTask(@Body() data: CreateDocumentRequest): Promise<any> {
    await this.documentService.create(data);
  }

  @Post(':id/content')
  async saveContent(@Param('id') id: string, @Body() data: any): Promise<any> {
    return this.documentService.saveDocumentContent(id, data);
  }
}
