import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgrammerComponent } from './programmer.component';

describe('ProgrammerComponent', () => {
  let component: ProgrammerComponent;
  let fixture: ComponentFixture<ProgrammerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgrammerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgrammerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
