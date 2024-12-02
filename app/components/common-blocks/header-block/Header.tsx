'use client'
import { fetchHeader } from '@/app/api-data/api'
import React, { useEffect, useState } from 'react'

interface HeaderData {
    Header_Menu: {

    }
    main_logo: {
        id: number
        name: string
        url: string
    }[]
}

const Header = () => {  
    const [headerData, setHeaderData] = useState<HeaderData | null>(null)

  useEffect(() => {
    const fetchHeaderData = async () => {
      try {
        const response = await fetchHeader();
        setHeaderData(response);
      } catch (error) {
        console.log(error);
        return null;
      }
    }

    fetchHeaderData();
  }, [])
  console.log(headerData)
  
  return (
    <div className='w-full h-[100px] shadow-md md:py-16 py-8'>
        <div className='w-full h-full md:max-w-[1440px] max-w-[90%] mx-auto flex justify-between items-center'>
            <img
                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${headerData?.main_logo[0]?.url}`}
                alt={headerData?.main_logo[0]?.name}
                className='w-32'
            />
        </div>
    </div>
  )
}

export default Header