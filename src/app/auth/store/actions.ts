import { createActionGroup, props } from '@ngrx/store'

import { CurrentUserInterface } from '../../shared/types/currentUser.interface'
import { RegisterRequestInterface } from '../types/registerRequest.interface'
import { BackendErrorInterface } from '../../shared/types/backendError.interface'

export const authActions = createActionGroup({
  source: 'auth',
  events: {
    Register: props<{ request: RegisterRequestInterface }>(),
    'Register success': props<{ currentUser: CurrentUserInterface }>(),
    'Register error': props<{ errors: BackendErrorInterface }>(),
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
