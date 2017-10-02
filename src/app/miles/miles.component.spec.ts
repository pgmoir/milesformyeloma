import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MilesComponent } from './miles.component';

describe('MilesComponent', () => {
  let component: MilesComponent;
  let fixture: ComponentFixture<MilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
