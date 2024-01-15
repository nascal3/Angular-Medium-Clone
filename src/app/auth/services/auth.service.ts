import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map, Observable } from 'rxjs'

import { environment } from '../../../environments/environment'
import { CurrentUserInterface } from '../../shared/types/currentUser.interface'
import { AuthResponseInterface } from '../types/authResponse.interface'
import { LoginRequestInterface } from '../types/loginRequest.interface'
import { RegisterRequestInterface } from '../types/registerRequest.interface'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  register(data: RegisterRequestInterface): Observable<CurrentUserInterface> {
    const url = `${environment.apiUrl}/users`
    return this.http
      .post<AuthResponseInterface>(url, data)
      .pipe(map(response => response.user))
  }

  login(data: LoginRequestInterface): Observable<CurrentUserInterface> {
    const url = `${environment.apiUrl}/login`
    return this.http
      .post<AuthResponseInterface>(url, data)
      .pipe(map(response => response.user))
  }
}
