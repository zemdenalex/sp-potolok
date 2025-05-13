import React, { useEffect, useState } from "react"
import Logo from "/assets/Logo.svg"
import SearchIcon from "/assets/Magnifier.svg"
import TelegramIcon from "/assets/Telegram.svg"
import WhatsAppIcon from "/assets/WhatsApp.svg"
import VKIcon from "/assets/VK.svg"
import { Link } from "react-router-dom"
import axios from "axios"
import { PaginationControls } from "../PaginationControls/PaginationControls"
import { Product } from "../Products/Product"
import { Cart } from "../Cart/Cart"
import { Menu, X } from "react-feather"
import { motion, AnimatePresence } from 'framer-motion'

const MenuLinks = [
    {
        id: 1,
        name: "Главная",
        link: "/",
    },
    {
        id: 2,
        name: "Каталог",
        link: "/products",
    },
    {
        id: 3,
        name: "О нас",
        link: "/about-us",
    },
    {
        id: 4,
        name: "Контакты",
        link: "/contacts",
    },
]

const productsPerPage = 4

const NavBar = () => {
    const [inputValue, setInputValue] = useState('')
    const [products, setProducts] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [sideMenu, setSideMenu] = useState(false)

    const clearSearchState = () => {
        setInputValue('')
        setCurrentPage(1)
    }

    async function getProductsByInput() {
        try {            
            const response = await axios.get(`http://localhost:8080/products?search=${inputValue}&size=210`)
            setProducts(response?.data ?? [])
            setCurrentPage(1)
        } catch(e) {}
    }

    useEffect(() => {
        if (sideMenu) {
            const scroll = window.onscroll
            window.onscroll = function () { window.scrollTo(0, 0); }
            return () => window.onscroll = scroll
        }
    }, [sideMenu])

    useEffect(() => {
        const onKeyPressed = (event) => event.keyCode === 27 && clearSearchState()
        document.addEventListener("keydown", onKeyPressed, false)
        return () => document.removeEventListener("keydown", onKeyPressed, false)
    }, [])

    useEffect(() => {
        if (inputValue.length > 2) {
            const delayDebounceFn = setTimeout(() => {
                    getProductsByInput()                
            }, 200)

            return () => clearTimeout(delayDebounceFn)
        } else {
            setProducts([])
            setCurrentPage(1)
        }
        
    }, [inputValue])

    const handleInputChange = (event) => {
        setInputValue(event.target.value)
    }
    
    const indexOfLastProduct = currentPage * productsPerPage
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct)

    return (
        <header className="bg-gray-200 duration-200 relative z-40 pt-8">
            <div className="px-12 flex justify-between items-center">
                <Link to="/" className="w-40 xxs:w-52 sm:w-80">
                    <img src={Logo} alt='Logo' className=''/>
                </Link>
                <div className="hidden lg:flex justify-end text-right grow mx-10">
                    <p className='text-[14px] leading-5'>
                        г. Сергиев Посад, проспект Красной Армии, д. 91Б 
                        <br/>8-996-360-55-25
                    </p>
                </div>
                <ul className="hidden lg:flex gap-3 items-center">
                    <Link to="https://t.me/SPPOTOLOK"><img src={TelegramIcon} /></Link>
                    <Link to="https://vk.com/sp__potolok"><img src={VKIcon} /></Link>
                    <Link to="/contacts"><img src={WhatsAppIcon} href="/contacts" /></Link>
                </ul>
                <div className="flex gap-5">
                    <Cart className="hidden sm:block lg:hidden" />
                    <div onClick={() => setSideMenu(true)} className="cursor-pointer block lg:hidden bg-radial-gradient rounded-full p-[10px]">
                        <Menu className="stroke-white" />
                    </div>
                </div>
            </div>
                               
            <div className="flex justify-between items-center my-6 mx-12">
                <div className="relative flex items-center lg:w-3/4 w-full">
                    <img src={SearchIcon} className="absolute w-4 ml-4 pointer-events-none" />
                    <input
                        type="text"
                        name="search"
                        autoComplete="off"
                        placeholder="Найти в каталоге"
                        onChange={handleInputChange}
                        value={inputValue}
                        className="px-12 w-full box-border h-[48px] border-2 border-main rounded-md sm:rounded-lg placeholder:text-md text-md font-semibold placeholder-gray-400 text-black"
                    />
                    {inputValue.length ? <button onClick={clearSearchState} className="bg-red-700 text-white p-2 rounded-lg absolute right-2 flex gap-1 items-center"><div className="hidden sm:block">Ecs</div> <X className="stroke-white"/></button> : null}
                </div>

                <Cart className="hidden lg:block" />
            </div>

            <nav className="hidden lg:flex items-center justify-center gap-3 my-6 mx-12">
                <ul className="flex items-center gap-10 sm:justify-center text-lg text-nowrap ">
                    {
                        MenuLinks.map((data, index) => (
                            <li key={index}>
                                <Link to={data.link} className="duration-200 inline-block px-4 hover:text-gray-500">
                                    {data.name}
                                </Link>
                            </li>
                        ))
                    }
                </ul>
                <Cart className="sm:hidden" />
            </nav>

            
            {products.length ? <div id='search-products' className='bg-gray-200 bg-opacity-85 backdrop-blur-sm left-0 right-0 py-5 px-6 sm:px-12 absolute'>
                <h3>Найдено позиций: {products.length}</h3>
                <ul className='mt-3 mb-8'>
                    {
                        currentProducts.map((item, i) => <li key={i}>
                            <Product name={item.name} image_link={item.image_link} price={item.price} />
                        </li>)
                    }
                    {
                        Array.from({length: productsPerPage - currentProducts.length}).map((_, i) => <li key={`placeholder-${i}`} className="h-[336px] sm:h-[156px] mt-8 py-4 w-full"></li>)
                    }
                </ul>
                
                <PaginationControls 
                    productsSize={products.length}
                    currentPage={currentPage}
                    isLastPage={indexOfLastProduct >= products.length}
                    setNextPage={() => setCurrentPage(currentPage + 1)}
                    setPrevPage={() => setCurrentPage(currentPage - 1)}
                />
            </div> : null}

            <AnimatePresence mode="wait">
                {sideMenu ? <motion.div onClick={() => setSideMenu(false)} layout initial={{translateY: '-100%'}} animate={{translateY: '0%'}} exit={{translateY: '-100%'}} transition={{duration: 0.25}}
                    className="absolute top-0 right-0 h-dvh w-full bg-gray-200 bg-opacity-85 backdrop-blur-lg py-8 px-12">
                    <ul className="flex flex-col items-end gap-12">
                        <div className="flex gap-5">
                            <Cart />
                            <div onClick={() => setSideMenu(false)} className="cursor-pointer block lg:hidden bg-radial-gradient rounded-full p-[10px]">
                                <X className="stroke-white" />
                            </div>
                        </div>
                        {MenuLinks.map((data, index) => (
                            <li key={index}>
                                <Link to={data.link} className="duration-200 inline-block px-4 text-3xl hover:text-gray-500">
                                    {data.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </motion.div> : null}
            </AnimatePresence>
        </header>
    )
}

export default NavBar
