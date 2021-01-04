import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Neo4jService } from '@iammhc/nestjs-neo4j';
import { GetUserDocumentsQuery } from './get-user-documents.query';
import { Document } from '../../../domain/document.entity';
import { node, Query, relation } from 'cypher-query-builder';

@QueryHandler(GetUserDocumentsQuery)
export class GetUserDocumentsHandler
  implements IQueryHandler<GetUserDocumentsQuery> {
  constructor(private neo4jService: Neo4jService) {}

  execute(query: GetUserDocumentsQuery): Promise<Document[]> {
    const cypherQuery = new Query()
      .match([
        node('', 'User', { id: 'userId' }),
        relation('out', '', 'IS'),
        node('', 'Role'),
        relation('in', '', 'IS_ASSIGNED_TO'),
        node('document', 'Document'),
      ]).return('document')
      .toString();
    return this.neo4jService
      .read(cypherQuery, {id: query.userId})
      .then(results =>
        results.records.map(
          record => (record.toObject() as any).document.properties,
        ),
      )
      .then(documents =>
        documents.map(document => Object.assign(new Document(), document)),
      );
  }
}
