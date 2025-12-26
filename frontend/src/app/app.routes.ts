import { Routes } from '@angular/router';
import { Welcome } from './pages/welcome/welcome';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/registration/registration';

export const routes: Routes = [
    { path: '', component: Welcome },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent }
];
