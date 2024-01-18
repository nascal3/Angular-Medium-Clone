import { createFeature, createReducer, on } from '@ngrx/store'

import { AuthStateInterface } from '../types/authState.interface'
import { authLoginActions, authRegisterActions } from './actions'

const initialState: AuthStateInterface = {
  isRegisterSubmitting: false,
  isLoginSubmitting: false,
  isRegisterLoading: false,
  isLoginLoading: false,
  currentUser: undefined,
  currentLoggedUser: undefined,
  validationErrors: null,
  loginValidationErrors: null,
}

const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,
    // ==== register action reducers ====
    on(authRegisterActions.register, state => ({
      ...state,
      isRegisterSubmitting: true,
      isRegisterLoading: true,
      validationErrors: null,
    })),
    on(authRegisterActions.registerSuccess, (state, action) => ({
      ...state,
      isRegisterSubmitting: false,
      isRegisterLoading: false,
      currentUser: action.currentUser,
    })),
    on(authRegisterActions.registerError, (state, action) => ({
      ...state,
      isRegisterSubmitting: false,
      isRegisterLoading: false,
      validationErrors: action.errors,
    })),
    // ==== login action reducers ====
    on(authLoginActions.login, state => ({
      ...state,
      isLoginSubmitting: true,
      isLoginLoading: true,
      validationErrors: null,
    })),
    on(authLoginActions.loginSuccess, (state, action) => ({
      ...state,
      isLoginSubmitting: false,
      isLoginLoading: false,
      currentLoggedUser: action.currentUser,
    })),
    on(authLoginActions.loginError, (state, action) => ({
      ...state,
      isLoginSubmitting: false,
      isLoginLoading: false,
      loginValidationErrors: action.errors,
    }))
  ),
})

export const {
  name: authFeatureKey,
  reducer: authReducer,
  selectIsRegisterSubmitting,
  selectIsRegisterLoading,
  selectCurrentUser,
  selectValidationErrors,
  selectIsLoginSubmitting,
  selectIsLoginLoading,
  selectCurrentLoggedUser,
  selectLoginValidationErrors,
} = authFeature
