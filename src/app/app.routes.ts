import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders }  from '@angular/core';

export const routes:Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);