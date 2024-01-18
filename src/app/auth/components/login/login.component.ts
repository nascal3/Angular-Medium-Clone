import { AsyncPipe, NgIf } from '@angular/common'
import { Component } from '@angular/core'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { RouterLink } from '@angular/router'
import { Store } from '@ngrx/store'
import { combineLatest, map } from 'rxjs'

import { BackendErrorMessagesComponent } from '../../../shared/components/backendErrorMessages/backendErrorMessages.component'
import { authLoginActions } from '../../store/actions'
import {
  selectIsLoginLoading,
  selectIsLoginSubmitting,
  selectLoginValidationErrors,
} from '../../store/reducers'
import { LoginRequestInterface } from '../../types/loginRequest.interface'

@Component({
  selector: 'mc-login',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    AsyncPipe,
    NgIf,
    BackendErrorMessagesComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  })

  data$ = combineLatest([
    this.store.select(selectIsLoginSubmitting),
    this.store.select(selectLoginValidationErrors),
    this.store.select(selectIsLoginLoading),
  ]).pipe(
    map(([loginSubmitting, loginValidationErrors, isLoading]) => ({
      loginSubmitting,
      loginValidationErrors,
      isLoading,
    }))
  )

  constructor(
    private fb: FormBuilder,
    private store: Store
  ) {}

  onSubmitLogin() {
    const request: LoginRequestInterface = {
      user: this.form.getRawValue(),
    }
    this.store.dispatch(authLoginActions.login({ request }))
  }
}
