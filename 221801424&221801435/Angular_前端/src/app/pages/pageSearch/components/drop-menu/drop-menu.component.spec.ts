import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { DropMenuComponent } from './drop-menu.component';

describe('DropMenuComponent', () => {
  let component: DropMenuComponent;
  let fixture: ComponentFixture<DropMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
