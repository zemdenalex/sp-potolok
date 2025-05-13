import React, { useState } from 'react'
import FooterLogo from "/assets/Footer-logo.svg"
import { Link } from 'react-router-dom'
import { X } from 'react-feather'
import Cookies from "js-cookie"
import axios from 'axios'

Cookies.set('message', 'name', 'phone', {expires: 7})

const types = [
  {
    id: '1',
    name: 'Пленка ПВХ',
  },
  {
    id: '2',
    name: 'Освещение',
  },
  {
    id: '3',
    name: 'Вентиляционные решетки',
  },
  {
    id: '4',
    name: 'Кольца',
  },
  {
    id: '5',
    name: 'Профиль',
  },
  {
    id: '6',
    name: 'Клей',
  },
  {
    id: '7',
    name: 'Крепежные материалы',
  },
  {
    id: '8',
    name: 'Платформы',
  },
  {
    id: '9',
    name: 'Комплектующие',
  },
]

const Footer = () => {
  let [callFormShowing, setCallFormShowing] = useState(false)
  let [name, setName] = useState("")
  let [phone, setPhone] = useState("")
  let [message, setMessage] = useState("")
  let [nameCheck, setNameCheck] = useState(false)
  let [phoneCheck, setPhoneCheck] = useState(false)

  function callForm() {
    var Form1 = document.getElementById('form1')
    var Form2 = document.getElementById('form2')
    var ThxForm = document.getElementById('thx-form')
    var InsideForm = document.getElementById('form-inside')
    if (callFormShowing == true) {
      setCallFormShowing(false)
      document.body.style = "margin height overflow"
      Form1.style.display = "none"
      Form2.style.display = "none"
      InsideForm.style.display = "none"
      ThxForm.style.display = "none"
    } else {
      setCallFormShowing(true)
      document.body.style = "margin: 0 height: 100% overflow: hidden"
      Form1.style.display = "block"
      Form2.style.display = "block"
      InsideForm.style.display = "block"
      ThxForm.style.display = "none"
    }
  }

  const handleNameChange = (e) => {
    setName(e.target.value)
    if (e.target.value != '') setNameCheck(true)
    else setNameCheck(false)
  }
  
  const handlePhoneChange = (e) => {
    setPhone(e.target.value)
    if (e.target.value != '') setPhoneCheck(true)
    else setPhoneCheck(false)
  }

  function thxForm() {
    document.getElementById('form-inside').style.display = 'none'
    document.getElementById('thx-form').style.display = 'block'
  }
  
  async function sendForm() {
    if (nameCheck){
      if (phoneCheck){
        document.getElementById('form-phone').style.borderColor = "rgb(156 163 175 / var(--tw-border-opacity))"
        document.getElementById('form-name').style.borderColor = "rgb(156 163 175 / var(--tw-border-opacity))"
        axios.post('http://localhost:8080/emailphone', {
          message: message,
          name: name,
          phone: phone
        }).then(response => {
          thxForm()
        }).catch(e => {
          console.log(e)
        })
      } else {
        document.getElementById('form-phone').style.borderColor = 'red'
        if (nameCheck) document.getElementById('form-name').style.borderColor = "rgb(156 163 175 / var(--tw-border-opacity))"
      } 
    } else {
      document.getElementById('form-name').style.borderColor = 'red'
      if (phoneCheck) document.getElementById('form-phone').style.borderColor = "rgb(156 163 175 / var(--tw-border-opacity))"
    }
  }

  return (
    <div className="bg-main relative z-40 text-white grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 justify-between p-12 text-center md:text-left">
      <Link to="/" className="max-sm:mb-3 max-sm:w-full flex justify-center items-center p-2">
        <img className='' src={FooterLogo} alt="footer-logo" />
      </Link>

      <div className='max-sm:mt-4'>
        <Link to="/products">
          <p className='text-5 hover:text-gray-400 duration-200'><b>Каталог</b></p>
        </Link>
        <ul className='grid grid-cols-1 sm:grid-cols-[1fr_1fr] grid-flow-row gap-3 mt-2'>
          {
            types.map((item, i) => <Link key={i} to={'/products/' + item.name}>
              <li key={i}>
                <p className='text-4 hover:text-gray-400 duration-200'>
                  {item.name}
                </p>
              </li>
            </Link>)
          }
        </ul>
      </div>

      <Link to="products/Услуги">
        <p className='text-5 hover:text-gray-400 duration-200'><b>Услуги</b></p>
        <ul className='text-4'>
          <li className='mt-2 hover:text-gray-400 duration-200'>Монтаж натяжного потолка под ключ</li>
          <li className='mt-2 hover:text-gray-400 duration-200'>Ремонт натяжного потолка</li>
          <li className='mt-2 hover:text-gray-400 duration-200'>Слив воды с натяжного потолка</li>
        </ul>
      </Link>
      <div className='flex flex-col items-center md:items-end justify-around text-center md:text-right text-4'>
          <div className=''>
            <p className=''>город Сергиев Посад, проспект Красной Армии, д. 91Б</p>
            <p className='mt-2'>8-996-360-55-25</p>
          </div>
          <button>
              <div onClick={() => callForm()} className='mt-4 text-main bg-white rounded-2xl w-[200px] h-[50px] items-center flex justify-center hover:bg-gray-300 duration-300'>
                <p className='text-5 text-center'>Обратный звонок</p>
              </div>
            </button>
      </div>


      <div id='form1' onClick={() => callForm()} className=' hidden opacity-50 z-10 w-full h-full bg-gray-600 fixed top-0 left-0'></div>
      <div id="form2" className='rounded-2xl px-8 text-black pt-3 pb-5 hidden z-20 justify-center  bg-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
        <form>  
          <div id='form-inside'>
            <div>
              <div className='flex justify-between items-center'>
                <p className='text-[32px] text-black'>Обратный звонок</p>
                <button onClick={() => callForm()} className='hover:text-gray-400 w-5 h-5'><X></X></button>
              </div>
              <p className='text-[14px] text-gray-500'>Закажите звонок и мы Вам перезвоним</p>
            </div>
            <div className='mt-4'>
              <p className='text-5'>Имя</p>
              <input 
                onChange={(e) => handleNameChange(e)}
                type='text'
                id='form-name'
                placeholder='Введите имя'
                name="name"
                autoComplete='off'
                required
                className="pl-2 w-60 sm:w-[500px] h-[40px] border placeholder:text-[14px] border-gray-400 bg-gray-50  rounded-lg placeholder:text-xs text-xs font-semibold placeholder-gray-400 text-black"
              />
            </div>
            <div className='mt-4'>
              <p className='text-5'>Телефон</p>
              <input 
                onChange={(e) => handlePhoneChange(e)}
                type='text'
                id='form-phone'
                placeholder='+7 940 500 55 99'
                name="phone"
                autoComplete='off'
                required
                className="pl-2 placeholder:text-[14px] w-60 sm:w-[500px] h-[40px] border border-gray-400 bg-gray-50  rounded-lg placeholder:text-xs text-xs font-semibold placeholder-gray-400 text-black"
              />
            </div>
            <div className='mt-4'>
              <p className='text-5'>Комментарий</p>
              <textarea 
                type='text'
                onChange={(e) => setMessage(e.target.value)}
                placeholder='Задайте свой вопрос или опишите, что Вас заинтересовало'
                name="name"
                autoComplete='off'
                className="pt-2 pl-2 align-text-top placeholder:text-[14px] w-60 sm:w-[500px] h-36 border border-gray-400 bg-gray-50 flex items-start rounded-lg placeholder:text-xs text-xs font-semibold placeholder-gray-400 text-black break-words text-wrap"
                ></textarea>
            </div>
            <div className='flex justify-end mt-3'>
              <button 
                onClick={() => sendForm()}
                className='flex justify-center items-center bg-gradient-to-r from-main to-secondary text-white text-5 h-[50px] w-[200px] rounded-xl'>
                <p>Заказать звонок</p>
              </button>
            </div>
          </div>
        </form>
        <div id='thx-form' className='hidden'>
          <div className='flex justify-center items-center'>
            <p className='text-5 font-semibold text-black text-center'>Спасибо, что заполнили форму<br/>Мы перезвоним вам как только появится свободный оператор</p>
          </div>
          <div className='mt-10 flex justify-center items-center'>
            <button onClick={() => callForm()} className='flex justify-center items-center bg-gradient-to-r from-main to-secondary text-white text-5 h-[50px] w-30 rounded-xl'>
                <p className=' text-5 text-center'>Закрыть</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
