/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import {
  DeleteRefreshTokenRequest,
  FineOneUserDto,
  Status,
  UpdateUserDto,
  UserList,
  VerifyOneUserDto,
} from 'src/common';
import {
  CreateUserDto,
  DeleteRefreshTokenResponse,
  UpdateRefreshTokenRequest,
  UpdateRefreshTokenResponse,
  UserResponse,
} from 'src/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  // create user -------------------------
  async createUser(data: CreateUserDto): Promise<UserResponse> {
    console.log('createUser--------------------', data);
    // Check if user already exists
    const result = await this.prisma.user.create({
      data: {
        userId: data.userId,
        fullName: data.fullName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        role: data.role,
        isVerified: data.isVerified,
        passwordHash: data.passwordHash,
        refreshToken: data.refreshToken,
      },
    });
    return {
      userId: result.userId,
      fullName: result.fullName,
      email: result.email,
      phoneNumber: result.phoneNumber,
      role: result.role,
      isVerified: result.isVerified,
      createdAt: result.createdAt.toISOString(),
      updatedAt: result.updatedAt.toISOString(),
    } as UserResponse;
  }

  async removeRefreshToken(
    data: DeleteRefreshTokenRequest,
  ): Promise<DeleteRefreshTokenResponse> {
    const { userId, refreshToken } = data;

    const user = await this.prisma.user.findUnique({ where: { userId } });
    console.log('user', user);
    if (!user || !user.refreshToken) {
      console.log('user not found or refresh token not set');
      return { success: false };
    }

    // Compare incoming refresh token with hashed one in DB
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const isMatch = await bcrypt.compare(refreshToken, user.refreshToken);
    if (!isMatch) {
      console.log('refresh token not match');
      return { success: false };
    }

    // Clear the refresh token from DB
    await this.prisma.user.update({
      where: { userId },
      data: { refreshToken: '' },
    });

    console.log('refresh token has been removed');
    return { success: true };
  }
  // update refresh token ------------------
  async updateRefreshToken(
    data: UpdateRefreshTokenRequest,
  ): Promise<UpdateRefreshTokenResponse> {
    console.log('updateRefreshToken', data.refreshToken);
    const { userId, refreshToken } = data;
    const result = await this.prisma.user.update({
      where: { userId },
      data: {
        refreshToken: refreshToken,
      },
    });
    if (!result) {
      return { refreshToken: '' };
    }
    return { refreshToken: result.refreshToken };
  }

  // find user by email ----------------------------------
  async findUserByEmail(email: string): Promise<UserResponse | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return null;
    }

    return {
      userId: user.userId,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      isVerified: user.isVerified,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
      passwordHash: user.passwordHash,
    } as UserResponse;
  }

  // get all users------------------------------
  async findAllUsers(): Promise<UserList> {
    const users = await this.prisma.user.findMany();
    return {
      users: users.map((user) => ({
        userId: user.userId,
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
        isVerified: user.isVerified,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
        passwordHash: user.passwordHash,
      })),
    };
  }

  // find all customers
  async findAllCustomers(): Promise<UserList> {
    const users = await this.prisma.user.findMany({
      where: { role: 'customer' },
    });
    return {
      users: users.map((user) => ({
        userId: user.userId,
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
        isVerified: user.isVerified,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
        passwordHash: user.passwordHash, // Include this property
      })),
    };
  }
  // find all delivery personnel
  async findAllDeliveryPersonnel(): Promise<UserList> {
    const users = await this.prisma.user.findMany({
      where: { role: 'delivery_personnel' },
    });
    return {
      users: users.map((user) => ({
        userId: user.userId,
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
        isVerified: user.isVerified,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
        passwordHash: user.passwordHash, // Include this property
      })),
    };
  }
  // find all restaurant
  async findAllRestaurants(): Promise<UserList> {
    const users = await this.prisma.user.findMany({
      where: { role: 'restaurant' },
    });
    return {
      users: users.map((user) => ({
        userId: user.userId,
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
        isVerified: user.isVerified,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
        passwordHash: user.passwordHash, // Include this property
      })),
    };
  }

  // FindAllUserByIsVerified
  async findAllUserByIsVerified(status: Status): Promise<UserList> {
    // Check if the status is one of the allowed values
    const users = await this.prisma.user.findMany({
      where: { isVerified: status.status as unknown as string },
    });
    return {
      users: users.map((user) => ({
        userId: user.userId,
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
        isVerified: user.isVerified,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
        passwordHash: user.passwordHash,
      })),
    };
  }

  // FindAllCustomerByIsVerified
  async findAllCustomerByIsVerified(isVerified: Status): Promise<UserList> {
    // Check if the status is one of the allowed values
    const users = await this.prisma.user.findMany({
      where: { role: 'customer', isVerified: isVerified.status as unknown as string },
    });
    return {
      users: users.map((user) => ({
        userId: user.userId,
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
        isVerified: user.isVerified,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
        passwordHash: user.passwordHash,
      })),
    };
  }

  //FindAllDeliveryPersonnelByIsVerified
  async findAllDeliveryPersonnelByIsVerified(
    isVerified: Status,
  ): Promise<UserList> {
    const users = await this.prisma.user.findMany({
      where: {
        role: 'delivery_personnel',
        isVerified: isVerified.status as unknown as string,
      },
    });
    return {
      users: users.map((user) => ({
        userId: user.userId,
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
        isVerified: user.isVerified,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
        passwordHash: user.passwordHash, // Include this property
      })),
    };
  }
  // FindAllRestaurantByIsVerified
  async findAllRestaurantByIsVerified(isVerified: Status): Promise<UserList> {
    const users = await this.prisma.user.findMany({
      where: {
        role: 'restaurant',
        isVerified: isVerified.status as unknown as string,
      },
    });
    return {
      users: users.map((user) => ({
        userId: user.userId,
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
        isVerified: user.isVerified,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
        passwordHash: user.passwordHash, // Include this property
      })),
    };
  }
  // update user by id
  async updateUser(data: UpdateUserDto): Promise<UserResponse> {
    const { userId, fullName, phoneNumber, role, isVerified } = data;
    const result = await this.prisma.user.update({
      where: { userId },
      data: {
        fullName,
        phoneNumber,
        role,
        isVerified,
      },
    });
    return {
      userId: result.userId,
      fullName: result.fullName,
      email: result.email,
      phoneNumber: result.phoneNumber,
      role: result.role,
      isVerified: result.isVerified,
      createdAt: result.createdAt.toISOString(),
      updatedAt: result.updatedAt.toISOString(),
    } as UserResponse;
  }
  // delete user by id
  async deleteUser(id: FineOneUserDto): Promise<UserResponse> {
    const user = await this.prisma.user.delete({
      where: { userId: id.userId as unknown as string },
    });
    return {
      userId: user.userId,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      isVerified: user.isVerified,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    } as UserResponse;
  }
  // verify user by id
  async verifyUser(data: VerifyOneUserDto): Promise<UserResponse> {
    const { userId, isVerified } = data;
    const id = userId as unknown as string;
    const user = await this.prisma.user.update({
      where: { userId: id },
      data: { isVerified },
    });
    return {
      userId: user.userId,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      isVerified: user.isVerified,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    } as UserResponse;
  }

  // FindUserById
  async findUserById(id: FineOneUserDto): Promise<UserResponse | null> {
    console.log('id', id);
    const  userId = id.userId as unknown as string;
    console.log('userid', userId)
    const user = await this.prisma.user.findUnique({
      where: { userId: userId},
    });

    if (!user) {
      return null;
    }

    return {
      userId: user.userId,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      isVerified: user.isVerified,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    } as UserResponse;
  }
}
