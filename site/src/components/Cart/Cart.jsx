import CartSvg from '../../../public/assets/cart.jsx'
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from 'framer-motion'

export const Cart = ({className = ''}) => {
    const count = useSelector(state => state.cart.reduce((acc, {amount}) => acc += amount, 0))

    return (
        <AnimatePresence mode="wait" initial={false}>
            <Link to="/cart" key={count} className={"bg-radial-gradient p-[6px] rounded-full duration-500 hover:opacity-8 relative " + className}>                            
                <CartSvg />
                <motion.p initial={{scale: 0.5, opacity: 0}} animate={{scale: 1, opacity: 1}} exit={{scale: 0.5, opacity: 0}} className='absolute w-6 h-6 top-[-10px] right-[-10px] text-white bg-red-600 rounded-full text-center leading-6'>
                    {count < 100 ? count : '99+'}
                </motion.p>
            </Link>
        </AnimatePresence>
        
    )
}
