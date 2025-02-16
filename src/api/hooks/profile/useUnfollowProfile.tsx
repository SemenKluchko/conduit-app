import { useMutation, useQueryClient } from "@tanstack/react-query";
import { APIError } from "api/types/response";
import { unfollowProfile } from "api/queries/profile";
import { Profile, ProfileData } from "api/types/profile";
import { queryKeys } from "api/queryKeys";

export const useUnfollowProfile = () => {
    const queryCache = useQueryClient();
    return useMutation<ProfileData<Profile>, APIError, { username: string; }>(unfollowProfile, {
        onSuccess: () => {
            queryCache.invalidateQueries([queryKeys.getArticle]);
        }
    });
};
