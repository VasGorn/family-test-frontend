export interface LoginResponse {
  authenticationToken: string,
  expiresAt: number,
  refreshToken: string,
  username: string
}
