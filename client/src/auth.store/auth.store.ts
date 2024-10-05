import { makeAutoObservable } from "mobx";
import { IUser } from "../models/IUser";
import AuthService from "../services/AuthServise";
import axios from "axios";
import { AuthResponse } from "../models/response/AuthResponse";

export default class AuthStore {
  user = {} as IUser
  isAuth = false
  isLoading = false

  constructor() {
    makeAutoObservable(this)
  }

  setAuth(bool: boolean) {
    this.isAuth = bool
  }

  setUser(user: IUser) {
    this.user = user
  }

  setLoading(bool: boolean) {
    this.isLoading = bool
  }

  async login(email: string, password: string) {
    try {
      const response = await AuthService.login(email, password)
      localStorage.setItem('token', response.data.accessToken)
      localStorage.setItem('user', JSON.stringify(response.data.user))
      localStorage.setItem('userId', response.data.user.id)
      this.setAuth(true)
      this.setUser(response.data.user)
      window.location.assign('/')
    } catch (error) {
      console.log('Что-то пошло не так в файле "auth.store.ts, метод login.');
    }
  }

  async registration(name: string, dateOfBirth: string, email: string, password: string, phone: string) {
    try {
      const response = await AuthService.registration(name, dateOfBirth, email, password, phone)
      console.log(response);
      localStorage.setItem('token', response.data.accessToken)
      localStorage.setItem('user', JSON.stringify(response.data.user))
      localStorage.setItem('userId', response.data.user.id)
      this.setAuth(true)
      this.setUser(response.data.user)
      window.location.assign('/')
    } catch (error) {
      console.log('Что-то пошло не так в файле "auth.store.ts, метод registration.');

    }
  }

  async logout() {
    try {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      localStorage.removeItem('userId')
      await AuthService.logout()

      this.setAuth(false)
      this.setUser({} as IUser)
    } catch (error) {
      console.log('Что-то пошло не так в файле "auth.store.ts, метод logout.');
    }
  }

  async checkAuth() {
    this.isLoading = true
    try {
      const response = await axios.get<AuthResponse>(`${import.meta.env.VITE_REACT_APP_API_URL}/refresh`, {
        withCredentials: true
      })
      
      localStorage.setItem('token', response.data.accessToken)
      localStorage.setItem('user', JSON.stringify(response.data.user))
      localStorage.setItem('userId', response.data.user.id)
      this.setAuth(true)
      this.setUser(response.data.user)
    } catch (error) {
      console.log('Что-то пошло не так в файле "auth.store.ts, метод checkAuth.');
    } finally {
      this.setLoading(false)
    }
  }
}