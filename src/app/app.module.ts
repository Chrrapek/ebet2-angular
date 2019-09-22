import {HttpClient, HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule, Routes} from '@angular/router';
import {ClarityModule, ClrCommonFormsModule, ClrFormsModule, ClrInputModule} from '@clr/angular';
import {AppComponent} from './app.component';
import {LoginComponent} from './components/login/login.component';
import {BigLogoComponent} from './components/shared/big-logo/big-logo.component';
import {UserService} from './services/user.service';
import {RegisterComponent} from './components/register/register.component';
import {TopbarComponent} from './components/topbar/topbar.component';
import {LeaguesModule} from './modules/leagues/leagues.module';

export const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'leagues', loadChildren: () => LeaguesModule}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BigLogoComponent,
    RegisterComponent,
    TopbarComponent,
  ],
  imports: [
    FormsModule,
    RouterModule.forRoot(routes),
    BrowserModule,
    ClarityModule,
    ClrFormsModule,
    ClrCommonFormsModule,
    ClrInputModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    LeaguesModule
  ],
  providers: [UserService, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule {

}
