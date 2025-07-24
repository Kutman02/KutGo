import { useState } from 'react';

function Help() {
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Здесь можно добавить отправку сообщения на сервер
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-8 flex flex-col items-center">
        <img
          src="https://keephere.ru/get/fNDPS_qAD93/o/photo.jpg"
          alt="Support"
          className="w-20 h-20 mb-4"
        />
        <h1 className="text-3xl font-extrabold text-blue-700 mb-2">Связаться с поддержкой</h1>
        <p className="text-gray-600 text-center mb-6 max-w-lg">
          Наша команда поддержки всегда готова помочь вам. Опишите вашу проблему или вопрос, и мы
          ответим в кратчайшие сроки.
        </p>
        {submitted ? (
          <div className="bg-green-100 text-green-700 px-6 py-4 rounded-lg text-center font-medium">
            Спасибо за обращение! Мы свяжемся с вами по электронной почте в ближайшее время.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
            <input
              type="email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Ваш email для обратной связи"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows={6}
              placeholder="Опишите вашу проблему или вопрос..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition text-lg shadow-md">
              Отправить обращение
            </button>
          </form>
        )}
        <div className="mt-8 w-full border-t pt-6 text-center text-gray-500 text-sm">
          <div className="mt-4">
            <span>Или напишите нам напрямую: </span>
            <a href="mailto:support@kutmovies.com" className="text-blue-600 hover:underline">
              support@kutmovies.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Help;
