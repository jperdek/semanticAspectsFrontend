import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthManagerService } from '../authentification/auth-manager.service';

@Injectable({
  providedIn: 'root'
})
export class BasicSegmentationMethodsService {

  private cetdApiPart: string = "/segmentationAnalysis/CETD/";
  constructor(private authManagerService: AuthManagerService) { }

  public cetdExtractor(content: string, methods: string[]) {
    const httpParameters = new HttpParams();

    if (methods.length === 0) {
      return this.authManagerService.perform('post', this.cetdApiPart + 'all', httpParameters, content);
    } else {
      return this.authManagerService.perform('post', this.cetdApiPart + methods.toString(), httpParameters, content);
    }
  }
}
