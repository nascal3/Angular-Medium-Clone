import { Component } from '@angular/core'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { RouterLink } from '@angular/router'
import { Store } from '@ngrx/store'

import { register } from '../../store/actions'
import { RegisterRequestInterface } from '../../types/registerRequest.interface'

@Component({
  selector: 'mc-register',
  templateUrl: './register.component.html',
  imports: [ReactiveFormsModule, RouterLink],
  standalone: true,
})
export class RegisterComponent {
  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    email: ['', Validators.required],
  })
  constructor(
    private fb: FormBuilder,
    private store: Store
  ) {}

  onSubmit() {
    console.log('Form>>>', this.form.value)
    const request: RegisterRequestInterface = {
      user: this.form.getRawValue(),
    }
    this.store.dispatch(register({ request }))
  }
}
