import React from 'react';
import {useState} from 'react';
import {useNavigate } from 'react-router-dom';
import "../css/WelcomePage-style.css";

function WelcomePage() {
    const navigation = useNavigate();

    function goToStudent () {
        navigation('/student');
    }

    function goToTeacher () {
        navigation('/teacher');
    }

    return (
        <div className="welcome-page">
            <div className="welcome-container">
                <h1>Добро пожаловать на платформу!</h1>
                <h2 className="welcome-title">Выберите свою роль</h2>
            </div>
            <div className="role-buttons">
                <button onClick={goToStudent}>Я ученик</button>
                <button onClick={goToTeacher}>Я преподаватель</button>
            </div>
        </div>
    );

}

export default WelcomePage;