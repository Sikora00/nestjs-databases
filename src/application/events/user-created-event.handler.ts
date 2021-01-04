import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserCreatedEvent } from '../../domain/events/user-created.event';
import { Neo4jService } from '@iammhc/nestjs-neo4j';

@EventsHandler(UserCreatedEvent)
export class UserCreatedEventHandler
  implements IEventHandler<UserCreatedEvent> {
  constructor(private neo4jService: Neo4jService) {}
  async handle(event: UserCreatedEvent): Promise<any> {
    await this.neo4jService.write(`CREATE (user:User $data)`, {
      data: { id: event.user.id, title: event.user.name },
    });
  }
}
