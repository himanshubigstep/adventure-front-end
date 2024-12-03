interface HomePageTopBannerProps {
  homePageData?: {
    heading: string;
    description: string;
    cta_1: string;
    cta_1_link: string;
    cta_2: string;
    media: {
      url: string;
      name: string;
      mime: string;
    };
  };
}

const HomePageTopBanner = ({ homePageData }: HomePageTopBannerProps) => {
  if (!homePageData) return null;
  const { url, name, mime } = homePageData.media;
  const isVideo = mime.startsWith('video');
  const isImage = mime.startsWith('image') && !mime.startsWith('image/gif');
  const isGif = mime === 'image/gif';

  return (
    <div className='relative w-full md:h-[70vh] h-[50vh] flex justify-center items-center'>
      <div className='absolute top-0 left-0 w-full h-full bg-black opacity-50 z-10' />
      <div className='absolute top-0 left-0 right-0 bottom-0 w-full h-full'>
        {isImage ? (
          <img
            src={url}
            alt={name}
            className='w-full h-full object-cover object-top'
          />
        ) : isVideo ? (
          <video
            src={url}
            className='w-full h-full object-cover object-top'
            autoPlay
            loop
            muted
            playsInline
          />
        ) : isGif ? (
          <img
            src={url}
            alt={name}
            className='w-full h-full object-cover object-top'
          />
        ) : null}
      </div>
      <div className='relative w-full h-full md:max-w-[1240px] max-w-[90%] mx-auto flex flex-col justify-center items-center z-20'>
        <div className='md:w-2/3 w-full text-white mb-8 flex flex-col md:gap-8 gap-4 justify-center items-center'>
          <h1 className='font-bold md:text-6xl text-4xl text-center'>
            {homePageData.heading}
          </h1>
          <p className='font-medium md:text-xl text-lg text-center'>
            {homePageData.description}
          </p>
        </div>
        <div className='md:w-2/3 w-full h-auto flex items-center gap-4 justify-center'>
          <button
            className='px-6 py-4 bg-blue-500 hover:bg-blue-800 text-white rounded-lg'
            onClick={() => window.location.href = homePageData.cta_1_link}
          >
            {homePageData.cta_1}
          </button>
          {/* <button
            className='px-6 py-4 bg-blue-500 hover:bg-blue-800 text-white rounded-lg'
            onClick={() => console.log('clicked')}
          >
            {homePageData.cta_2}
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default HomePageTopBanner;
