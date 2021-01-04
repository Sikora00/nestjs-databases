import { User } from '../user.entity';

export class UserCreatedEvent {
  constructor(public user: User) {}
  get streamName() {
    // this is the stream name to which the event will be pushed.
    return `users-${this.user.id}`;
  }
}
