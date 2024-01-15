import { createActionGroup, props } from '@ngrx/store'

import { BackendErrorInterface } from '../../shared/types/backendError.interface'
import { CurrentUserInterface } from '../../shared/types/currentUser.interface'
import { LoginRequestInterface } from '../types/loginRequest.interface'
import { RegisterRequestInterface } from '../types/registerRequest.interface'

export const authRegisterActions = createActionGroup({
  source: 'authRegister',
  events: {
    Register: props<{ request: RegisterRequestInterface }>(),
    'Register success': props<{ currentUser: CurrentUserInterface }>(),
    'Register error': props<{ errors: BackendErrorInterface }>(),
  },
})

export const authLoginActions = createActionGroup({
  source: 'authLogin',
  events: {
    Login: props<{ request: LoginRequestInterface }>(),
    'Login success': props<{ currentUser: CurrentUserInterface }>(),
    'Login error': props<{ errors: BackendErrorInterface }>(),
  },
})

// export const register = createAction(
//   '[Auth] Register',
//   props<{ request: RegisterRequestInterface }>()
// )
//
// export const registerSuccess = createAction(
//   '[Auth] Register Success',
//  props<{ currentUser: CurrentUserInterface }>()
// )
//
// export const registerError = createAction(
//   '[Auth] Register Error',
//   props<{ errors: BackendErrorInterface }>()
// )
