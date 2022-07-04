export interface ErrorResponse {
  status: string;
  timestamp: number;
  message: string;
  debugMessage: string;
  subErrors: any[] | null;
}
