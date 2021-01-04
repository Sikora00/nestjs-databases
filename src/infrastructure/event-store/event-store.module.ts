import { Logger, Module } from '@nestjs/common';
import {
  EventStoreBusConfig,
  EventStoreCqrsModule,
  EventStoreSubscriptionType,
} from 'nestjs-eventstore/dist';
import { DocumentCreatedEvent } from '../../domain/events/document-created.event';
import { IEventConstructors } from 'nestjs-eventstore/dist/event-store/eventstore-cqrs/event-store.bus';
import { DocumentContentSavedEvent } from '../../domain/events/document-content-saved.event';
import { UserCreatedEvent } from '../../domain/events/user-created.event';
import { RoleCreatedEvent } from '../../domain/events/role-created.event';
import { RoleAssignedEvent } from '../../domain/events/role-assigned.event';
import { DocumentAssignedEvent } from '../../domain/events/document-assigned.event';

//linking of events from EventStore to local events
const EventInstantiators: IEventConstructors = {
  DocumentCreatedEvent: DocumentCreatedEvent,
  DocumentContentSavedEvent: DocumentContentSavedEvent,
  UserCreatedEvent: UserCreatedEvent,
  RoleCreatedEvent: RoleCreatedEvent,
  RoleAssignedEvent: RoleAssignedEvent,
  DocumentAssignedEvent: DocumentAssignedEvent,
};

export const eventStoreConfig: EventStoreBusConfig = {
  subscriptions: [
    {
      type: EventStoreSubscriptionType.Persistent,
      stream: '$ce-documents',
      persistentSubscriptionName: 'server',
    },
    {
      type: EventStoreSubscriptionType.Persistent,
      stream: '$ce-users',
      persistentSubscriptionName: 'server',
    },
    {
      type: EventStoreSubscriptionType.Persistent,
      stream: '$ce-roles',
      persistentSubscriptionName: 'server',
    },
  ],
  events: EventInstantiators,
};

const logger = new Logger();
// @ts-ignore
logger.info = message => logger.log(message, '[EventStore]');
@Module({
  imports: [
    EventStoreCqrsModule.forRootAsync(
      {
        useFactory: async () => {
          return {
            connectionSettings: {
              log: logger,
              defaultUserCredentials: {
                username: 'admin',
                password: 'changeit',
              },
            },
            endpoint: 'tcp://localhost:1113',
          };
        },
      },
      eventStoreConfig,
    ),
  ],
})
export class EventStoreModule {}
