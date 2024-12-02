'use client'
import { useEffect, useState } from "react";
import HomePageTopBanner from "./components/home-page-top-banner/HomePageTopBanner";
import { fetchHomePage } from "./api-data/api";
import SubscriberForm from "./components/subscriber/SubscriberForm";
import ExploringData from "./components/common-blocks/exploring-data/ExploringData";
import Faq from "./components/common-blocks/faq/Faq";

interface HomePageData {
  HomePage_Introduction: {
    id: number;
    heading: string;
    description: string;
    cta_1: string;
    cta_1_link: string;
    cta_2: string;
    cta_2_link: string;
    media: {
      url: string
      name: string
      formats: {
        large: {
          url: string
        }
      }
    }
  }
  news_letter: {
    id: number;
    heading: string;
    description: string;
    button: string;
    button_link: string;
    background_image: {

    }
  }
  explore_heading: {
    id: number;
    heading: string;
    button: string;
    button_link: string;
  }
  explore_data: {
    id: number;
    heading: string;
    description: string;
    button: string;
    button_link: string;
    background_image: {

    }
  }
  homePage_faqs: {
    id: number;
    heading: string;
    description: string;
  }
  homePage_faqs_data: {
    id: number;
    heading: string;
    content: string;
  }
}

export default function Home() {
  
  const [homePageData, setHomePageData] = useState<HomePageData | null>(null)

  useEffect(() => {
    const fetchHomePageData = async () => {
      try {
        const response = await fetchHomePage();
        setHomePageData(response);
      } catch (error) {
        console.log(error);
        return null;
      }
    }

    fetchHomePageData();
  }, [])

  return (
    <div className=''>
      <HomePageTopBanner homePageData={homePageData?.HomePage_Introduction} />
      <ExploringData
        exploreHeading={homePageData?.explore_heading}
        exploreData={homePageData?.explore_data}
      />
      <SubscriberForm latest_info={homePageData?.news_letter} />
      <Faq
        faqHeading={homePageData?.homePage_faqs}
        faqData={homePageData?.homePage_faqs_data}
      />
    </div>
  );
}