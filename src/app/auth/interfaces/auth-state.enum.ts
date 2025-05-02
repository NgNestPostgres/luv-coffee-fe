export enum AuthState {
  NotStarted = 'notStarted',
  Registration = 'registration',
  Login = 'login',
  Activate = 'activate',
  AuthError = 'authError',
  QueryPasswordReset = 'queryPasswordReset',
  ResetPassword = 'resetPassword',
  ResettingPassword = 'resettingPassword',
}

export interface LoginData {
  authState?: AuthState;
  createdDate?: Date;
  email: string;
  fistname?: string;
  lastname?: string;
  refreshToken?: string;
  userId?: string;
}
