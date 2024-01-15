import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'

import { BackendErrorMessagesComponent } from './backendErrorMessages.component'

describe('BackendErrorMessageComponent', () => {
  let component: BackendErrorMessagesComponent
  let fixture: ComponentFixture<BackendErrorMessagesComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BackendErrorMessagesComponent],
    }).compileComponents()
    fixture = TestBed.createComponent(BackendErrorMessagesComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should render default error state', () => {
    const messageContainer = fixture.debugElement.query(
      By.css('.error-messages')
    )

    expect(messageContainer.nativeElement.textContent).toBe('')
  })

  it('should render custom error messages', () => {
    component.errorMessages = ['Email already taken']
    fixture.detectChanges()

    const messageContainer = fixture.debugElement.query(
      By.css('.error-messages li')
    )

    expect(messageContainer.nativeElement.textContent).toBe(
      'Email already taken'
    )
  })
})
