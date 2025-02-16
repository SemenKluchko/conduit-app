import { useMutation } from "@tanstack/react-query";
import { APIError } from "api/types/response";
import { followProfile } from "api/queries/profile";
import { Profile, ProfileData } from "api/types/profile";

export const useFollowProfile = () => {
    return useMutation<ProfileData<Profile>, APIError, { username: string; }>(followProfile);
};
