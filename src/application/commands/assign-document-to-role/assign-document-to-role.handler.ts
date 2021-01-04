import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { AssignDocumentToRoleCommand } from './assign-document-to-role.command';
import { User } from '../../../domain/user.entity';
import { Neo4jService } from '@iammhc/nestjs-neo4j';
import { Role } from '../../../domain/role.entity';
import { Document } from '../../../domain/document.entity';

@CommandHandler(AssignDocumentToRoleCommand)
export class AssignDocumentToRoleHandler
  implements ICommandHandler<AssignDocumentToRoleCommand> {
  constructor(
    private neo4jService: Neo4jService,
    private publisher: EventPublisher,
  ) {}

  async execute(command: AssignDocumentToRoleCommand): Promise<void> {
    const document = await this.neo4jService
      .read(
        `MATCH (document:Document {id: $data.id})
RETURN document`,
        { data: { id: command.documentId } },
      )
      .then(results =>
        results.records.map(
          record => (record.toObject() as any).document.properties,
        ),
      )
      .then(documents => documents[0])
      .then(document => Object.assign(new Document(), document));

    const role = await this.neo4jService
      .read(
        `MATCH (role:Role {id: $data.id})
RETURN role`,
        { data: { id: command.roleId } },
      )
      .then(results =>
        results.records.map(
          record => (record.toObject() as any).role.properties,
        ),
      )
      .then(roles => roles[0])
      .then(role => Object.assign(new Role(), role));

    this.publisher.mergeObjectContext(role);
    role.assignDocument(document);
    role.commit();
  }
}
