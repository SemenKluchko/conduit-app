import { ApiClient } from "api/apiClient";
import { API_ENDPOINTS } from "api/endpoints";
import { Profile, ProfileData } from "api/types/profile";
import { QueryFunctionContext } from "@tanstack/react-query";

export const getProfile = async ({ queryKey }: QueryFunctionContext<[string, { username: string }]>): Promise<ProfileData<Profile>> => {
    const [, { username }] = queryKey;

    const { data } = await ApiClient.get<ProfileData<Profile>>(
        API_ENDPOINTS.profile.replace(':username', username)
    );

    return data;
};

export const followProfile = async ({ username }: { username: string }): Promise<ProfileData<Profile>> => {
    const { data } = await ApiClient.post<ProfileData<Profile>>(
        API_ENDPOINTS.followProfile.replace(':username', username)
    );

    return data;
};

export const unfollowProfile = async ({ username }: { username: string }): Promise<ProfileData<Profile>> => {
    const { data } = await ApiClient.delete<ProfileData<Profile>>(
        API_ENDPOINTS.followProfile.replace(':username', username)
    );

    return data;
};
