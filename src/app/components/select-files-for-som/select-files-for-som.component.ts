import { Component, Input } from '@angular/core';
import { FileModel } from '../../models/fileModel';

@Component({
  selector: 'app-select-files-for-som',
  templateUrl: './select-files-for-som.component.html',
  styleUrls: ['./select-files-for-som.component.css']
})
export class SelectFilesForSOMComponent {

  @Input()
  files: FileModel[];

  @Input()
  segmentation: boolean;

  @Input()
  segmentationMethodName: FileModel[];

}
