import { Component, Input } from '@angular/core';
import { FileModel } from '../../models/fileModel';

@Component({
  selector: 'app-som-extractor',
  templateUrl: './som-extractor.component.html',
  styleUrls: ['./som-extractor.component.css']
})
export class SomExtractorComponent{

  @Input()
  somTemplateFile: FileModel;

  constructor() { }
}
