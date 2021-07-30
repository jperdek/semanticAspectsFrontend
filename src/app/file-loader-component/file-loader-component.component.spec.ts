import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileLoaderComponentComponent } from './file-loader-component.component';

describe('FileLoaderComponentComponent', () => {
  let component: FileLoaderComponentComponent;
  let fixture: ComponentFixture<FileLoaderComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileLoaderComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileLoaderComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
