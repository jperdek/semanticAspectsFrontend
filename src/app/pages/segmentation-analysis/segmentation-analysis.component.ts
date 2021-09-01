import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FileModel } from '../../models/fileModel';
import { BasicSegmentationMethodsService } from '../../services/segmentation/basic-segmentation-methods.service';

@Component({
  selector: 'app-segmentation-analysis',
  templateUrl: './segmentation-analysis.component.html',
  styleUrls: ['./segmentation-analysis.component.css']
})
export class SegmentationAnalysisComponent {

  @Input()
  files: FileModel[];

  cetdFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private basicSegmentationMethodsService: BasicSegmentationMethodsService) {
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
}
