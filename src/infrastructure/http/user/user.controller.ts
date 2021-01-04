import { Body, Controller, Param, Post } from '@nestjs/common';
import { CreateUserRequest } from './requests/create-user.request';
import { UserService } from '../../../application/services/user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  create(@Body() data: CreateUserRequest): Promise<any> {
    return this.userService.create(data);
  }

  @Post('role')
  assignRole(@Body() data: { userId: string; roleId: string }): Promise<any> {
    return this.userService.assignRole(data.userId, data.roleId);
  }

  @Post('document')
  readDocument(
    @Body() data: { userId: string; documentId: string },
  ): Promise<any> {
    return this.userService.readDocument(data.userId, data.documentId);
  }
}
