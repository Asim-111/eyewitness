import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestPredictionComponent } from './test-prediction.component';

describe('TestPredictionComponent', () => {
  let component: TestPredictionComponent;
  let fixture: ComponentFixture<TestPredictionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestPredictionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestPredictionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
