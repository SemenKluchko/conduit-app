export interface UserData<T> {
    user: T;
}

export interface UserResponse {
    email: string;
    token: string;
    username: string;
    bio: string;
    image: string;
}

export interface User {
    email: string;
    password: string;
}
