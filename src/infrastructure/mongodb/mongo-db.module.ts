import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Document } from '../../domain/document.entity';
import { DocumentSchema } from './schemas/document.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/db'),
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
  ],
  exports: [MongooseModule],
})
export class MongoDbModule {}
