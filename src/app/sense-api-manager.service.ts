import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthManagerService } from './auth-manager.service';

@Injectable({
  providedIn: 'root'
})
export class SenseApiManagerService {

  private senseApiPart: string = "/api/senseAnalysis";
  constructor(private authManagerService: AuthManagerService) { }

  public senseAnalysis(analyzedText: string, window: number) {
    const httpParameters = new HttpParams()
      .set("text", analyzedText)
      .set("k", window.toString());
    console.log(httpParameters.toString());
    return this.authManagerService.perform('get', this.senseApiPart, httpParameters);
  }
}
