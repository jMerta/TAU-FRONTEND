import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInComponent } from './sign-in.component';
import {AuthGuard} from '../../auth/auth.guard';
import {AppComponent} from '../../app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {HeaderComponent} from '../../home/header/header.component';
import {AuthInterceptor} from '../../auth/auth.interceptor';
import {UserComponent} from '../user.component';
import {DashboardComponent} from '../../dashboard/dashboard.component';
import {BrowserModule} from '@angular/platform-browser';
import {FooterComponent} from '../../home/footer/footer.component';
import {HomeComponent} from '../../home/home/home.component';
import {SignUpComponent} from '../sign-up/sign-up.component';
import {UserService} from '../shared/user.service';
import {APP_BASE_HREF} from '@angular/common';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {User} from '../shared/user.model';
const appRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: 'home', component: HomeComponent},
  { path: 'login', component: UserComponent,
    children: [{ path: '', component: SignInComponent} ]},
  { path: 'register', component: UserComponent,
    children: [{ path: '', component: SignUpComponent} ]},

  // otherwise redirect to home
  { path: '**', redirectTo: 'home' }
];

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        FooterComponent,
        HeaderComponent,
        HomeComponent,
        UserComponent,
        SignUpComponent,
        SignInComponent,
        DashboardComponent
      ],
      imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),
        BrowserAnimationsModule,
        ToastrModule.forRoot({
          timeOut: 5000,
          positionClass: 'toast-bottom-right',
          preventDuplicates: true,
        })
      ],
      providers: [UserService, AuthGuard,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true
        },
        {provide: APP_BASE_HREF, useValue : '/'}],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should login properly', function () {
    const body = new User();

    body.username = 'username';
    body.password = 'password';
    expect(component.OnSubmit(body.username, body.password).subscribe(
      (successResult) => {
        expect(successResult.status).toBe(200);
      }));
  });
});
