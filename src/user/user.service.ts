/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import {
  CreateUserDto,
  FineOneUserDto,
  User,
  UserList,
} from 'src/common';

@Injectable()
export class UserService {
  private users: User[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'email',
      password: 'password',
    },
  ];

  createUser(dto: CreateUserDto): User {
    const user: User = { ...dto };
    this.users.push(user);
    return user;
  }

  findAllUsers(): UserList {
    return { users: this.users };
  }

   findUserById(dto: FineOneUserDto): Promise<User | null> {
    return Promise.resolve(this.users.find((user) => user.id === dto.id) || null);
  }

  
}
