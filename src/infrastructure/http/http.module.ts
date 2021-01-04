import { Module } from '@nestjs/common';
import { DocumentController } from './document/document.controller';
import { UserController } from './user/user.controller';
import { RoleController } from './role/role.controller';

@Module({ controllers: [DocumentController, UserController, RoleController] })
export class HttpModule {}
