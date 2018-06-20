import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FooterComponent } from './home/footer/footer.component';
import { HeaderComponent } from './home/header/header.component';
import {RouterModule, Routes} from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {UserService} from './user/shared/user.service';

const appRoutes: Routes = [
  // { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
   { path: 'home', component: HomeComponent },
   { path: 'login', component: UserComponent,
     children: [{ path: '', component: SignInComponent} ]},
   { path: 'register', component: UserComponent,
     children: [{ path: '', component: SignUpComponent} ]},

  // otherwise redirect to home
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    UserComponent,
    SignUpComponent,
    SignInComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
