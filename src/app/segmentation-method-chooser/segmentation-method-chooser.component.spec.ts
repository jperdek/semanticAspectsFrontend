import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SegmentationMethodChooserComponent } from './segmentation-method-chooser.component';

describe('SegmentationMethodChooserComponent', () => {
  let component: SegmentationMethodChooserComponent;
  let fixture: ComponentFixture<SegmentationMethodChooserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SegmentationMethodChooserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SegmentationMethodChooserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
