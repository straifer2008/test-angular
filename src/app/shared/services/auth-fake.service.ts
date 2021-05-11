import { Injectable } from '@angular/core';
import {IRegister, IRegisterSuccess, IUser} from '../interfaces/auth';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {flatMap, map} from 'rxjs/internal/operators';
import {environment as env} from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthFakeService {
  private user: IUser;
  private token: string;

  constructor(private http: HttpClient) { }

  register({ email, password }: IRegister): Observable<IUser> {
    return this.http.post<{ data: IRegisterSuccess }>(`${env.apiUrl}register`, {email, password})
      .pipe(
        flatMap(({ data: { token } }) => {
          this.setToken(token);
          return this.getUser(token);
        })
      );
  }

  login({ email, password }: IRegister): Observable<IUser> {
    return this.http
      .post<{ token: string }>(`${env.apiUrl}login`, { email, password })
      .pipe(
        flatMap(({ token }) => {
          this.setToken(token);
          return this.getUser(token);
        })
      );
  }

  getUser(token: string): Observable<IUser> {
    return this.http.get<{ data: IUser }>(`${env.apiUrl}users/2`, { params: { token }})
      .pipe(map(({ data }) => this.setUser(data)));
  }

  setUser(user: IUser): IUser {
    return this.user = user;
  }

  setToken(token: string): void {
    this.token = token;
    if (token) {
      localStorage.setItem('token', window.btoa(this.token));
    } else {
      localStorage.removeItem('token');
    }
  }

  getToken(): string {
    if (this.token) { return this.token; }
    const token = localStorage.getItem('token');
    if (token) { return window.atob(token); }

    return null;
  }

  isAuth(): boolean {
    return !!this.token;
  }

  logout(): void {
    this.setToken(null);
    this.setUser(null);
  }
}
