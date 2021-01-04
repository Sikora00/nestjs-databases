export class DocumentAssignedEvent {
  constructor(public documentId: string, public roleId: string) {}

  get streamName() {
    // this is the stream name to which the event will be pushed.
    return `roles-${this.roleId}`;
  }
}
