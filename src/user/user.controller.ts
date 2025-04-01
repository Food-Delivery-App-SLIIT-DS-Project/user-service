import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import {
  UserServiceControllerMethods,
  UserServiceController,
  CreateUserDto,
  FineOneUserDto,
  UpdateUserDto,
  Empty,
  User,
  UserList,
} from 'src/common';
import { Observable } from 'rxjs';

@UserServiceControllerMethods()
@Controller('user')
export class UserController implements UserServiceController {
  constructor(private readonly userService: UserService) {}
  createUser(request: CreateUserDto): Promise<User> | Observable<User> | User {
    throw new Error('Method not implemented.');
  }
  findAllUsers(request: Empty): Promise<UserList> | Observable<UserList> | UserList {
    // return auto gen userlist
    return this.userService.findAllUsers();
  }
  findUserById(request: FineOneUserDto): Promise<User> | Observable<User> | User {
    throw new Error('Method not implemented.');
  }
  updateUser(request: UpdateUserDto): Promise<User> | Observable<User> | User {
    throw new Error('Method not implemented.');
  }
  deleteUser(request: FineOneUserDto): Promise<User> | Observable<User> | User {
    throw new Error('Method not implemented.');
  }
}
