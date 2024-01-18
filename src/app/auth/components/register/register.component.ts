import { AsyncPipe, NgIf } from '@angular/common'
import { Component } from '@angular/core'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { RouterLink } from '@angular/router'
import { Store } from '@ngrx/store'
import { combineLatest, map } from 'rxjs'

// eslint-disable-next-line max-len
import { BackendErrorMessagesComponent } from '../../../shared/components/backendErrorMessages/backendErrorMessages.component'
import { authRegisterActions } from '../../store/actions'
import {
  selectIsRegisterLoading,
  selectIsRegisterSubmitting,
  selectValidationErrors,
} from '../../store/reducers'
import { RegisterRequestInterface } from '../../types/registerRequest.interface'

@Component({
  selector: 'mc-register',
  templateUrl: './register.component.html',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    AsyncPipe,
    NgIf,
    BackendErrorMessagesComponent,
  ],
  standalone: true,
})
export class RegisterComponent {
  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    email: ['', Validators.required],
  })

  data$ = combineLatest([
    this.store.select(selectIsRegisterSubmitting),
    this.store.select(selectValidationErrors),
    this.store.select(selectIsRegisterLoading),
  ]).pipe(
    map(([registerSubmitting, validationErrors, registerLoading]) => ({
      registerSubmitting,
      validationErrors,
      registerLoading,
    }))
  )
  constructor(
    private fb: FormBuilder,
    private store: Store
  ) {}

  onSubmit() {
    // console.log('Form>>>', this.form.value)
    const request: RegisterRequestInterface = {
      user: this.form.getRawValue(),
    }
    this.store.dispatch(authRegisterActions.register({ request }))
  }
}
