import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedFilesForAnalysisService {

  private static uploadedFiles: any[] = []

  constructor() { }

  static setReference(uploadedFiles: any[]) {
    SharedFilesForAnalysisService.uploadedFiles = uploadedFiles;
  }

  static getUploadedFiles(): any[] {
    return SharedFilesForAnalysisService.uploadedFiles;
  }
}
