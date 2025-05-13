import React from 'react'
import img1 from '/assets/about us photo 1.png'
import img2 from '/assets/about us photo 2.png'
import img3 from '/assets/about us photo 3.png'

const About = () => {
  return (
    <div className='container'>
      <div className='my-2'>
        <h2 className='text-[32px] mt-3'><b>Добрый день! Мы рады сообщить Вам, что в городе Сергиев-Посад открылось новое производство натяжных потолков «SP POTOLOK».</b></h2>
        <p className='text-[18px] mt-3'>Приглашаем к сотрудничеству монтажные бригады и строительные организации. У нас Вас всегда ждет в наличии широкий ассортимент товара для систем натяжных потолков.</p>
      </div>
      <div className='mt-10 grid-cols-[1fr_2fr] sm:grid-cols-[2fr_3fr] grid'>
        <img className='w-full' src={img1}></img>
        <p className='self-center ml-3 sm:ml-20 text-[18px]'>Вы можете приобрести профиль, ткань, пленку ПВХ на отрез и в гарпуне, раскроенную под Ваши размеры, световое оборудование и всё необходимое для монтажа натяжных потолков.</p>
      </div>
      <div className='grid grid-cols-[3fr_2fr] mt-5'>
        <p className='self-center text-[18px] mr-5 sm:mr-10'>Произведем расчет и монтаж учитывая Ваши пожелания и бюджет. Производство и все материалы находятся в Сергиевом-Посаде, что существенно сокращает время между замером и монтажом!</p>
        <img src={img2}></img>
      </div>
      <div className='mt-10 grid grid-cols-[2fr_3fr]'>
        <img src={img3}></img>
        <p className='text-[18px] self-center ml-4 sm:ml-12'>Гибкое ценообразование – мы всегда готовы пойти на встречу клиенту! Постоянным клиентам действует система скидок.</p>
      </div>
      <div className='mt-10 mb-20 text-center'>
        <p className='text-20px'><b>Будем рады видеть Вас на нашем производстве и в офисе “SP POTOLOK” по адресу: <br />Московская область, г. Сергиев Посад, пр-т Красной Армии, д. 91б.<br />Телефон: 8-996-360-55-25</b></p>
      </div>
    </div>
  )
}

export default About
