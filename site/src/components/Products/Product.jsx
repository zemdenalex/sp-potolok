import { useSelector, useDispatch } from 'react-redux'
import { addItem, removeItem } from '../../features/cart/slice'
import { Minus, Plus } from 'react-feather'
import { motion, AnimatePresence } from 'framer-motion'

export const Product = ({name, image_link, price}) => {
    const dispatch = useDispatch()
    const amountInBucket = useSelector(state => state.cart.find(p => p.name == name)?.amount ?? 0)
    const add = () => dispatch(addItem({name, price, image_link}))
    const remove = () => dispatch(removeItem({name}))
    return (
      <div className='bg-white min-w-52 mx-auto sm:min-w-auto items-center px-6 py-4 rounded-2xl grid grid-cols-1 sm:grid-cols-[5fr_1fr] gap-3 mt-8 shadow-xl hover:shadow-2xl duration-200'>
        <div className='flex flex-col sm:flex-row items-center gap-4'>
          <div className='h-40 w-40  sm:h-[120px] sm:w-[120px] rounded-lg flex items-center justify-center'>
            <img src={image_link} className='h-full w-full object-cover self-center rounded-xl'></img>
          </div>
          <p className='text-lg text-center sm:text-left'>{name}</p>
        </div>
        <div>
          {/* Price */}
          <div className='text-center my-2 text-lg justify-center flex gap-2 flex-row sm:flex-col'>
            <p className='hidden sm:block'>Стоимость</p>
            <p className='text-lg'>{price}</p>
          </div>

          <div className='flex justify-center'>
            {
              amountInBucket == 0 ? 
              <motion.button onClick={add} className="main-gradient px-3 sm:px-4 py-2 rounded-md sm:rounded-lg flex justify-center items-center max-w-28">
                <p className="text-white text-lg text-center text-nowrap">В корзину</p>
              </motion.button> : 
              <div className='flex justify-between border-2 border-main rounded-full  w-28 h-11 items-center px-1 text-main text-4'>
                <motion.button onClick={add} className=' rounded-full hover:bg-main duration-300'>
                  <Plus className='h-6 duration-300 hover:stroke-white' />
                </motion.button>
                <AnimatePresence mode="wait" initial={false}>
                    <motion.p key={amountInBucket} initial={{opacity: 0, translateY: '-10%'}} animate={{opacity: 1, translateY: 0}} exit={{opacity: 0, translateY: '10%'}} className='text-main text-xl font-serif text-center'>
                        {amountInBucket}
                    </motion.p>
                </AnimatePresence>
                
                <motion.button onClick={remove} className=' rounded-full hover:bg-main duration-300'>
                  <Minus className='h-6 duration-300 hover:stroke-white' />
                </motion.button>
              </div>
            }
          </div>
        </div>
      </div>
    )
  }
