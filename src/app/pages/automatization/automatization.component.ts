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

  public formatScoreLabel(value: number): number {
    return value;
  }

  public getMinScore(text: string): number {
    let minScore = 10000000;
    const scores = text.match(/score=([\"\'][^\"\']+[\"\'])/g);
    for (const scoreString of scores){
        const score = Number(scoreString.split('"')[1]);
        if (minScore > score) {
            minScore = score;
        }
    }
    return minScore;
  }

  public getMaxScore(text: string): number {
    let maxScore = 0;
    const scores = text.match(/score=([\"\'][^\"\']+[\"\'])/g);
    for (const scoreString of scores){
        const score = Number(scoreString.split('"')[1]);
        if (maxScore < score) {
            maxScore = score;
        }
    }
    return maxScore;
  }

  public scoreOnSlideChange(threshold: number, automatizationResult: AutomatizationResult): void {
    let finalString = '';
    const tagParts = automatizationResult.analyzed_text.match(
      /[^<]+<\s*p\s+score=[\"\'][^\"\']+[\"\']\s+class=[\"\'][^\"\']+[\"\']\s*>[^<]+<\s*\/p\s*>/g);
    console.log(tagParts);
    for (const tagPart of tagParts){
        const score = Number(tagPart.split('score="')[1].split('"')[0]);
        console.log(tagPart);
        if (score >= threshold) {
            finalString = finalString + tagPart.replace(/class=[\"\'][^\"\']+[\"\']/, 'class="relevant-word chosen-relevant-word"');
        } else {
          finalString = finalString + tagPart.replace(/class=[\"\'][^\"\']+[\"\']/, 'class="relevant-word deny-relevant-word"');
        }
    }
    automatizationResult.analyzed_text = finalString;
  }
}
