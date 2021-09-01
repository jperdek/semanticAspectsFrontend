import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthManagerService } from '../authentification/auth-manager.service';

@Injectable({
  providedIn: 'root'
})
export class SomSegmentationMethodService {

  private readonly somApiPart = '/segmentationAnalysis/SOM/';
  private readonly createSOM = 'createTree';
  private readonly updateSOM = 'updateTree';
  private readonly extractSOM = 'extractFromTree';

  constructor(private authManagerService: AuthManagerService) { }


  public createSOMTree(content: string): Promise<any> {
    const httpParameters = new HttpParams();

    return this.authManagerService.perform('post', this.somApiPart + this.createSOM, httpParameters, content);
  }

  public updateSOMTree(templateFileContent: string): Promise<any> {
    const httpParameters = new HttpParams();

    return this.authManagerService.perform('post', this.somApiPart + this.updateSOM, httpParameters, templateFileContent);
  }

  public extractFromSOMTree(content: string): Promise<any> {
    const httpParameters = new HttpParams();

    return this.authManagerService.perform('post', this.somApiPart + this.extractSOM, httpParameters, content);
  }
}
