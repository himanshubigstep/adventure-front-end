'use client'
import { useEffect, useState } from "react";
import HomePageTopBanner from "./components/home-page-top-banner/HomePageTopBanner";
import { fetchHomePage } from "./api-data/api";
import SubscriberForm from "./components/subscriber/SubscriberForm";
import ExploringData from "./components/common-blocks/exploring-data/ExploringData";
import Faq from "./components/common-blocks/faq/Faq";
import LoaderSpinner from "./components/common-blocks/loader-spinner/LoaderSpinner";

interface ExploreItem {
  id: number;
  heading: string;
  description: string;
  button: string;
  button_link: string;
  background_image: {
    url: string;
  };
}

interface FaqItem {
  id: string;
  heading: string;
  content: string | null;
  list_content: string[] | null
}

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
      url: string;
      name: string;
      mime: string;
      formats: {
        large: {
          url: string;
        };
      };
    };
  };
  news_letter: {
    id: number;
    heading: string;
    description: string;
    button: string;
    button_link: string;
    background_image: {
      url: string;
    };
  };
  explore_heading: {
    id: number;
    heading: string;
    description: string;
    button: string;
    button_link: string;
  };
  explore_data: ExploreItem[];
  homePage_faqs: {
    id: number;
    heading: string;
    description: string;
    background_image: {
      url: string;
    }
  };
  homePage_faqs_data: FaqItem[];
}

export default function Home() {
  const [homePageData, setHomePageData] = useState<HomePageData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchHomePageData = async () => {
      try {
        const response = await fetchHomePage();
        setHomePageData(response);
      } catch (error) {
        console.log(error);
        return null;
      } finally {
        setIsLoading(false);
      }
    };

    fetchHomePageData();
  }, []);

  if (isLoading) {
    return <LoaderSpinner />;
  }

  return (
    <div className='poppins'>
      <HomePageTopBanner homePageData={homePageData?.HomePage_Introduction} />
      <ExploringData
        exploreHeading={homePageData?.explore_heading?.heading || ''}
        exploredescription={homePageData?.explore_heading?.description || ''}
        exploreButton={homePageData?.explore_heading?.button || ''}
        exploreData={homePageData?.explore_data || []}
      />
      <SubscriberForm latest_info={homePageData?.news_letter} />
      <Faq
        faqHeading={homePageData?.homePage_faqs?.heading || ''}
        faqContent={homePageData?.homePage_faqs?.description || ''}
        faqData={homePageData?.homePage_faqs_data || []}
        bgImage={homePageData?.homePage_faqs?.background_image?.url || ''}
      />
    </div>
  );
}
