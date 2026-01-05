import { Routes } from '@angular/router';
import { Welcome } from './pages/welcome/welcome';
import { LoginTeacherComponent } from './pages/teacher/login/login';
import { RegisterTeacherComponent } from './pages/teacher/registration/registration';
import { WelcomeTeacher } from './pages/teacher/welcome/welcome';
import { WelcomeStudent } from './pages/student/welcome/welcome';
import { LoginStudentComponent } from './pages/student/login/login';
import { RegisterStudentComponent } from './pages/student/registration/registration';
import { HomeStudent } from './pages/student/home/home';
import { HomeTeacher } from './pages/teacher/home/home';
import { ProfileTeacher } from './pages/teacher/profile/profile';
import { ProfileStudent } from './pages/student/profile/profile';

import { authGuard } from './auth.guard';


export const routes: Routes = [
    { path: '', component: Welcome },
    { path: 'teacher/login', component: LoginTeacherComponent },
    { path: 'teacher/register', component: RegisterTeacherComponent },
    { path: 'teacher/welcome', component: WelcomeTeacher },
    { path: 'student/login', component: LoginStudentComponent },
    { path: 'student/register', component: RegisterStudentComponent },
    { path: 'student/welcome', component: WelcomeStudent },
    { path: 'student/home', component: HomeStudent, canActivate: [authGuard] },
    { path: 'teacher/home', component: HomeTeacher, canActivate: [authGuard] },
    { path: 'student/profile', component: ProfileStudent, canActivate: [authGuard] },
    { path: 'teacher/profile', component: ProfileTeacher, canActivate: [authGuard] }
];
