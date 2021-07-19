import { Component, HostListener, OnInit } from '@angular/core';
import { SharedFilesForAnalysisService } from 'src/app/shared-files-for-analysis.service';

//USED RESOURCE: https://github.com/progtarek/angular-drag-n-drop-directive
@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css', './file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  filesToUpload: FileList | null = null;
  uploadedFiles: any[] = [];

  constructor() { }

  ngOnInit(): void {
    SharedFilesForAnalysisService.setReference(this.uploadedFiles);
  }

  handleFileInput(files: FileList) {
      this.filesToUpload = files;
      this.printContent(files);

      this.uploadFilesSimulator(0);
  }

  printContent(files: FileList){
    for(var i=0; i<this.filesToUpload.length; i++){
      var processedFile: any = this.filesToUpload.item(i);
      processedFile.progress = 0;
      this.uploadedFiles.push(processedFile);
      console.log(processedFile.type); // obtain type - not available
      //console.log(processedFile.text().then(value=> { console.log(value)})); // obtain content
      console.log(processedFile.name); // obtain name
      //console.log(processedFile.arrayBuffer().then(value => { console.log(value)})); // obtain buffer with data
    }
  }

  onFileDropped($event) {
    this.prepareFilesList($event);
  }

  fileBrowseHandler(files) {
    this.prepareFilesList(files);
  }

  deleteFile(index: number) {
    if (this.uploadedFiles[index].progress < 100) {
      console.log("Cannot delete file, because upload is in progress.");
      return;
    }
    this.uploadedFiles.splice(index, 1);
  }

  uploadFilesSimulator(fileIndex: number) {
    setTimeout(() => {
      if (fileIndex === this.uploadedFiles.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.uploadedFiles[fileIndex] == undefined || this.uploadedFiles[fileIndex].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(fileIndex + 1);
          } else {
            this.uploadedFiles[fileIndex].progress += 5;
          }
        }, 200);
      }
    }, 1000);
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>) {
    for (const processedFile of files) {
      processedFile.progress = 0;
      this.uploadedFiles.push(processedFile);
    }
   // this.fileDropEl.nativeElement.value = "";
    this.uploadFilesSimulator(0);
  }

  formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
}
