import React from 'react'

interface ExploreData {
    id: number;
    heading: string;
    description: string;
    background_image: {
        url: string;
    };
}

const ExploringData = ({ exploreHeading, exploreData, exploredescription, exploreButton }: { exploreHeading: string, exploredescription: string, exploreButton: string, exploreData: any }) => {
    console.log(exploreData)
    return (
        <div className='w-full h-full md:py-16 py-8'>
            <div className='w-full md:max-w-[1440px] max-w-[90%] mx-auto flex flex-col justify-center items-center'>
                <div className='w-full h-full flex flex-col mb-8'>
                    <h1 className='font-bold text-3xl text-center'>
                        {exploreHeading}
                    </h1>
                    <p className='text-center text-lg'>
                        {exploredescription}
                    </p>
                </div>
                <div className='w-full h-full grid md:grid-cols-3 gap-8 grid-cols-1 justify-center items-center'>
                    {exploreData?.map((item: any) => (
                        <div key={item.id} className='w-full h-full flex flex-col items-center hover:shadow-xl hover:scale-105 trabsition-all duration-1000 cursor-pointer'>
                            <img
                                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${item?.background_image?.url}`}
                                alt=''
                                className='rounded-tl-lg rounded-tr-lg w-full h-64 object-cover object-top'
                            />
                            <div className='w-full flex flex-col justify-center p-4'>
                                <h1 className='font-bold text-2xl'>
                                    {item?.heading}
                                </h1>
                                <p className='text-left text-lg'>
                                    {item?.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='w-full h-full flex flex-col justify-center items-center mt-8'>
                    <button
                        className='px-6 py-4 bg-blue-500 hover:bg-blue-800 text-white rounded-lg'
                        onClick={() => console.log('clicked')}
                    >
                        {exploreButton}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ExploringData