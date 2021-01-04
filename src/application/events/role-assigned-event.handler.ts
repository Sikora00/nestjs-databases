import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Neo4jService } from '@iammhc/nestjs-neo4j';
import { RoleAssignedEvent } from '../../domain/events/role-assigned.event';

@EventsHandler(RoleAssignedEvent)
export class RoleAssignedEventHandler
  implements IEventHandler<RoleAssignedEvent> {
  constructor(private neo4jService: Neo4jService) {}
  async handle(event: RoleAssignedEvent): Promise<any> {
    console.log(
      await this.neo4jService.write(
        `MATCH (user:User {id: $data.userId}) \
                MATCH (role:Role {id: $data.roleId}) \
                CREATE (user)-[rel:IS]->(role)`,
        {
          data: { ...event },
        },
      ),
    );
  }
}
