import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Neo4jService } from '@iammhc/nestjs-neo4j';
import { DocumentAssignedEvent } from '../../domain/events/document-assigned.event';

@EventsHandler(DocumentAssignedEvent)
export class DocumentAssignedEventHandler
  implements IEventHandler<DocumentAssignedEvent> {
  constructor(private neo4jService: Neo4jService) {}
  async handle(event: DocumentAssignedEvent): Promise<any> {
    console.log(
      await this.neo4jService.write(
        `MATCH (document:Document {id: $data.documentId}) \
                MATCH (role:Role {id: $data.roleId}) \
                CREATE (document)-[rel:IS_ASSIGNED_TO]->(role)`,
        {
          data: { ...event },
        },
      ),
    );
  }
}
