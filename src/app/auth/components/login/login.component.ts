import { Component } from '@angular/core'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { RouterLink } from '@angular/router'

import { LoginRequestInterface } from '../../types/loginRequest.interface'

@Component({
  selector: 'mc-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  })

  constructor(private fb: FormBuilder) {}

  onSubmitLogin() {
    const request: LoginRequestInterface = {
      user: this.form.getRawValue(),
    }
  }
}
