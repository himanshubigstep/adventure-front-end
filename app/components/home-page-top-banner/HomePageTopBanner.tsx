import React from 'react'

const HomePageTopBanner = ({homePageData}: {homePageData: any}) => {
  return (
    <div className='relative w-full md:h-[80vh] h-[50vh] flex justify-center items-center'>
        <div className='absolute top-0 left-0 w-full h-full bg-blue-400 opacity-30 z-10' />
        <div className='absolute top-0 left-0 right-0 bottom-0 w-full h-full'>
            <img
                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${homePageData?.media?.url}`}
                alt={homePageData?.media?.name}
                className='w-full h-full object-cover object-top'
            />
        </div>
        <div className='relative w-full h-full md:max-w-[1440px] max-w-[90%] mx-auto flex flex-col justify-center z-20'>
            <div className='md:w-2/3 w-full text-white mb-8 flex flex-col md:gap-8 gap-4'>
                <h1 className='font-bold md:text-6xl text-4xl'>
                    {homePageData?.heading}
                </h1>
                <p className='font-medium md:text-xl text-lg'>
                    {homePageData?.description}
                </p>
            </div>
            <div className='md:w-2/3 w-full h-auto flex items-center gap-4'>
                <button
                    className='px-6 py-4 bg-blue-500 hover:bg-blue-800 text-white rounded-lg'
                    onClick={() => window.location.href = homePageData?.cta_1_link}
                >
                    {homePageData?.cta_1}
                </button>
                <button
                    className='px-6 py-4 bg-blue-500 hover:bg-blue-800 text-white rounded-lg'
                    onClick={() => console.log('clicked')}
                >
                    {homePageData?.cta_2}
                </button>
            </div>
        </div>
    </div>
  )
}

export default HomePageTopBanner