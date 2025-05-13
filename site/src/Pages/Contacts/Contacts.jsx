import React from 'react'
import TelegramIcon from "/assets/Telegram.svg"
import WhatsAppIcon from "/assets/WhatsApp.svg"
import VKIcon from "/assets/VK.svg"
import { YMaps, Map } from '@pbe/react-yandex-maps'
import { Placemark } from '@pbe/react-yandex-maps'
import { Link } from 'react-router-dom'

const Contacts = () => {
  return (
    <div className='container'>
      <div>
        <p className='text-[20px] mt-5 text-center'><b>Связаться с нами вы можете любым удобным вам способом</b></p>
      </div>
      <div className='mt-5 flex flex-col items-center'>
        <Link className='flex' to={"https://t.me/SPPOTOLOK"}>
          <img src={TelegramIcon} className='w-[30px] h-[30px]'/>
          <p className='ml-3 text-4 w-50 self-center'>https://t.me/SPPOTOLOK</p> 
        </Link>
        <Link to="https://vk.com/sp__potolok" className='flex'>
          <img src={VKIcon} className='w-[30px] mt-2 h-[30px]'/>
          <p className='ml-3 text-4 w-50 self-center'>https://vk.com/sp__potolok</p> 
        </Link>
        <Link to="tel:+7-996-360-55-25" className='flex'>
          <img src={WhatsAppIcon} className='w-[30px] h-[30px] mt-2'/>
          <p className='ml-3 text-[16px] w-50 self-center'>+7-996-360-55-25</p> 
        </Link>
      </div>
      <div className='flex justify-center mt-10'>
        <p className='ml-6 text-[20px]'><b>г. Сергиев Посад, проспект Красной Армии, д. 91Б</b></p>
      </div>
      <div className='mt-6 mb-32 flex justify-center'>
        <YMaps>
          <Map state={{ center: [56.301953, 38.128911], zoom: 18 }} width={700} height={500}>
            <Placemark geometry={[56.301953, 38.128911]} />
          </Map>
        </YMaps>
      </div>
    </div>
  )
}

export default Contacts
