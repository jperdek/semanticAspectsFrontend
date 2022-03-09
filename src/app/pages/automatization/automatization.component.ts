import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutomatizationService } from 'src/app/services/automatization/automatization.service';
import { SharedFilesForAnalysisService } from 'src/app/services/shared-files-for-analysis.service';
import { FileModel } from 'src/app/models/fileModel';
import { AutomatizationResult } from 'src/app/models/automatizationResult';

@Component({
  selector: 'app-automatization',
  templateUrl: './automatization.component.html',
  styleUrls: ['./automatization.component.scss']
})
export class AutomatizationComponent implements OnInit {

  isLinear = false;
  senseFormGroup: FormGroup;
  fileFormGroup: FormGroup;
  automatizationResults: AutomatizationResult[] = [];

  constructor(private formBuilder: FormBuilder, private automatizationService: AutomatizationService) {}

  public ngOnInit(): void {
    this.fileFormGroup = this.formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.senseFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  getAutomatizationResults(): AutomatizationResult[] {
    return this.automatizationResults;
  }

  getUploadedFiles(): any[] {
    if (SharedFilesForAnalysisService.getUploadedFiles()[0] !== undefined) {
      if (SharedFilesForAnalysisService.getUploadedFiles()[0].progress === 100) {
       // SharedFilesForAnalysisService.getUploadedFiles()[0].text().then(content => console.log(content));
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

  public applyAutomatization(): void {
    console.log(SharedFilesForAnalysisService.getUploadedFiles()[0]);
    if (SharedFilesForAnalysisService.getUploadedFiles()[0] !== undefined) {
        const uploadedFiles = SharedFilesForAnalysisService.getUploadedFiles();
        uploadedFiles.forEach((uploadedFile: FileModel) => {
          this.automatizationService.automatizationRequest(
            uploadedFile.textResult, uploadedFile.name).then((automatizationResult: AutomatizationResult) => {
            console.log(automatizationResult);
            this.automatizationResults.push(automatizationResult);
          });
        });
      }
  }
}
