"use client"
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { Product } from '@/functions/functions';
import { Spinner } from './components/spinner';
import {useInView } from "react-intersection-observer"
import { getData } from '@/functions/functions';
import { RWebShare } from "react-web-share";
const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const [accessories, setAccessories] = useState<number>()
  const [apparel, setApparel] = useState<number>()
  const firstDivRef = useRef<HTMLDivElement | null>(null);
  const secondDivRef = useRef<HTMLDivElement | null>(null);
  const thirdDivRef = useRef<HTMLDivElement | null>(null);
  const [pagesLoaded, setPagesLoaded] = useState(1)
  const [fix, setfix] = useState(false)
  const {ref, inView} = useInView();

  useEffect(()=>{
    if(inView){
      console.log("IN View")
      LoadMorePages()
    }
  },[inView])

  const LoadMorePages=async()=>{
    const nextPage = pagesLoaded+1;
    const newProducts = await getData(pagesLoaded);
    setProducts((prevProducts:Product[])=>[...prevProducts, ...newProducts])
    setPagesLoaded(nextPage)
  }


  function setFixed() {
    if (window.scrollY >= 225) {
      setfix(true)
    }
    else {
      setfix(false)
    }
  }

  

  useEffect(() => {
    window.addEventListener("scroll", setFixed);
  
    return () => {
      window.removeEventListener("scroll", setFixed);
    };
  }, []);

  useEffect(() => {
    async function fetchProductData() {
      try {
        const productData = await getData(pagesLoaded);
        setProducts(productData);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    }

    fetchProductData();
      
  }, []);

  return (
    <div className="flex flex-col h-screen scroll-smooth bg-white pb-20">
      <div ref={firstDivRef} className="bg-white z-30 py-2 items-center justify-between transition-opacity fixed flex-row flex w-full px-2">
        <div className='flex w-16'>
          <Image className='object-contain' alt={"bag"} width={26} height={22} src={'/icons/menue.png'} />
        </div>
        <h1 className="text-[#483285] text-3xl">Furrl</h1>
        <div className='flex w-20 h-10 flex-row justify-end gap-4'>
          <Image onClick={() => window.open('https://web.furrl.in/wishlist', '_blank')} className='object-contain' alt={"bag"} width={26} height={20} src={'/icons/wishlist.png'} />
          <Image onClick={() => window.open('https://web.furrl.in/cart', '_blank')} className='object-contain' alt={"bag"} width={26} height={20} src={'/icons/cart.png'} />
        </div>

      </div>
      <div
        ref={secondDivRef}
        className={`  flex h-40 mt-14  w-full items-center justify-center`}
      >
        <h1 className="absolute text-2xl font-light drop-shadow-lg shadow-black italic text-white mt-14 ">
          #NightFlea</h1>
        <Image className=' object-cover w-full h-full ' alt={"bag"} width={1920} height={1080} src={'/icons/background.jpeg'} />
      </div>
      <div

        className={` bg-white px-2 py-2 flex h-40   w-full items-center justify-center`}
      >
        <div className='h-14 bg-gray-200 w-full rounded-2xl py-1 flex'>
          <div className='flex w-1/4 bg-white rounded-2xl h-full ml-14 items-center justify-center'>
            <h1 className='text-black text-sm'>Products</h1>
          </div>
        </div>
      </div>

      <div
        ref={thirdDivRef}
        className={`${fix ? 'fixed mt-12 top-0' : ''
          } bg-white py-6 h-24  w-full flex flex-col z-30 px-2 font-light`}
      >
        <h1 className='text-gray-400 text-xs'>999 Products</h1>
        <div className='w-full flex mt-1 gap-2 no-scrollbar overflow-y-auto'>
            <div className='flex px-4 py-1 bg-purple-500 rounded-2xl'><p className='text-white text-sm font-thin'>All</p></div>
            <div className='flex px-4 py-1 border  rounded-2xl'><p className='text-black text-sm font-thin'>Accessories</p></div>
            <div className='flex px-4 py-1 border  rounded-2xl'><p className='text-black text-sm font-thin'>Home</p></div>
            <div className='flex px-4 py-1 border  rounded-2xl'><p className='text-black text-sm font-thin'>Apparel</p></div>
            
        </div>
        
      </div>
     
      <div className="grid grid-cols-2 gap-1 bg-white px-1">
  {products.map((product, index) => (
    <div className='mb-4' key={product.id} >
      <div className='w-full h-40 mb-4'>
      <RWebShare
                data={{
                    text: "Web Share - GfG",
                    url: "http://localhost:3000",
                    title: "GfG",
                }}
                onClick={() => console.log("shared successfully!")}
            >
        <div className=' flex w-6 h-6 items-center justify-center bg-gray-300 rounded-full absolute ml-40 mt-10'>

          <Image className="self-center" alt={"bag"} width={16} height={10} src={'/icons/share.png'}>
          </Image>
        </div>
        </RWebShare>
        <div className=' flex w-6 h-6 items-center justify-center bg-gray-300 rounded-full absolute ml-40 mt-20'>

          <Image className="self-center" alt={"bag"} width={16} height={10} src={'/icons/wishlist.png'}>
          </Image>
        </div>
        <img className='w-full h-full object-fill' src={product.images[0].src} alt={product.title} />

      </div>
      <h3 className='text-black text-xs font-thin px-2'>{product.brandName}</h3>
      <h3 className='text-black text-xs px-2 font-light'>{product.title}</h3>
      <p className='text-black text-xs px-2 font-extralight'>Rs: {product.price}</p>
    </div>
  ))}
</div>
  <div className='flex justify-center items-center p-4 sm:col-span-3 ' ref={ref}>

      <Spinner></Spinner>
  </div>





    </div>
  );
};

export default HomePage;
