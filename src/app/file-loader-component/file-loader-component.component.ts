import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedFilesForAnalysisService } from '../shared-files-for-analysis.service';

@Component({
  selector: 'app-file-loader-component',
  templateUrl: './file-loader-component.component.html',
  styleUrls: ['./file-loader-component.component.css']
})
export class FileLoaderComponentComponent implements OnInit {

  fileFormGroup: FormGroup;
  processFiles: boolean = true;
  
  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.fileFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
  }

  getUploadedFiles(): any[] {
    if(this.processFiles && SharedFilesForAnalysisService.getUploadedFiles()[0] !== undefined) {
      if(SharedFilesForAnalysisService.getUploadedFiles()[0].progress === 100) {
        SharedFilesForAnalysisService.getUploadedFiles()[0].text().then(content => console.log(content));
        this.processFiles = false;
      }
    }
    return SharedFilesForAnalysisService.getUploadedFiles();
  }
}
