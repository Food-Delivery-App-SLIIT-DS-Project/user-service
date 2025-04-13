/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateUserDto, UserResponse } from 'src/common';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  // create user -------------------------
  async createUser(data: CreateUserDto) {
    console.log('data............', data);
    const result = await this.prisma.user.create({
      data: {
        fullName: data.fullName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        role: data.role,
        isVerified: data.isVerified,
        passwordHash:data.passwordHash
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
}
