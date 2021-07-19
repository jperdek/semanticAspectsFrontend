import { Component, OnInit } from '@angular/core';
import { ReadabilityAnalysisService } from '../semanticAspects/readability/readability-analysis.service';
import { FileUploadComponent } from '../fileUploader/file-upload/file-upload.component';

@Component({
  selector: 'app-category-observer',
  templateUrl: './category-observer.component.html',
  styleUrls: ['./category-observer.component.css']
})
export class CategoryObserverComponent implements OnInit {

  constructor(private readabilityAnalysisService: ReadabilityAnalysisService) { }

  ngOnInit(): void {
    this.readabilityAnalysisService.test();
  }

}
