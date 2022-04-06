import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorSnackbarComponent } from 'src/app/components/snackbars/error-snackbar/error-snackbar.component';
import { InfoSnackbarComponent } from 'src/app/components/snackbars/info-snackbar/info-snackbar.component';
import { SOMUsageType } from 'src/app/models/somSettings';
import { SomSegmentationMethodService } from 'src/app/services/segmentation/som-segmentation-method.service';
import { FileModel } from '../../models/fileModel';
import { BasicSegmentationMethodsService } from '../../services/segmentation/basic-segmentation-methods.service';

@Component({
  selector: 'app-segmentation-analysis',
  templateUrl: './segmentation-analysis.component.html',
  styleUrls: ['./segmentation-analysis.component.scss']
})
export class SegmentationAnalysisComponent {

  @Input()
  files: FileModel[];

  somTemplateFileReference: FileModel = {
    progress: 100,
    showed: true,
    textResult: undefined,
    appliedSegmentation: true,
    segmentationMethod: 'None',
    disallowedMethods: [],
    name: 'somTemplate',
    size: 1,
    type: 'text/plain',
    lastModified: Date.now().valueOf(),
    stream: null,
    arrayBuffer: null,
    slice: null,
    text: null,
    somSettings: undefined,
    webkitRelativePath: ''
  };

  cetdFormGroup: FormGroup;
  analyzeTemplateFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private basicSegmentationMethodsService: BasicSegmentationMethodsService,
    private somSegmentationMethod: SomSegmentationMethodService,
    private matSnackBar: MatSnackBar) {
    this.cetdFormGroup = this.formBuilder.group({
      cetdNormalMethod: ['', ],
      cetdEdgareMethod: ['', ],
      cetdVariantMethod: ['', ],
    });
    this.analyzeTemplateFormGroup = this.formBuilder.group({
      sliderPercentageFormControl: [0.5, {value: 0.5, disabled: false}],
    });
  }

  public useCETDSegmentation(): void {
    if (this.cetdFormGroup.valid){
      InfoSnackbarComponent.openSnackBar(this.matSnackBar, 'CETD segmentation has started!');
      const methods = [];
      if (this.cetdFormGroup.controls.cetdNormalMethod.value){ methods.push('normal'); }
      if (this.cetdFormGroup.controls.cetdEdgareMethod.value){ methods.push('edgare'); }
      if (this.cetdFormGroup.controls.cetdVariantMethod.value){ methods.push('variant'); }
      for (const file of this.files){
        if (!file.disallowedMethods.includes('CETD')){
          this.basicSegmentationMethodsService.cetdExtractor(file.textResult, methods).then(result => {
            file.segmentationMethod = 'cetd';
            file.appliedSegmentation = true;
            file.textResult = JSON.stringify(result);
          }).catch(error => {
            ErrorSnackbarComponent.openSnackBar(this.matSnackBar, 'Error occured during cetd analysis: ' + error);
          });
        }
      }
    } else {
      ErrorSnackbarComponent.openSnackBar(this.matSnackBar, 'Error: please fill form correctly!');
    }
  }

  public useTextSegmentation(): void {
    InfoSnackbarComponent.openSnackBar(this.matSnackBar, 'Text segmentation has started!');
    for (const file of this.files){
      if (!file.disallowedMethods.includes('all_text')){
        this.basicSegmentationMethodsService.textExtractor(file.textResult).then(result => {
          file.segmentationMethod = 'all_text';
          file.appliedSegmentation = true;
          file.textResult = JSON.stringify(result);
        }).catch(error => {
          ErrorSnackbarComponent.openSnackBar(this.matSnackBar, 'Error occured during text analysis: ' + error);
        });
      }
    }
  }

  public useSOMSegmentation(): void {
    InfoSnackbarComponent.openSnackBar(this.matSnackBar, 'SOM segmentation has started!');
    const mergedFiles = this.somSegmentationMethod.mergeContentFiles(this.files, SOMUsageType.forDomain);
    if (this.somTemplateFileReference.textResult === undefined) {
      this.somSegmentationMethod.createSOMTree(mergedFiles).then(result => {
        // USE RESULT
        console.log(result);
      }).catch(error => {
        ErrorSnackbarComponent.openSnackBar(this.matSnackBar, 'Error occured during SOM segmentation analysis: ' + error);
      });
    } else {
      this.somSegmentationMethod.updateSOMTree(mergedFiles, this.somTemplateFileReference.textResult).then(result => {
        // USE RESULT
      }).catch(error => {
        ErrorSnackbarComponent.openSnackBar(this.matSnackBar, 'Error occured during SOM segmentation analysis: ' + error);
      });
    }
  }

  public somTemplateResults(): void {
    const mergedFiles = this.somSegmentationMethod.mergeContentFiles(this.files, SOMUsageType.forDomain);
    InfoSnackbarComponent.openSnackBar(this.matSnackBar, 'SOM Template analysis has started!');
    if (this.somTemplateFileReference.textResult === undefined) {
      this.somSegmentationMethod.createSOMTree(mergedFiles).then(result => {
        console.log(result);
      }).catch(error => {
        ErrorSnackbarComponent.openSnackBar(this.matSnackBar, 'Error occured during SOM segmentation analysis: ' + error);
      });
    } else {
      this.somSegmentationMethod.updateSOMTree(mergedFiles, this.somTemplateFileReference.textResult).then(result => {
        console.log(result);
      }).catch(error => {
        ErrorSnackbarComponent.openSnackBar(this.matSnackBar, 'Error occured during SOM segmentation analysis: ' + error);
      });
    }
  }

  public analyzeTemplate(): void {
    if (this.analyzeTemplateFormGroup.valid) {
      InfoSnackbarComponent.openSnackBar(this.matSnackBar, 'Template analysis has started!');
      const acceptPercentage = this.analyzeTemplateFormGroup.controls.sliderPercentageFormControl.value;
      if (this.somTemplateFileReference.textResult !== undefined) {
        this.somSegmentationMethod.extractFromSOMTree(this.somTemplateFileReference.textResult, acceptPercentage).then(result => {
          console.log(result);
        }).catch(error => {
          ErrorSnackbarComponent.openSnackBar(this.matSnackBar, 'Error occured during SOM segmentation analysis: ' + error);
        });
      } else {
        ErrorSnackbarComponent.openSnackBar(this.matSnackBar, 'Error: can\'t analyzed empty template!');
      }
    } else {
      ErrorSnackbarComponent.openSnackBar(this.matSnackBar, 'Error: please fill form correctly!');
    }
  }

  public formatPercentageLabel(value: number): string {
    return value.toString();
  }
}
