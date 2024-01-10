import { AsyncPipe } from '@angular/common'
import { Component } from '@angular/core'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { RouterLink } from '@angular/router'
import { Store } from '@ngrx/store'

import { AuthService } from '../../services/auth.service'
import { register } from '../../store/actions'
import { selectIsSubmitting } from '../../store/reducers'
import { AuthStateInterface } from '../../types/authState.interface'
import { RegisterRequestInterface } from '../../types/registerRequest.interface'

@Component({
  selector: 'mc-register',
  templateUrl: './register.component.html',
  imports: [ReactiveFormsModule, RouterLink, AsyncPipe],
  standalone: true,
})
export class RegisterComponent {
  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    email: ['', Validators.required],
  })

  isSubmitting$ = this.store.select(selectIsSubmitting)
  constructor(
    private fb: FormBuilder,
    private store: Store<{ auth: AuthStateInterface }>,
    private authService: AuthService
  ) {}

  onSubmit() {
    console.log('Form>>>', this.form.value)
    const request: RegisterRequestInterface = {
      user: this.form.getRawValue(),
    }
    this.store.dispatch(register({ request }))
    this.authService
      .register(request)
      .subscribe(res => console.log('rs>>>', res))
  }
}
