import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appDragAndDrop]'
})
export class DragAndDropDirective {

  @HostBinding('class.fileover') fileOver: boolean;
  @Output() fileDropped = new EventEmitter<any>();
  
  constructor() { }

  @HostListener('dragover', ['$event']) onDragOver(event) {
    event.preventDefault();
    event.stopPropagation();
    console.log("Drag over");
  }

  @HostListener('dragleave', ['$event']) onDragLeave(event) {
    event.preventDefault();
    event.stopPropagation();
    console.log("Drag leave");
  }

  @HostListener('drop', ['$event']) onDrop(event) {
    event.preventDefault();
    event.stopPropagation();
    console.log("Drag leave");
    const files = event.dataTransfer.files;
  
    if(files.length > 0) {
      this.fileDropped.emit(files);
    }
    /*
    for(var i=0; i<files.length; i++) {
      if(this.filesToUpload == null){
        this.uploadedFiles = [];
      }
      console.log('HERE');
      this.uploadedFiles.push(files[i]);
      this.fileDropped.emit(files);
      console.log(files[i].name);
      console.log(files[i].text().then(content => console.log(content)));
    }
    */
  }
}
