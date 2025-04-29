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
  Status,
  VerifyOneUserDto,
  FcmTokenResponse,
} from 'src/common';
import { from, map, Observable } from 'rxjs';
import { RpcException } from '@nestjs/microservices';
import { status } from '@grpc/grpc-js';

@UserServiceControllerMethods()
@Controller()
export class UserController implements UserServiceController {
  constructor(private readonly userService: UserService) {}

  //--------------------------------------------
  findFcmTokenByUserId(request: FineOneUserDto): Observable<FcmTokenResponse> {
    console.log('findFcmTokenByUserId-----------', request.userId);
    if(request.userId === '') {
      throw new RpcException({
        code: status.INVALID_ARGUMENT,
        message: 'userId is required',
      });
    }
    return from(this.userService.findFcmTokenByUserId(request)).pipe(
      map((response) => {
        if (!response) {
          throw new RpcException({
            code: status.NOT_FOUND,
            message: 'FcmToken not found',
          });
        }
        return response;
      }),
    );
  }

  //--------------------------------------------
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
  deleteRefreshToken(
    data: DeleteRefreshTokenRequest,
  ): Observable<DeleteRefreshTokenResponse> {
    console.log('removeRefreshToken', data);
    return from(this.userService.removeRefreshToken(data));
  }

  // update refresh token ----------------
  updateRefreshToken(
    data: UpdateRefreshTokenRequest,
  ): Observable<UpdateRefreshTokenResponse> {
    console.log('updateRefreshToken', data);
    return from(this.userService.updateRefreshToken(data));
  }

  // // find all users --------------------------
  findAllUsers(): Observable<UserList> {
    return from(this.userService.findAllUsers());
  }
  // find all customers --------------------------
  findAllCustomers(): Observable<UserList> {
    return from(this.userService.findAllCustomers());
  }
  // find all delivery personnel --------------------------
  findAllDeliveryPersonnel(): Observable<UserList> {
    return from(this.userService.findAllDeliveryPersonnel());
  }
  // find all restaurants --------------------------
  findAllRestaurants(): Observable<UserList> {
    return from(this.userService.findAllRestaurants());
  }
  // find all users by isVerified --------------------------
  findAllUserByIsVerified(data: Status): Observable<UserList> {
    return from(this.userService.findAllUserByIsVerified(data));
  }
// find all customers by isVerified --------------------------
  findAllCustomerByIsVerified(data: Status): Observable<UserList> {
    return from(this.userService.findAllCustomerByIsVerified(data));
  }
  // find all delivery personnel by isVerified --------------------------
  findAllDeliveryPersonnelByIsVerified(
    data: Status,
  ): Observable<UserList> {
    return from(this.userService.findAllDeliveryPersonnelByIsVerified(data));
  }
  // find all restaurants by isVerified --------------------------
  findAllRestaurantByIsVerified(data: Status): Observable<UserList> {
    return from(this.userService.findAllRestaurantByIsVerified(data));
  }
  // find user by id --------------------------
  findUserById(data: FineOneUserDto): Observable<UserResponse > {
    return from(this.userService.findUserById(data)).pipe(
      map((user) => {
        if (!user) {
          throw new RpcException({
            code: status.NOT_FOUND,
            message: 'User not found',
          });
        }
        return user;
      }),
    );
  }
  // update user --------------------------
  updateUser(data: UpdateUserDto): Observable<UserResponse> {
    return from(this.userService.updateUser(data));
  }
  // delete user --------------------------
  deleteUser(data: FineOneUserDto): Observable<UserResponse> {
    return from(this.userService.deleteUser(data));
  }
  // verify user --------------------------
  verifyUser(data: VerifyOneUserDto): Observable<UserResponse> {
    return from(this.userService.verifyUser(data));
  }

  // findUserById(data: FineOneUserDto): Observable<UserResponse> {
  //   return of({
  //     userId: data.id,
  //     fullName: 'Jane Doe',
  //     email: 'jane@example.com',
  //     phoneNumber: '+987654321',
  //     role: 'restaurant',
  //     isVerified: 'pending',
  //     createdAt: new Date().toISOString(),
  //     updatedAt: new Date().toISOString(),
  //     passwordHash: 'hashedpassword123',
  //   });
  // }

  // updateUser(data: UpdateUserDto): Observable<UserResponse> {
  //   return of({
  //     userId: data.userId,
  //     fullName: data.fullName,
  //     email: 'updated@example.com',
  //     phoneNumber: data.phoneNumber,
  //     role: data.role,
  //     isVerified: data.isVerified,
  //     createdAt: new Date().toISOString(),
  //     updatedAt: new Date().toISOString(),
  //     passwordHash: 'hashedpassword123',
  //   });
  // }

  // deleteUser(data: FineOneUserDto): Observable<UserResponse> {
  //   return of({
  //     userId: data.id,
  //     fullName: 'Deleted User',
  //     email: 'deleted@example.com',
  //     phoneNumber: 'N/A',
  //     role: 'customer',
  //     isVerified: 'rejected',
  //     createdAt: new Date().toISOString(),
  //     updatedAt: new Date().toISOString(),
  //     passwordHash: 'hashedpassword123',
  //   });
  // }

  // verifyUser(data: FineOneUserDto): Observable<UserResponse> {
  //   return of({
  //     userId: data.id,
  //     fullName: 'Verified Person',
  //     email: 'verified@example.com',
  //     phoneNumber: '+123456789',
  //     role: 'delivery_personnel',
  //     isVerified: 'verified',
  //     createdAt: new Date().toISOString(),
  //     updatedAt: new Date().toISOString(),
  //     passwordHash: 'hashedpassword123',
  //   });
  // }
}
