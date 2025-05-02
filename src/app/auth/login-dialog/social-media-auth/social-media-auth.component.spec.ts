import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialMediaAuthComponent } from './social-media-auth.component';

describe('SocialMediaAuthComponent', () => {
  let component: SocialMediaAuthComponent;
  let fixture: ComponentFixture<SocialMediaAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SocialMediaAuthComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(SocialMediaAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
