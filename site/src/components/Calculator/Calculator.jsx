import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Calculator = () => {
  const [inputValue1, setInputValue1] = useState('');
  const [inputValue2, setInputValue2] = useState('');
  const [inputValue3, setInputValue3] = useState('');

  const handleInputChange1 = (event) => {
    setInputValue1(event.target.value);
  };

  const handleInputChange2 = (event) => {
    setInputValue2(event.target.value);
  };

  const handleInputChange3 = (event) => {
    setInputValue3(event.target.value);
  };

  const summ = inputValue1 * 719 + inputValue2 * 590 + inputValue3 * 50;

  return (
    <div>
      <div className="my-2 border-2 py-5 px-6 border-black rounded-2xl sm:grid sm:grid-cols-[3fr_1px_2fr]">
        <div>
          <div className='my-1'>
            <p className="sm:text-xl"><b>Площадь поверхности</b></p>
            <input className="input-1 border-[1px] border-[#A9A9A9] rounded-md sm:rounded-lg text-[14px] px-3 sm:py-2 py-1 w-full sm:w-[90%] mt-1 bg-slate-50" type='number' value={inputValue1} onChange={handleInputChange1} placeholder="Введите число, м2"/>
          </div>
          <div className='my-1'>
            <p className="sm:text-xl"><b>Количество светильников</b></p>
            <input className="input-2 border-[1px] border-[#A9A9A9] rounded-md sm:rounded-lg text-[14px] px-3 py-1 sm:py-2 w-full sm:w-[90%] mt-1 bg-slate-50" type='number' value={inputValue2} onChange={handleInputChange2} placeholder="Введите число"/>
          </div>
          <div className='my-1'>
            <p className="sm:text-xl"><b>Дополнительные углы</b></p>
            <input className="input-3 border-[1px] border-[#A9A9A9] rounded-md sm:rounded-lg text-[14px] px-3 sm:py-2 py-1 w-full sm:w-[90%] mt-1 bg-slate-50" type='number' value={inputValue3} onChange={handleInputChange3} placeholder="Введите количество"/>
            <p className='text-[12px] mt-1'>Доплата за каждый дополнительный угол сверх 4-х начальных</p>
          </div>
        </div>
        <div className="border-l border-black h-[1px] sm:h-5/6 self-center border-t" />
        <div className='relative'>
          <div>
            <p className='sm:text-lg text-right'><b>Итоговая сумма</b></p>
            <p className='sm:mt-6 text-xl sm:text-3xl text-right'><b>{summ} ₽</b></p>
          </div>
          <Link to="/contacts" className='flex justify-end items-end'>
            <button className="sm:absolute max-sm:mt-2 bottom-0 right-0 justify-center items-center main-gradient px-3 py-1 sm:px-4 sm:py-2 rounded-md sm:rounded-lg duration-500 sm:h-12 sm:w-32 hover:opacity-90">
              <p className="text-white text-sm sm:text-xl text-center">Заказать</p>
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Calculator
