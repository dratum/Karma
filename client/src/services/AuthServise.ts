import { AxiosResponse } from "axios";
import $api from "../http";
import { AuthResponse } from "../models/response/AuthResponse";

export default class AuthService {
    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/login', { email, password })
    }

    static async registration(name: string, dateOfBirth: string, email: string, password: string, phone: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/registration', { name, dateOfBirth, email, password, phone })
    }

    static async logout(): Promise<void> {
        return $api.post('/logout')
    }
}

