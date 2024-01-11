import { inject } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, of, switchMap } from 'rxjs'

import { CurrentUserInterface } from '../../shared/types/currentUser.interface'
import { AuthService } from '../services/auth.service'
import { authActions } from './actions'

export const registerEffect = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService)) => {
    return actions$.pipe(
      ofType(authActions.register),
      switchMap(({ request }) => {
        return authService.register(request).pipe(
          map((currentUser: CurrentUserInterface) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            return authActions.registerSuccess({ currentUser })
          }),
          catchError(() => {
            return of(authActions.registerError())
          })
        )
      })
    )
  },
  { functional: true }
)
