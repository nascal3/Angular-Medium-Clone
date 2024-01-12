import { AsyncPipe, NgIf } from '@angular/common'
import { Component } from '@angular/core'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { RouterLink } from '@angular/router'
import { Store } from '@ngrx/store'

import { authActions } from '../../store/actions'
import {
  selectIsLoading,
  selectIsSubmitting,
  selectValidationErrors,
} from '../../store/reducers'
import { RegisterRequestInterface } from '../../types/registerRequest.interface'
import { combineLatest } from 'rxjs'
import { BackendErrorMessagesComponent } from '../../../shared/components/backendErrorMessages/backendErrorMessages.component'

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

  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors),
    isLoading: this.store.select(selectIsLoading),
  })
  constructor(
    private fb: FormBuilder,
    private store: Store
  ) {}

  onSubmit() {
    // console.log('Form>>>', this.form.value)
    const request: RegisterRequestInterface = {
      user: this.form.getRawValue(),
    }
    this.store.dispatch(authActions.register({ request }))
  }
}
