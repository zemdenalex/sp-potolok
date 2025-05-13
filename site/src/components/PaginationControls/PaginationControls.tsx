import React from 'react'
import { ArrowLeft, ArrowRight } from 'react-feather'

const scrollToTop = () => {
    window.scrollTo({
        top: 0,
    });
}

export const PaginationControls = ({
    productsSize,
    setPrevPage,
    setNextPage,
    currentPage,
    isLastPage,
    scrollTopMode = false
}) => {
    const setPrev = () => {
        setPrevPage()
        if (scrollTopMode) scrollToTop()
    }
    const setNext = () => {
        setNextPage()
        if (scrollTopMode) scrollToTop()
    }
    return productsSize ? 
        <>
            <div id='page-controls' className='flex items-center justify-center'>
                {
                    currentPage !== 1 ? <button className='px-5 border-solid border-black border-2 rounded-md' onClick={setPrev}>
                        <ArrowLeft className=''/>
                    </button> : <div className="mx-5 w-6 h-6" > </div>
                }
                <p className='mx-6 text-lg'><b>{currentPage}</b></p>
                {
                    isLastPage ? <div className="mx-5 w-6 h-6"> </div> : <button className='px-5 border-solid border-black border-2 rounded-md' onClick={setNext}>
                        <ArrowRight />
                    </button>
                }                    
            </div>
        </> : null
}
