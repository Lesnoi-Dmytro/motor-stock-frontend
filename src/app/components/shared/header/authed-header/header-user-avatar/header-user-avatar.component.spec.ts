import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderUserAvatarComponent } from './header-user-avatar.component';

describe('HeaderUserAvatarComponent', () => {
  let component: HeaderUserAvatarComponent;
  let fixture: ComponentFixture<HeaderUserAvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderUserAvatarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderUserAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
