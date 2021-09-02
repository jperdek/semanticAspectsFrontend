import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
    disallowedMethods: {},
    name: 'somTemplate',
    size: 1,
    type: 'text/plain',
    lastModified: Date.now().valueOf(),
    stream: null,
    arrayBuffer: null,
    slice: null,
    text: null
  };

  cetdFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private basicSegmentationMethodsService: BasicSegmentationMethodsService,
    private somSegmentationMethod: SomSegmentationMethodService) {
    this.cetdFormGroup = this.formBuilder.group({
      cetdNormalMethod: ['', ],
      cetdEdgareMethod: ['', ],
      cetdVariantMethod: ['', ],
    });
  }

  public useCETDSegmentation(): void {
    if (this.cetdFormGroup.valid){
      const methods = [];
      if (this.cetdFormGroup.controls.cetdNormalMethod.value){ methods.push('normal'); }
      if (this.cetdFormGroup.controls.cetdEdgareMethod.value){ methods.push('edgare'); }
      if (this.cetdFormGroup.controls.cetdVariantMethod.value){ methods.push('variant'); }
      for (const file of this.files){
        this.basicSegmentationMethodsService.cetdExtractor(file.textResult, methods).then(result => {
          file.segmentationMethod = 'cetd';
          file.appliedSegmentation = true;
          file.textResult = JSON.stringify(result);
          console.log(result);
        }).catch(error => console.log('Error occured during cetd analysis: ' + error));
      }
    } else {
      console.log('Error: cetd form group is invalid!');
    }
  }

  public useTextSegmentation(): void {
    for (const file of this.files){
      this.basicSegmentationMethodsService.textExtractor(file.textResult).then(result => {
        file.segmentationMethod = 'cetd';
        file.appliedSegmentation = true;
        file.textResult = JSON.stringify(result);
        console.log(result);
      }).catch(error => console.log('Error occured during text analysis: ' + error));
    }
  }

  public useSOMSegmentation(): void {
    const mergedFiles = this.somSegmentationMethod.mergeContentFiles(this.files);
    if (this.somTemplateFileReference.textResult === undefined) {
      this.somSegmentationMethod.createSOMTree(mergedFiles).then(result => {
        console.log(result);
      }).catch(error => console.log('Error occured during SOM segmentation analysis: ' + error));
    } else {
      this.somSegmentationMethod.updateSOMTree(mergedFiles, this.somTemplateFileReference.textResult).then(result => {
        console.log(result);
      }).catch(error => console.log('Error occured during SOM segmentation analysis: ' + error));
    }
  }
}
