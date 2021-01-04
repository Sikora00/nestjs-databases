import { Role } from '../role.entity';

export class RoleCreatedEvent {
  constructor(public role: Role) {}
  get streamName() {
    // this is the stream name to which the event will be pushed.
    return `roles-${this.role.id}`;
  }
}
