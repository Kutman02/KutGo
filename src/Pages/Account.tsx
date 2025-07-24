import React from 'react';

function Account() {
  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5', padding: '40px 0' }}>
      <div
        style={{
          maxWidth: 500,
          margin: '0 auto',
          background: '#fff',
          borderRadius: 8,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          padding: 32,
        }}>
        <h1 style={{ marginBottom: 24 }}>Личный кабинет</h1>
        <div style={{ marginBottom: 16 }}>
          <strong>Имя пользователя:</strong> Иван Иванов
        </div>
        <div style={{ marginBottom: 16 }}>
          <strong>Email:</strong> ivan@example.com
        </div>
        <div style={{ marginBottom: 16 }}>
          <strong>Статус:</strong> Активен
        </div>
        <button
          style={{
            padding: '10px 24px',
            background: '#1976d2',
            color: '#fff',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer',
          }}>
          Выйти
        </button>
      </div>
    </div>
  );
}

export default Account;
