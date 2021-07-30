import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedFilesForAnalysisService } from 'src/app/shared-files-for-analysis.service';
import { SenseApiManagerService } from '../sense-api-manager.service';

@Component({
  selector: 'app-basic-flow',
  templateUrl: './basic-flow.component.html',
  styleUrls: ['./basic-flow.component.css']
})
export class BasicFlowComponent implements OnInit {

  isLinear = false;
  senseFormGroup: FormGroup;
  fileFormGroup: FormGroup;
  processFiles: boolean = true;

  constructor(private _formBuilder: FormBuilder, private _senseApiManagerService: SenseApiManagerService) {}

  ngOnInit() {
    this.fileFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.senseFormGroup = this._formBuilder.group({
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

  public formatLabel(value: number) {
    if (value >= 100) {
      return Math.round(value / 100) + ' words';
    }

    return value;
  }

  public startSenseAnalysis(text: string, window: number): void {
    this._senseApiManagerService.senseAnalysis(text, window).then(result => console.log(result)).catch(error => console.log("Error: " + error));
  }
}
