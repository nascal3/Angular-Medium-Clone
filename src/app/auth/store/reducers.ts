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

const authRegisterFeature = createFeature({
  name: 'authRegister',
  reducer: createReducer(
    initialState,
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
    }))
  ),
})

const authLoginFeature = createFeature({
  name: 'authLogin',
  reducer: createReducer(
    initialState,
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
  name: authRegisterFeatureKey,
  reducer: authRegisterReducer,
  selectIsRegisterSubmitting,
  selectIsRegisterLoading,
  selectCurrentUser,
  selectValidationErrors,
} = authRegisterFeature

export const {
  name: authLoginFeatureKey,
  reducer: authLoginReducer,
  selectIsLoginSubmitting,
  selectIsLoginLoading,
  selectCurrentLoggedUser,
  selectLoginValidationErrors,
} = authLoginFeature
