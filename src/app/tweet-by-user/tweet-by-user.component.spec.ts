import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TweetByUserComponent } from './tweet-by-user.component';

describe('TweetByUserComponent', () => {
  let component: TweetByUserComponent;
  let fixture: ComponentFixture<TweetByUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TweetByUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TweetByUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
