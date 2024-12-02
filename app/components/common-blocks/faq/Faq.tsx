import React, { useState } from 'react';
import { IoIosArrowDown } from "react-icons/io";

interface FaqItem {
  id: string;
  heading: string;
  content: string;
}

const Faq = ({
  faqHeading,
  faqContent,
  faqData,
}: {
  faqHeading: string;
  faqContent: string;
  faqData: FaqItem[];
}) => {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setOpenId((prevId) => (prevId === id ? null : id));
  };

  return (
    <div className="w-full h-full relative md:py-16 py-8">
      <div className="w-full md:max-w-[1440px] max-w-[90%] mx-auto flex flex-col justify-center items-center">
        <div className="w-full h-full flex flex-col mb-8">
          <h1 className="font-bold text-3xl text-center">{faqHeading}</h1>
          <p className="text-center text-lg">{faqContent}</p>
        </div>
        <div className="w-full h-full flex flex-col justify-center items-center space-y-6">
          {faqData?.map((item) => (
            <div
              key={item.id}
              className="w-full rounded-lg overflow-hidden border dark:border-gray-700"
            >
              <div
                className="w-full cursor-pointer px-6 py-4 transition-all duration-300"
                onClick={() => toggleAccordion(item.id)}
              >
                <h3 className="font-medium text-xl flex justify-between items-center">
                  {item.heading}
                  <span
                    className={`transform transition-transform duration-300 ${
                      openId === item.id ? 'rotate-180' : ''
                    }`}
                  >
                    <IoIosArrowDown />
                  </span>
                </h3>
              </div>

              {openId === item.id && (
                <div className="px-6 py-4 text-lg">{item.content}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faq;
