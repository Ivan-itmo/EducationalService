import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WelcomePage from './WelcomePage';
import StudentWelcome from "./student/StudentWelcome";
import TeacherWelcome from "./teacher/TeacherWelcome";
import LoginT from './teacher/LoginT';
import RegistrationT from './teacher/RegistrationT';

function App() {
    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<WelcomePage />}></Route>
            <Route path="/student" element={<StudentWelcome />}></Route>
            <Route path="/teacher" element={<TeacherWelcome />}></Route>
            <Route path = "/teacher/login" element={<LoginT/>}></Route>
            <Route path = "/teacher/registration" element={<RegistrationT/>}></Route>
        </Routes>
    </BrowserRouter>

}

export default App;
