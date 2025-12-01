// frontend/src/App.js
import React, { useState } from 'react';

function App() {
    const [response, setResponse] = useState('');

    const pingBackend = async () => {
        try {
            // ВАЖНО: путь должен включать имя контекста — /eduplatform
            const res = await fetch('/eduplatform/api/hello');
            const text = await res.text();
            setResponse(text);
        } catch (err) {
            setResponse('Ошибка: ' + err.message);
        }
    };

    return (
        <div style={{
            padding: '40px',
            fontFamily: 'sans-serif',
            textAlign: 'center',
            maxWidth: '600px',
            margin: '0 auto'
        }}>
            <h1>🎓 EduPlatform</h1>
            <button
                onClick={pingBackend}
                style={{
                    padding: '10px 20px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }}
            >
                Пингануть бэкенд
            </button>

            {response && (
                <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#e8f5e9' }}>
                    <strong>Ответ:</strong> {response}
                </div>
            )}
        </div>
    );
}

export default App;