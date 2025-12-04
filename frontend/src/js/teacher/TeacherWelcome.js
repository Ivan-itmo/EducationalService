import React from 'react';
import {useNavigate} from 'react-router-dom';


function TeacherWelcome(){
    const navigate = useNavigate();

    const login = () => {
        navigate("/teacher/login");
    }

    const registration = () => {
        navigate("/teacher/registration");
    }

    return (
        <div>
            <h1 className= "titleH1"> Добро пожвловать учитель!</h1>
            <div>
                <h2 className="titleH2"> Пожалуйста, авторизуйтесь</h2>
            </div>
            <div className="button-group">
                <button className="login" onClick={login}> Войти</button>
                <button className="registration" onClick={registration}> Регистрация</button>
            </div>
        </div>
    )
}

export default TeacherWelcome;