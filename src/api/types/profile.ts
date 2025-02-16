export interface ProfileData<T> {
    profile: T;
}

export interface Profile {
    username: string;
    bio: string;
    image: string;
    following: boolean;
}