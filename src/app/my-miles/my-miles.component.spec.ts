import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyMilesComponent } from './my-miles.component';

describe('MyMilesComponent', () => {
  let component: MyMilesComponent;
  let fixture: ComponentFixture<MyMilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyMilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyMilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
