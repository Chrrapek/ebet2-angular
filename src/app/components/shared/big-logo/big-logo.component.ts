import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-big-logo',
  template: `
    <div class="content-container">
      <div class="clr-col-12">
        <img src="../../../../assets/logo_b.png" alt="eBet2 logo" class="image-responsive">
      </div>
    </div>
  `,
})
export class BigLogoComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
