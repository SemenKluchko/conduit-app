import { ApiClient } from "api/apiClient";
import { API_ENDPOINTS } from "api/endpoints";
import { User, UserData, UserResponse } from "api/types/user";
import {QueryFunctionContext} from "@tanstack/react-query";


export const getUser = async (): Promise<UserData<UserResponse>> => {
    const { data } = await ApiClient.get<UserData<UserResponse>>(
        API_ENDPOINTS.user
    );

    return data;
};

export const userLogin = async (userData: UserData<User>): Promise<UserData<UserResponse>> => {
    const { data } = await ApiClient.post<UserData<UserResponse>>(
        API_ENDPOINTS.userLogin,
        userData
    );

    return data;
};
