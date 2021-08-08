import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FileModel } from '../models/fileModel';

@Component({
  selector: 'app-select-files-for-given-operation',
  templateUrl: './select-files-for-given-operation.component.html',
  styleUrls: ['./select-files-for-given-operation.component.css']
})
export class SelectFilesForGivenOperationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input()
  files: FileModel[];

  @Input()
  segmentation: boolean;

  @Input()
  segmentationMethodName: FileModel[];
}
