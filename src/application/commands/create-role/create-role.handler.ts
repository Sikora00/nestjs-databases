import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateRoleCommand } from './create-role.command';
import { Role } from '../../../domain/role.entity';

@CommandHandler(CreateRoleCommand)
export class CreateRoleHandler implements ICommandHandler<CreateRoleCommand> {
  constructor(private eventPublisher: EventPublisher) {}

  async execute(command: CreateRoleCommand): Promise<any> {
    const role = this.eventPublisher.mergeObjectContext(
      Role.create(command.id, command.name),
    );
    role.commit();
  }
}
