import { CurrentUserInterface } from '../../shared/types/currentUser.interface'
import { BackendErrorInterface } from '../../shared/types/backendError.interface'

export interface AuthStateInterface {
  isSubmitting: boolean
  currentUser: CurrentUserInterface | null | undefined
  isLoading: boolean
  validationErrors: BackendErrorInterface | null
}
