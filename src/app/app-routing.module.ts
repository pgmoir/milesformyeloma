import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { StatsComponent } from './stats/stats.component';
import { MilesComponent } from './miles/miles.component';
import { MyMilesComponent } from './my-miles/my-miles.component';
import { RegisterEmailComponent } from './auth/register-email/register-email.component';
import { LoginEmailComponent } from './auth/login-email/login-email.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'login-email', component: LoginEmailComponent },
  { path: 'register-email', component: RegisterEmailComponent },
  { path: 'stats', component: StatsComponent },
  { path: 'feedback', component: FeedbackComponent },
  { path: 'miles', component: MilesComponent },
  { path: 'my-miles', component: MyMilesComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
