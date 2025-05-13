import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { persistor } from '../../store'
import { useSelector } from 'react-redux'

localStorage.setItem("checkout_name", '')
localStorage.setItem("checkout_phone", '')
localStorage.setItem("checkout_email", '')
localStorage.setItem("checkout_address", '')


const CheckOutForm = () => {
  const [nameCheck, setNameCheck] = useState(false)
  const [phoneCheck, setPhoneCheck] = useState(false)
  const [addressCheck, setAddressCheck] = useState(false)
  const [successful, setSuccessful] = useState(false)

  const cart = useSelector(state => state.cart)

  const handleNameChange = (e) => {
    localStorage.setItem("checkout_name", e.target.value)
    if (e.target.value != '') setNameCheck(true)
    else setNameCheck(false) 
  }

  const handlePhoneChange = (e) => {
    localStorage.setItem("checkout_phone", e.target.value)
    if (e.target.value != '') setPhoneCheck(true)
    else setPhoneCheck(false) 
  }

  const handleAddressChange = (e) => {
    localStorage.setItem("checkout_address", e.target.value)
    if (e.target.value != '') setAddressCheck(true)
    else setAddressCheck(false) 
  }

  const handleEmailChange = (e) => {
    localStorage.setItem("checkout_email", e.targe.value)
  }

  async function submitCheckOut(e) {
    e.preventDefault()
    if (nameCheck && phoneCheck && addressCheck) {
      axios.post('http://localhost:8080/emailorder', {
        address: localStorage.getItem("checkout_address"),
        email: localStorage.getItem("checkout_email"),
        name: localStorage.getItem("checkout_name"),
        phone: localStorage.getItem("checkout_phone"),
        order: cart.map(({name, amount}) => ({name, quantity: amount})),        
      }).then(response => {
        persistor.purge()
        setSuccessful(true)
      }).catch(e => {
        console.log(e)
      })
    } else {
      if (!nameCheck) document.getElementById('checkout-name').style.borderColor = 'red'
      else document.getElementById('checkout-name').style.borderColor = "rgb(156 163 175 / var(--tw-border-opacity))"
      if (!phoneCheck) document.getElementById('checkout-phone').style.borderColor = 'red'
      else document.getElementById('checkout-phone').style.borderColor = "rgb(156 163 175 / var(--tw-border-opacity))"
      if (!addressCheck) document.getElementById('checkout-address').style.borderColor = 'red'
      else document.getElementById('checkout-address').style.borderColor = "rgb(156 163 175 / var(--tw-border-opacity))"
    }
  }

  return <form className='mt-12' onSubmit={submitCheckOut}>
    <div className='grid grid-cols-1 sm:grid-cols-2 grid-rows-2 gap-8'>
      <div>
        <p className='text-[20px] font-bold text-black mb-2'>ФИО</p>
        <input 
          onChange={(e) => handleNameChange(e)}
          type='text'
          id='checkout-name'
          placeholder='Введите ФИО'
          name="name"
          autoComplete='off'
          required
          className="pl-2 h-[40px] border placeholder:text-[14px] w-full border-gray-400 bg-gray-50  rounded-lg placeholder:text-xs text-xs font-semibold placeholder-gray-400 text-black"
          />
      </div>
      <div>
        <p className='text-[20px] font-bold text-black mb-2'>Email</p>
        <input 
          onChange={(e) => handleEmailChange(e)}
          type='text'
          id='checkout-email'
          placeholder='Введите эл. почту'
          name="name"
          autoComplete='off'
          className="pl-2 h-[40px] border placeholder:text-[14px] w-full border-gray-400 bg-gray-50  rounded-lg placeholder:text-xs text-xs font-semibold placeholder-gray-400 text-black"
          />
      </div>
      <div>
        <p className='text-[20px] font-bold text-black mb-2'>Телефон</p>
        <input 
          onChange={(e) => handlePhoneChange(e)}
          type='text'
          id='checkout-phone'
          placeholder='+7 ('
          name="name"
          autoComplete='off'
          required
          className="pl-2 h-[40px] border placeholder:text-[14px] w-full border-gray-400 bg-gray-50  rounded-lg placeholder:text-xs text-xs font-semibold placeholder-gray-400 text-black"
        />
      </div>
      <div>
        <p className='text-[20px] font-bold text-black mb-2'>Адрес</p>
        <input 
          onChange={(e) => handleAddressChange(e)}
          type='text'
          id='checkout-address'
          placeholder='Введите адрес'
          name="name"
          autoComplete='off'
          required
          className="pl-2 h-[40px] border placeholder:text-[14px] w-full border-gray-400 bg-gray-50  rounded-lg placeholder:text-xs text-xs font-semibold placeholder-gray-400 text-black"
        />
      </div>
    </div>
    <div className='mt-5'>
      <ul>
        {
          cart.map((item, i) => (
            <li key={i}>
              <div className='flex justify-between gap-12 my-2 text-md text-black'>
                <p className=''>{item.name}</p>
                <p className='font-medium'>{item.amount}</p>
              </div>
            </li>
          ))
        }
      </ul>
    </div>
    { successful ?
      <div className='flex justify-end text-right my-10 text-green-400 text-xl font-medium'>
        Заявка успешно оставлена!!
      </div> 
    : null }
    <div className='flex justify-end my-10'>
      <button
        type='submit'
        className='flex justify-center items-center bg-gradient-to-r from-main to-secondary text-white text-[20px] h-[50px] w-[200px] rounded-xl'>
        <p>Сделать заказ</p>
      </button>
    </div>
  </form>
}

export default CheckOutForm
