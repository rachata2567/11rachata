import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShowproductPage } from './showproduct.page';

describe('ShowproductPage', () => {
  let component: ShowproductPage;
  let fixture: ComponentFixture<ShowproductPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowproductPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
