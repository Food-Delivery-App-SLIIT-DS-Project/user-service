/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/await-thenable */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import {
  UserServiceControllerMethods,
  UserServiceController,
  CreateUserDto,
  UserResponse,
  FindUserByEmailDto,
  UserList,
  FineOneUserDto,
  UpdateUserDto,
  DeleteRefreshTokenRequest,
  UpdateRefreshTokenResponse,
  UpdateRefreshTokenRequest,
  DeleteRefreshTokenResponse,
} from 'src/common';
import { from, map, Observable, of } from 'rxjs';
import { RpcException } from '@nestjs/microservices';
import { status } from '@grpc/grpc-js';

@UserServiceControllerMethods()
@Controller()
export class UserController implements UserServiceController {
  constructor(private readonly userService: UserService) {}

  createUser(data: CreateUserDto): Observable<UserResponse> {
    console.log('createUser', data);
    return from(this.userService.createUser(data));
  }
  // find user by email -----------------------
  findUserByEmail(data: FindUserByEmailDto): Observable<UserResponse> {
    console.log('findUserByEmail', data);
    const result = from(this.userService.findUserByEmail(data.email)).pipe(
      map((user) => {
        if (!user) {
          throw new RpcException({
            code: status.NOT_FOUND,
            message: 'User not found',
          });
        }
        console.log('user found');
        console.log(user);
        return user;
      }),
    );
    console.log(result);
    return result;
  }
//------------- remove refresh token ----------------
  deleteRefreshToken(data: DeleteRefreshTokenRequest): Observable<DeleteRefreshTokenResponse> {
    console.log('removeRefreshToken', data);
    return from(this.userService.removeRefreshToken(data));
  }

// update refresh token ----------------
updateRefreshToken(data: UpdateRefreshTokenRequest): Observable<UpdateRefreshTokenResponse> {
    console.log('updateRefreshToken', data);
    return from(this.userService.updateRefreshToken(data));
  }

  // // find all users --------------------------
  findAllUsers(): Observable<UserList> {
    const users: UserResponse[] = [
      {
        userId: 'user-123',
        fullName: 'John Doe',
        email: 'john@example.com',
        phoneNumber: '+123456789',
        role: 'customer',
        isVerified: 'verified',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        passwordHash: 'hashedpassword123',
      },
    ];
    return of({ users });
  }

  findUserById(data: FineOneUserDto): Observable<UserResponse> {
    return of({
      userId: data.id,
      fullName: 'Jane Doe',
      email: 'jane@example.com',
      phoneNumber: '+987654321',
      role: 'restaurant',
      isVerified: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      passwordHash: 'hashedpassword123',
    });
  }

  updateUser(data: UpdateUserDto): Observable<UserResponse> {
    return of({
      userId: data.userId,
      fullName: data.fullName,
      email: 'updated@example.com',
      phoneNumber: data.phoneNumber,
      role: data.role,
      isVerified: data.isVerified,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      passwordHash: 'hashedpassword123',
    });
  }

  deleteUser(data: FineOneUserDto): Observable<UserResponse> {
    return of({
      userId: data.id,
      fullName: 'Deleted User',
      email: 'deleted@example.com',
      phoneNumber: 'N/A',
      role: 'customer',
      isVerified: 'rejected',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      passwordHash: 'hashedpassword123',
    });
  }

  verifyUser(data: FineOneUserDto): Observable<UserResponse> {
    return of({
      userId: data.id,
      fullName: 'Verified Person',
      email: 'verified@example.com',
      phoneNumber: '+123456789',
      role: 'delivery_personnel',
      isVerified: 'verified',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      passwordHash: 'hashedpassword123',
    });
  }
}
