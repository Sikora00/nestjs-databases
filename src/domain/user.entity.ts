import { AggregateRoot } from '@nestjs/cqrs';
import { Document } from './document.entity';
import { Role } from './role.entity';
import { UserCreatedEvent } from './events/user-created.event';
import { RoleAssignedEvent } from './events/role-assigned.event';

export class User extends AggregateRoot {
  id: string;
  name: string;
  roles: Role[] = [];

  constructor() {
    super();
  }

  public static create(id: string, name: string): User {
    const user = new User();
    user.id = id;
    user.name = name;
    user.apply(new UserCreatedEvent(user));
    return user;
  }

  assignRole(role: Role): void {
    this.roles.push(role);
    this.apply(new RoleAssignedEvent(this.id, role.id));
  }

  readDocument(document: Document): void {}
}
