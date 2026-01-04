import { Routes } from '@angular/router';
import { Welcome } from './pages/welcome/welcome';
import { LoginTeacherComponent } from './pages/teacher/login/login';
import { RegisterTeacherComponent } from './pages/teacher/registration/registration';
import { WelcomeTeacher } from './pages/teacher/welcome/welcome';
import { WelcomeStudent } from './pages/student/welcome/welcome';
import { LoginStudentComponent } from './pages/student/login/login';
import { RegisterStudentComponent } from './pages/student/registration/registration';

export const routes: Routes = [
    { path: '', component: Welcome },
    { path: 'teacher/login', component: LoginTeacherComponent },
    { path: 'teacher/register', component: RegisterTeacherComponent },
    { path: 'teacher/welcome', component: WelcomeTeacher },
    { path: 'student/login', component: LoginStudentComponent },
    { path: 'student/register', component: RegisterStudentComponent },
    { path: 'student/welcome', component: WelcomeStudent }
];
