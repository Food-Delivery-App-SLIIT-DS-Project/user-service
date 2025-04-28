import { Observable } from "rxjs";
export declare const protobufPackage = "user";
export interface FcmTokenResponse {
    fcmToken: string | null;
}
export interface Status {
    status: boolean;
}
export interface UpdateRefreshTokenRequest {
    userId: string;
    refreshToken: string;
}
export interface UpdateRefreshTokenResponse {
    refreshToken: string;
}
export interface DeleteRefreshTokenRequest {
    userId: string;
    refreshToken: string;
}
export interface DeleteRefreshTokenResponse {
    success: boolean;
}
export interface FindUserByEmailDto {
    email: string;
}
export interface Empty {
}
export interface UserList {
    users: UserResponse[];
}
export interface FineOneUserDto {
    userId: string;
}
export interface VerifyOneUserDto {
    userId: string;
    isVerified: boolean;
}
export interface CreateUserDto {
    userId: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    passwordHash: string;
    role: string;
    isVerified: boolean;
    refreshToken: string;
    fcmToken: string | null;
}
export interface UpdateUserDto {
    userId: string;
    fullName: string;
    phoneNumber: string;
    role: string;
    isVerified: boolean;
}
export interface UserResponse {
    userId: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    role: string;
    isVerified: boolean;
    createdAt: string;
    updatedAt: string;
    passwordHash: string;
    fcmToken: string | null;
}
export declare const USER_PACKAGE_NAME = "user";
export interface UserServiceClient {
    createUser(request: CreateUserDto): Observable<UserResponse>;
    findAllUsers(request: Empty): Observable<UserList>;
    findAllCustomers(request: Empty): Observable<UserList>;
    findAllDeliveryPersonnel(request: Empty): Observable<UserList>;
    findAllRestaurants(request: Empty): Observable<UserList>;
    findAllUserByIsVerified(request: Status): Observable<UserList>;
    findAllCustomerByIsVerified(request: Status): Observable<UserList>;
    findAllDeliveryPersonnelByIsVerified(request: Status): Observable<UserList>;
    findAllRestaurantByIsVerified(request: Status): Observable<UserList>;
    findUserById(request: FineOneUserDto): Observable<UserResponse>;
    updateUser(request: UpdateUserDto): Observable<UserResponse>;
    deleteUser(request: FineOneUserDto): Observable<UserResponse>;
    verifyUser(request: VerifyOneUserDto): Observable<UserResponse>;
    findUserByEmail(request: FindUserByEmailDto): Observable<UserResponse>;
    deleteRefreshToken(request: DeleteRefreshTokenRequest): Observable<DeleteRefreshTokenResponse>;
    updateRefreshToken(request: UpdateRefreshTokenRequest): Observable<UpdateRefreshTokenResponse>;
    findFcmTokenByUserId(request: FineOneUserDto): Observable<FcmTokenResponse>;
}
export interface UserServiceController {
    createUser(request: CreateUserDto): Promise<UserResponse> | Observable<UserResponse> | UserResponse;
    findAllUsers(request: Empty): Promise<UserList> | Observable<UserList> | UserList;
    findAllCustomers(request: Empty): Promise<UserList> | Observable<UserList> | UserList;
    findAllDeliveryPersonnel(request: Empty): Promise<UserList> | Observable<UserList> | UserList;
    findAllRestaurants(request: Empty): Promise<UserList> | Observable<UserList> | UserList;
    findAllUserByIsVerified(request: Status): Promise<UserList> | Observable<UserList> | UserList;
    findAllCustomerByIsVerified(request: Status): Promise<UserList> | Observable<UserList> | UserList;
    findAllDeliveryPersonnelByIsVerified(request: Status): Promise<UserList> | Observable<UserList> | UserList;
    findAllRestaurantByIsVerified(request: Status): Promise<UserList> | Observable<UserList> | UserList;
    findUserById(request: FineOneUserDto): Promise<UserResponse> | Observable<UserResponse> | UserResponse;
    updateUser(request: UpdateUserDto): Promise<UserResponse> | Observable<UserResponse> | UserResponse;
    deleteUser(request: FineOneUserDto): Promise<UserResponse> | Observable<UserResponse> | UserResponse;
    verifyUser(request: VerifyOneUserDto): Promise<UserResponse> | Observable<UserResponse> | UserResponse;
    findUserByEmail(request: FindUserByEmailDto): Promise<UserResponse> | Observable<UserResponse> | UserResponse;
    deleteRefreshToken(request: DeleteRefreshTokenRequest): Promise<DeleteRefreshTokenResponse> | Observable<DeleteRefreshTokenResponse> | DeleteRefreshTokenResponse;
    updateRefreshToken(request: UpdateRefreshTokenRequest): Promise<UpdateRefreshTokenResponse> | Observable<UpdateRefreshTokenResponse> | UpdateRefreshTokenResponse;
    findFcmTokenByUserId(request: FineOneUserDto): Promise<FcmTokenResponse> | Observable<FcmTokenResponse> | FcmTokenResponse;
}
export declare function UserServiceControllerMethods(): (constructor: Function) => void;
export declare const USER_SERVICE_NAME = "UserService";
