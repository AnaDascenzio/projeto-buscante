import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalLivroComponent } from './modal-livro.component';

describe('ModalLivroComponent', () => {
  let component: ModalLivroComponent;
  let fixture: ComponentFixture<ModalLivroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalLivroComponent]
    });
    fixture = TestBed.createComponent(ModalLivroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
