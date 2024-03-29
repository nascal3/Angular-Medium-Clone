import { CommonModule } from '@angular/common'
import { Component, Input, OnInit } from '@angular/core'

import { BackendErrorInterface } from '../../types/backendError.interface'

@Component({
  selector: 'mc-backend-error-messages',
  templateUrl: './backendErrorMessages.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class BackendErrorMessagesComponent implements OnInit {
  @Input() backendErrors: BackendErrorInterface = {}

  errorMessages: string[] = []

  ngOnInit(): void {
    this.errorMessages = Object.keys(this.backendErrors).map(name => {
      const messages = this.backendErrors[name].join(' ')
      return `${name}: ${messages}`
    })
  }
}
