/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { DeleteRefreshTokenRequest } from 'src/common';
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
    const result = await this.prisma.user.create({
      data: {
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
    if (!user || !user.refreshToken) {
      return { success: false };
    }

    // Compare incoming refresh token with hashed one in DB
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const isMatch = await bcrypt.compare(refreshToken, user.refreshToken);
    if (!isMatch) {
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
}
