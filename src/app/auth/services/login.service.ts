import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {GetTokenSuccess, LoginInterface, TokenInterface, UserInterface} from '../interfaces/login.interface';
import {environment as env} from '../../../environments/environment';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: UserInterface;
  private token: string = localStorage.getItem(env.tokenKey);

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

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
    localStorage.setItem(env.tokenKey, this.token);

    return of({ token: this.token });
  }

  isAuth(): boolean {
    return !!this.token;
  }

  logout(): void {
    localStorage.removeItem(env.tokenKey);
    this.token = null;
    this.setUser(null);
    this.router.navigate([env.authPath]);
  }

  getToken(): string {
    return this.token;
  }
}
