import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateUserRequest } from '../../infrastructure/http/user/requests/create-user.request';
import { CreateUserCommand } from '../commands/create-user/create-user.command';
import { AssignUserRoleCommand } from '../commands/assign-user-role/assign-user-role.command';

@Injectable()
export class UserService {
  constructor(private commandBus: CommandBus) {}

  create(data: CreateUserRequest): Promise<void> {
    return this.commandBus.execute(new CreateUserCommand(data.id, data.name));
  }

  async assignRole(userId: string, roleId: string): Promise<void> {
    return this.commandBus.execute(new AssignUserRoleCommand(userId, roleId));
  }

  async readDocument(userId: string, documentId: string): Promise<void> {}
}
