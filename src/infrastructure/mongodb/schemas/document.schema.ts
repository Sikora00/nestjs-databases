import * as mongoose from 'mongoose';
import { Document as DocumentEntity } from '../../../domain/document.entity';
import { Document } from 'mongoose';

export const DocumentSchema = new mongoose.Schema<DocumentEntity>({
  id: String,
  title: String,
  content: Object,
});

export type DocumentDocument = DocumentEntity & Document;
