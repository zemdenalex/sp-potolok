import { Link } from 'react-router-dom';
import img1 from '/assets/Пленка ПВХ.png'
import img2 from '/assets/Освещение.png'
import img3 from '/assets/Вентиляция.png'
import img4 from '/assets/Кольца.png'
import img5 from '/assets/Профиль.png'
import img6 from '/assets/Клей.png'
import img7 from '/assets/Крепежи.png'
import img8 from '/assets/Платформы.png'
import img9 from '/assets/Комплектующие.png'
import img10 from '/assets/Услуги.png'
import { ContainerTabs } from '../ContainerTabs/ContainerTabs';

const types = [
  {
    id: '1',
    name: ['Пленка ПВХ'],
    img: img1
  },
  {
    id: '2',
    name: ['Освещение'],
    img: img2
  },
  {
    id: '3',
    name: ['Вентиляционные', 'Решетки'],
    img: img3
  },
  {
    id: '4',
    name: ['Кольца'],
    img: img4
  },
  {
    id: '5',
    name: ['Профиль'],
    img: img5
  },
  {
    id: '6',
    name: ['Клей'],
    img: img6
  },
  {
    id: '7',
    name: ['Крепежи'],
    img: img7
  },
  {
    id: '8',
    name: ['Платформы'],
    img: img8
  },
  {
    id: '9',
    name: ['Комплектующие'],
    img: img9
  },
  {
    id: '10',
    name: ['Услуги'],
    img: img10
  }
]

const Types = () => <ContainerTabs>
  {types.map((item) => <Link to={'/products/' + item.name.join(' ')} key={item.id} className="p-4 bg-white rounded-2xl shadow-xl hover:shadow-2xl duration-200  flex-col gap-4 flex justify-center items-center aspect-square">
      <div className='flex justify-center items-center'>
        <div className='rounded-xl'>
          <img src={item.img} className='w-[120px] rounded-2xl h-[120px]'/>
        </div>
      </div>
      <div className='hidden xs:flex flex-col justify-center items-center'>
        {
          item.name.map((name, i) => <p key={i} className='text-sm xs:text-lg 2xl:text-xl text-center'><b>{name}</b></p>)
        }
      </div>
      <div className='flex xs:hidden flex-col justify-center items-center'>
        {
          item.name.slice(-1).map((name, i) => <p key={i} className='text-sm sx:text-lg 2xl:text-xl text-center'><b>{name}</b></p>)
        }
      </div>
    </Link>
  )}
</ContainerTabs>

export default Types
