import {Component} from '@angular/core';

@Component({
  selector: 'app-topbar',
  template: `
      <header class="header-4">
          <div class="branding">
              <a href="" class="nav-link">
                  <span class="title">eBet2</span>
              </a>
          </div>
          <div class="header-nav">
              <a href="javascript://" class="active nav-link nav-text">Ligi</a>
              <!-- TODO add more -->
          </div>
          <div class="header-actions">
              <clr-dropdown>
                  <button class="nav-icon" clrDropdownTrigger aria-label="toggle settings menu">
                      <clr-icon shape="cog"></clr-icon>
                      <clr-icon shape="caret down"></clr-icon>
                  </button>
                  <clr-dropdown-menu *clrIfOpen clrPosition="bottom-right">
                      <a href="#" clrDropdownItem>About</a>
                      <a href="#" clrDropdownItem>Log out</a>
                      <!-- TODO implement -->
                  </clr-dropdown-menu>
              </clr-dropdown>
          </div>
      </header>
  `,
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent {

  constructor() {

  }
}
