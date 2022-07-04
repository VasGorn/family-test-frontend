import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { EventEmitter, Injectable, Output } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { environment as env } from "src/environments/environment";

import { LoginRequest } from "../models/login-request";
import { map, tap } from "rxjs/operators";
import { LoginResponse } from "../models/login-response";
import { SignupRequest } from "../models/signup-request";
import { RefreshTokenRequest } from "../models/refresh-token-request";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() username: EventEmitter<string> = new EventEmitter();

  private refreshTokenRequest: RefreshTokenRequest;

  constructor(private http: HttpClient) {
    this.refreshTokenRequest = {
      refreshToken: "",
      username: "",
    };
  }

  public login(loginRequest: LoginRequest): Observable<boolean> {
    return this.http
      .post<LoginResponse>(`${env.BASE_URL}/auth/login`, loginRequest)
      .pipe(
        map((data: LoginResponse) => {
          localStorage.setItem("authenticationToken", data.authenticationToken);
          localStorage.setItem("username", data.username);
          localStorage.setItem("refreshToken", data.refreshToken);
          localStorage.setItem(
            "expiresAt",
            new Date(data.expiresAt * 1000).toLocaleString()
          );

          this.loggedIn.emit(true);
          this.username.emit(data.username);
          return true;
        })
      );
  }

  public signup(signupRequest: SignupRequest): Observable<string> {
    return this.http.post(`${env.BASE_URL}/auth/signup`, signupRequest, {
      responseType: "text",
    });
  }

  logout(): Observable<string> {
    this.refreshTokenRequest.refreshToken = this.getRefreshToken();
    this.refreshTokenRequest.username = this.getUsername();

    return this.http
      .post(`${env.BASE_URL}/auth/logout`, this.refreshTokenRequest, {
        responseType: "text",
      })
      .pipe(
        tap(() => {
          localStorage.removeItem("authenticationToken");
          localStorage.removeItem("username");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("expiresAt");
        })
      );
  }

  refreshToken() {
    return this.http
      .post<LoginResponse>(
        `${env.BASE_URL}/auth/refresh/token`,
        this.refreshTokenRequest
      )
      .pipe(
        tap((response: LoginResponse) => {
          localStorage.removeItem("authenticationToken");
          localStorage.removeItem("expiresAt");

          localStorage.setItem(
            "authenticationToken",
            response.authenticationToken
          );
          localStorage.setItem(
            "expiresAt",
            new Date(response.expiresAt * 1000).toLocaleString()
          );
        })
      );
  }

  public getJwtToken(): string {
    return localStorage.getItem("authenticationToken");
  }

  public getRefreshToken(): string {
    return localStorage.getItem("refreshToken");
  }

  public getUsername(): string {
    return localStorage.getItem("username");
  }

  public isLoggedIn(): boolean {
    return this.getJwtToken() != null;
  }
}
