import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { from, Observable } from 'rxjs';
import { FileModel } from '../models/fileModel';

@Component({
  selector: 'app-file-or-input',
  templateUrl: './file-or-input.component.html',
  styleUrls: ['./file-or-input.component.css']
})
export class FileOrInputComponent implements OnInit {

  addFileFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.addFileFormGroup = this._formBuilder.group({
      recordFormControl: ['', Validators.required],
      recordNameFormControl: ['', Validators.required],
    });
  }

  @Input()
  files: FileModel[];

  public addRecordToRecords($event: Event): void {
    console.log("here");
    this.files.forEach(file => console.log(file.name));

    $event.preventDefault();
    $event.stopPropagation();
  }

  public getFileContent(loadedFile): void {
    loadedFile.text().then(content => loadedFile.textResult= content).catch(error => console.log(error));
  }
}
