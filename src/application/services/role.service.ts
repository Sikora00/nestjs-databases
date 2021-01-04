import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateRoleCommand } from '../commands/create-role/create-role.command';
import { AssignDocumentToRoleCommand } from '../commands/assign-document-to-role/assign-document-to-role.command';

@Injectable()
export class RoleService {
  constructor(private commandBus: CommandBus) {}

  create(id: string, name: string): Promise<void> {
    return this.commandBus.execute(new CreateRoleCommand(id, name));
  }

  assignDocument(documentId: string, roleId: string): Promise<void> {
    return this.commandBus.execute(
      new AssignDocumentToRoleCommand(documentId, roleId),
    );
  }
}
