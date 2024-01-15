import { BackendErrorMessagesComponent } from './backendErrorMessages.component'
import { ComponentFixture, TestBed } from '@angular/core/testing'

describe('BackendErrorMessageComponent', () => {
  let component: BackendErrorMessagesComponent
  let fixture: ComponentFixture<BackendErrorMessagesComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BackendErrorMessagesComponent]
    }).compileComponents()
    fixture = TestBed.createComponent(BackendErrorMessagesComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
