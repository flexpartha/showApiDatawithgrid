import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PaginationPageComponent } from './pagination-page.component';

describe('PaginationPageComponent', () => {
  let component: PaginationPageComponent;
  let fixture: ComponentFixture<PaginationPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginationPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
