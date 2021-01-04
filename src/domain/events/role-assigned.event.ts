export class RoleAssignedEvent {
  constructor(public userId: string, public roleId: string) {}

  get streamName() {
    // this is the stream name to which the event will be pushed.
    return `users-${this.userId}`;
  }
}
