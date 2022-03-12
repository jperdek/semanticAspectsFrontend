import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-feedback',
  templateUrl: './user-feedback.component.html',
  styleUrls: ['./user-feedback.component.scss']
})
export class UserFeedbackComponent implements OnInit {

  qualityRate = 3.0;
  constructor() { }

  ngOnInit(): void {
  }

}
