import { Injectable } from '@angular/core';
import { FileModel } from '../models/fileModel';

@Injectable({
  providedIn: 'root'
})
export class SharedFilesForAnalysisService {

  private static uploadedFiles: FileModel[] = [];

  constructor() { }

  public static setReference(uploadedFiles: FileModel[]): void {
    SharedFilesForAnalysisService.uploadedFiles = uploadedFiles;
  }

  public static getUploadedFiles(): FileModel[] {
    return SharedFilesForAnalysisService.uploadedFiles;
  }
}
