import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Neo4jService } from '@iammhc/nestjs-neo4j';
import { RoleCreatedEvent } from '../../domain/events/role-created.event';

@EventsHandler(RoleCreatedEvent)
export class RoleCreatedEventHandler
  implements IEventHandler<RoleCreatedEvent> {
  constructor(private neo4jService: Neo4jService) {}
  async handle(event: RoleCreatedEvent): Promise<any> {
    await this.neo4jService.write(`CREATE (role:Role $data)`, {
      data: { id: event.role.id, title: event.role.name },
    });
  }
}
