import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedFilesForAnalysisService } from 'src/app/shared-files-for-analysis.service';

@Component({
  selector: 'app-basic-flow',
  templateUrl: './basic-flow.component.html',
  styleUrls: ['./basic-flow.component.css']
})
export class BasicFlowComponent implements OnInit {

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  processFiles: boolean = true;
  
  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
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
