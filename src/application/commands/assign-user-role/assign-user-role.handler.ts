import { Injectable } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { AssignUserRoleCommand } from './assign-user-role.command';
import { InjectModel } from '@nestjs/mongoose';
import { Document } from '../../../domain/document.entity';
import { Model } from 'mongoose';
import { DocumentDocument } from '../../../infrastructure/mongodb/schemas/document.schema';
import { SaveDocumentContentCommand } from '../save-document-content/save-document-content.command';
import { User } from '../../../domain/user.entity';
import { Neo4jService } from '@iammhc/nestjs-neo4j';
import { Role } from '../../../domain/role.entity';

@CommandHandler(AssignUserRoleCommand)
export class AssignUserRoleHandler
  implements ICommandHandler<AssignUserRoleCommand> {
  constructor(
    private neo4jService: Neo4jService,
    private publisher: EventPublisher,
  ) {}

  async execute(command: AssignUserRoleCommand): Promise<void> {
    const user = await this.neo4jService
      .read(
        `MATCH (user:User {id: $data.id})
RETURN user`,
        { data: { id: command.userId } },
      )
      .then(results =>
        results.records.map(
          record => (record.toObject() as any).user.properties,
        ),
      )
      .then(users => users[0])
      .then(user => Object.assign(new User(), user));

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

    this.publisher.mergeObjectContext(user);
    user.assignRole(role);
    user.commit();
  }
}
