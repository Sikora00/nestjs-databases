import { Module } from '@nestjs/common';
import { DocumentService } from './services/document.service';
import { CreateDocumentHandler } from './commands/create-document/create-document.handler';
import { DocumentCreatedHandler } from './events/document-created.handler';
import { SaveDocumentContentHandler } from './commands/save-document-content/save-document-content.handler';
import { DocumentContentSavedHandler } from './events/document-content-saved.handler';
import { UserService } from './services/user.service';
import { RoleService } from './services/role.service';
import { CreateUserHandler } from './commands/create-user/create-user.handler';
import { UserCreatedEventHandler } from './events/user-created-event.handler';
import { CreateRoleHandler } from './commands/create-role/create-role.handler';
import { RoleCreatedEventHandler } from './events/role-created-event.handler';
import { AssignUserRoleHandler } from './commands/assign-user-role/assign-user-role.handler';
import { RoleAssignedEventHandler } from './events/role-assigned-event.handler';
import { AssignDocumentToRoleHandler } from './commands/assign-document-to-role/assign-document-to-role.handler';
import { DocumentAssignedEventHandler } from './events/document-assigned-event.handler';
import { GetUserDocumentsHandler } from './queries/get-user-documents/get-user-documents.handler';

@Module({
  providers: [
    DocumentService,
    CreateDocumentHandler,
    DocumentCreatedHandler,
    SaveDocumentContentHandler,
    DocumentContentSavedHandler,
    UserService,
    RoleService,
    CreateUserHandler,
    UserCreatedEventHandler,
    CreateRoleHandler,
    RoleCreatedEventHandler,
    AssignUserRoleHandler,
    RoleAssignedEventHandler,
    AssignDocumentToRoleHandler,
    DocumentAssignedEventHandler,
    GetUserDocumentsHandler,
  ],
  exports: [DocumentService, UserService, RoleService],
})
export class ApplicationModule {}
