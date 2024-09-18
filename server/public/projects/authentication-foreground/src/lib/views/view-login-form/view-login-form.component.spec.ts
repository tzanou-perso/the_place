import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLoginFormComponent } from './view-login-form.component';

describe('ViewLoginFormComponent', () => {
  let component: ViewLoginFormComponent;
  let fixture: ComponentFixture<ViewLoginFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewLoginFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewLoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
