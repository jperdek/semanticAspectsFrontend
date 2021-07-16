import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  filesToUpload: FileList | null = null;

  constructor() { }

  ngOnInit(): void {
  }

  handleFileInput(files: FileList) {
      this.filesToUpload = files;
  }

}
