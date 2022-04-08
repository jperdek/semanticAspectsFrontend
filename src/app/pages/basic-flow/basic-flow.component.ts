import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedFilesForAnalysisService } from 'src/app/services/shared-files-for-analysis.service';
import { AutomatizationComponent } from '../automatization/automatization.component';

@Component({
  selector: 'app-basic-flow',
  templateUrl: './basic-flow.component.html',
  styleUrls: ['./basic-flow.component.scss']
})
export class BasicFlowComponent implements OnInit {

  isLinear = false;
  senseFormGroup: FormGroup;
  fileFormGroup: FormGroup;
  processFiles = true;
  spinnerVisibility = false;

  constructor(private formBuilder: FormBuilder) {}

  public formatScoreLabel(value: number): number {
    return AutomatizationComponent.roundNumberToPlaces(value, 2);
  }

  public ngOnInit(): void {
    this.fileFormGroup = this.formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.senseFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  getUploadedFiles(): any[] {
    if (this.processFiles && SharedFilesForAnalysisService.getUploadedFiles()[0] !== undefined) {
      if (SharedFilesForAnalysisService.getUploadedFiles()[0].progress === 100) {
       // SharedFilesForAnalysisService.getUploadedFiles()[0].text().then(content => console.log(content));
        this.processFiles = false;
      }
    }
    return SharedFilesForAnalysisService.getUploadedFiles();
  }

  public formatLabel(value: number): string {
    if (value >= 100) {
      return Math.round(value / 100) + ' words';
    }

    return value.toString();
  }

  public startSenseAnalysis(text: string, window: number): void {
    console.log(SharedFilesForAnalysisService.getUploadedFiles());
    // this._senseApiManagerService.senseAnalysis(text, window)
    // .then(result => console.log(result)).catch(error => console.log("Error: " + error));
  }

  public applyAutomatization(): void {
  }
}
