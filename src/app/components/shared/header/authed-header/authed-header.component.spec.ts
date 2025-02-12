import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthedHeaderComponent } from './authed-header.component';

describe('AuthedHeaderComponent', () => {
  let component: AuthedHeaderComponent;
  let fixture: ComponentFixture<AuthedHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthedHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthedHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
