import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BetweenComponentComponent } from './between-component.component';

describe('BetweenComponentComponent', () => {
  let component: BetweenComponentComponent;
  let fixture: ComponentFixture<BetweenComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BetweenComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BetweenComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
