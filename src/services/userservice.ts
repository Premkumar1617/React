import apiClient from "../commonfiles/apiClient";
import type { ApiResponse } from "../types/api";
import type { User } from "../types/user";

export const userService={
    register(data:User):Promise<ApiResponse<User>>{
        return apiClient.post("user/register",data);
    },
   
    getUsers():Promise<ApiResponse<User[]>>{
        return apiClient.get("user/getAll");
    }
}