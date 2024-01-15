import { BackendErrorInterface } from '../../shared/types/backendError.interface'
import { CurrentUserInterface } from '../../shared/types/currentUser.interface'

export interface AuthStateInterface {
  isRegisterSubmitting: boolean
  isLoginSubmitting: boolean
  currentUser: CurrentUserInterface | null | undefined
  currentLoggedUser: CurrentUserInterface | null | undefined
  isRegisterLoading: boolean
  isLoginLoading: boolean
  validationErrors: BackendErrorInterface | null
  loginValidationErrors: BackendErrorInterface | null
}
