import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";

function LoginT(){
    const navigate = useNavigate();
    const[login, setLogin] = useState('');
    const[password, setPassword] = useState('');
    const[error, setError] = useState('');

    const changeLogin = (e) => {
          setLogin(e.target.value);
    }

    const changePassword = (e) => {
        setPassword(e.target.value);
    }

    function handleSend(e) {
        e.preventDefault();
        setError('');

        fetch('http://localhost:8080/api/auth/login', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({login, password})
        })
            .then(response => {
                if (response.ok){
                    return response.json();
                }
                else if (response.status === 400){
                    setError("Неверный пароль или логин");
                    throw new Error("Неверный пароль или логин");
                }
                else if (response.status === 401){
                    setError("Ошибка запроса");
                    throw new Error("Неверный пароль или логин");
                }
            })
            .then(data =>{
            navigate('/teacher/dashboard');
        })
            .catch(err => {
            console.error(err);
        })

    }

    const goRegistration = () => {
        navigate('/teacher/registration')
    }


    return(
        <div>
            <form onSubmit={handleSend}>
                <label>
                    <p>Введите логин</p>
                    <input type="text" value={login} onChange={changeLogin}/>
                </label>
                <label>
                    <p>Введите пароль</p>
                    <input type="password" value={password} onChange={changePassword}/>
                </label>
                <button type="submit">Войти</button>
                <div className = "error-message"> {error}</div>
            </form>
            <div>
                <h2> Нет аккаунта?</h2>
                <button type="button" onClick={goRegistration}>
                    Зарегистрироваться
                </button>
            </div>
        </div>
    )
}

export default LoginT;