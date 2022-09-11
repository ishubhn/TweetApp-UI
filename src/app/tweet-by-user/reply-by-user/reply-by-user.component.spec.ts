import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplyByUserComponent } from './reply-by-user.component';

describe('ReplyByUserComponent', () => {
  let component: ReplyByUserComponent;
  let fixture: ComponentFixture<ReplyByUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReplyByUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplyByUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
