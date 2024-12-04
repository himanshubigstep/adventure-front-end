import React, { useState } from 'react';
import { BiSolidDownArrow } from "react-icons/bi";

interface FaqItem {
  id: string;
  heading: string;
  content: string | null;
  list_content: string[] | null;
}

const Faq = ({
  faqHeading,
  faqContent,
  faqData,
  bgImage,
}: {
  faqHeading: string;
  faqContent: string;
  faqData: FaqItem[];
  bgImage: string;
}) => {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setOpenId((prevId) => (prevId === id ? null : id));
  };

  return (
    <div className="w-full h-full relative md:py-16 py-8">
      <div className="w-full md:max-w-[1240px] max-w-[90%] mx-auto flex flex-col justify-center items-center">
        <div className="w-full h-full flex flex-col mb-16 space-y-4">
          <h1 className="font-bold text-3xl text-center">{faqHeading}</h1>
          <p className="text-center text-lg">{faqContent}</p>
        </div>
        <div className="w-full h-full flex md:flex-row flex-col justify-center items-center space-x-8">
          <div className='w-full md:w-2/3 h-full flex flex-col justify-center items-center space-y-8'>
            {faqData?.map((item) => (
              <div
                key={item.id}
                className="w-full rounded-lg overflow-hidden border border-[#FBEEE9] dark:border-gray-500"
              >
                <div
                  className="w-full cursor-pointer px-6 py-4 transition-all duration-300"
                  onClick={() => toggleAccordion(item.id)}
                >
                  <h3 className="font-normal text-xl flex gap-4 items-center">
                    <span
                      className={`transform transition-transform duration-300 ${openId === item.id ? 'rotate-180' : 'rotate-90'}`}
                    >
                      <BiSolidDownArrow />
                    </span>
                    {item.heading}
                  </h3>
                </div>
                
                {openId === item.id && (
                  <div className="px-6 py-4 text-lg">
                    
                    {item.content && <p>{item.content}</p>}
                    
                    {item.list_content && item.list_content.length > 0 && (
                      <ul className="list-disc pl-6">
                        {item.list_content.map((listItem, index) => (
                          <li key={index}>{listItem}</li>
                        ))}
                      </ul>
                    )}
                    
                    {!item.content && !item.list_content && <p>No additional information available.</p>}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className='w-full md:w-1/3 h-full'>
            <img
              src={bgImage}
              alt="faq"
              className="w-full h-full object-cover object-top"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
