import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponderAtividadeComponent } from './responder-atividade.component';

describe('ResponderAtividadeComponent', () => {
  let component: ResponderAtividadeComponent;
  let fixture: ComponentFixture<ResponderAtividadeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResponderAtividadeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponderAtividadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
