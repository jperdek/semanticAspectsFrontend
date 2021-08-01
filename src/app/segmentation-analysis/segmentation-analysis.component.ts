import { Component, Input, OnInit } from '@angular/core';
import { FileModel } from '../models/fileModel';

@Component({
  selector: 'app-segmentation-analysis',
  templateUrl: './segmentation-analysis.component.html',
  styleUrls: ['./segmentation-analysis.component.css']
})
export class SegmentationAnalysisComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input()
  files: FileModel[];
}
