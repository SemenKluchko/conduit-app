import { useMutation } from "@tanstack/react-query";
import { User, UserData, UserResponse } from "api/types/user";
import { userLogin } from "api/queries/user";
import { APIError } from "api/types/response";


export const useUserLogin = () => {
    return useMutation<UserData<UserResponse>, APIError, UserData<User>>(userLogin);
};
