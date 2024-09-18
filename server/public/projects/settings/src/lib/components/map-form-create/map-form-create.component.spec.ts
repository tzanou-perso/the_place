import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapFormCreateComponent } from './map-form-create.component';

describe('MapFormCreateComponent', () => {
  let component: MapFormCreateComponent;
  let fixture: ComponentFixture<MapFormCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapFormCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MapFormCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
