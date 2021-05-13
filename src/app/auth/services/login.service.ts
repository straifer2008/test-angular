import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {GetTokenSuccess, LoginInterface, TokenInterface, UserInterface} from '../interfaces/login.interface';
import {environment as env} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: UserInterface;
  private token: string = localStorage.getItem('token');

  constructor(private http: HttpClient) { }

  register({ email, password }: LoginInterface): Observable<UserInterface> {
    return this.http.post<{ data: GetTokenSuccess }>(`${env.apiUrl}register`, {email, password})
      .pipe(
        switchMap(({ data }) => {
          this.setToken(data);
          return this.getUser(data.token);
        })
      );
  }

  login({ email, password }: LoginInterface): Observable<TokenInterface> {
    return this.http
      .post<TokenInterface>(`${env.apiUrl}login`, { email, password })
      .pipe(switchMap((tokenRes) => this.setToken(tokenRes)));
  }

  getUser(token: string): Observable<UserInterface> {
    return this.http.get<{ data: UserInterface }>(`${env.apiUrl}users/2`, { params: { token }})
      .pipe(map(({ data }) => this.setUser(data)));
  }

  setUser(user: UserInterface): UserInterface {
    return this.user = user;
  }

  setToken({ token }: TokenInterface): Observable<TokenInterface> {
    this.token = token;
    localStorage.setItem('token', this.token);

    return of({ token: this.token });
  }

  isAuth(): boolean {
    return !!this.token;
  }

  logout(): void {
    this.setToken(null);
    this.setUser(null);
  }
}
