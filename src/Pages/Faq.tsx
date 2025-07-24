import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const faqData = [
  {
    question: 'Как сделать заказ?',
    answer: 'Выберите блюда из меню, добавьте их в корзину и перейдите к оформлению заказа.',
  },
  {
    question: 'Сколько длится доставка?',
    answer: 'Обычно доставка занимает от 30 до 60 минут в зависимости от вашего местоположения.',
  },
  {
    question: 'Какие способы оплаты доступны?',
    answer: 'Мы принимаем оплату онлайн картой, через кошельки и наличными при получении заказа.',
  },
  {
    question: 'Как связаться с поддержкой?',
    answer: (
      <>
        Вы можете написать нам на электронную почту <br />
        <a href="mailto:support@kutfood.com" className="text-blue-500 underline">
          support@kutfood.com
        </a>{' '}
        <br />
        или воспользоваться формой обратной связи на сайте: <br />{' '}
        <Link to="/help" className="text-blue-500 underline">
          Связаться с нами
        </Link>
        .
      </>
    ),
  },
];

function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen px-2 py-8 bg-gray-50">
      <h1 className="text-2xl font-bold mb-6 text-center">Часто задаваемые вопросы (FAQ)</h1>
      <div className="w-full max-w-xl space-y-3">
        {faqData.map((item, idx) => (
          <div key={idx} className="bg-white rounded-lg shadow-sm border">
            <button
              className="w-full flex justify-between items-center px-4 py-3 text-left focus:outline-none"
              onClick={() => handleToggle(idx)}
              aria-expanded={openIndex === idx}>
              <span className="text-base font-semibold">{item.question}</span>
              <span className="ml-2 text-xl">{openIndex === idx ? '−' : '+'}</span>
            </button>
            {openIndex === idx && (
              <div className="px-4 pb-4 text-sm text-gray-700">{item.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Faq;
