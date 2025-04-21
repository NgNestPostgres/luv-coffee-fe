export enum AuthState {
  Activate = 'activate',
  AuthError = 'authError',
  QueryPasswordReset = 'queryPasswordReset',
  Login = 'login',
  NotStarted = 'notStarted',
  Registration = 'registration',
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
