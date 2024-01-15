import { HttpErrorResponse } from '@angular/common/http'
import { inject } from '@angular/core'
import { Router } from '@angular/router'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, of, switchMap, tap } from 'rxjs'

import { PersistanceService } from '../../shared/services/persistance.service'
import { CurrentUserInterface } from '../../shared/types/currentUser.interface'
import { AuthService } from '../services/auth.service'
import { authRegisterActions, authLoginActions } from './actions'

export const registerEffect = createEffect(
  (
    actions$ = inject(Actions),
    authService = inject(AuthService),
    persistenceService = inject(PersistanceService)
  ) => {
    return actions$.pipe(
      ofType(authRegisterActions.register),
      switchMap(({ request }) => {
        return authService.register(request).pipe(
          map((currentUser: CurrentUserInterface) => {
            persistenceService.set('accessToken', currentUser.token)
            return authRegisterActions.registerSuccess({ currentUser })
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              authRegisterActions.registerError({
                errors: errorResponse.error.errors,
              })
            )
          })
        )
      })
    )
  },
  { functional: true }
)

export const redirectAfterRegisterEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(authRegisterActions.registerSuccess),
      tap(() => {
        router.navigateByUrl('/')
      })
    )
  },
  { functional: true, dispatch: false }
)

export const loginEffect = createEffect(
  (
    actions$ = inject(Actions),
    authLoginService = inject(AuthService),
    persistenceService = inject(PersistanceService)
  ) => {
    return actions$.pipe(
      ofType(authLoginActions.login),
      switchMap(({ request }) => {
        return authLoginService.login(request).pipe(
          map((currentUser: CurrentUserInterface) => {
            persistenceService.set('accessToken', currentUser.token)
            return authLoginActions.loginSuccess({ currentUser })
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              authLoginActions.loginError({
                errors: errorResponse.error.errors,
              })
            )
          })
        )
      })
    )
  },
  { functional: true }
)

export const redirectAfterLoginEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(authLoginActions.loginSuccess),
      tap(() => {
        router.navigateByUrl('/')
      })
    )
  },
  { functional: true, dispatch: false }
)
