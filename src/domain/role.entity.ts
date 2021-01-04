import { AggregateRoot } from '@nestjs/cqrs';
import { RoleCreatedEvent } from './events/role-created.event';
import { Document } from './document.entity';
import { DocumentAssignedEvent } from './events/document-assigned.event';

export class Role extends AggregateRoot {
  id: string;
  name: string;
  documents: Document[] = [];

  constructor() {
    super();
  }
  static create(id: string, name: string): Role {
    const role = new Role();
    role.id = id;
    role.name = name;
    role.apply(new RoleCreatedEvent(role));
    return role;
  }

  assignDocument(document: Document): void {
    this.documents.push(document);
    this.apply(new DocumentAssignedEvent(document.id, this.id));
  }
}
