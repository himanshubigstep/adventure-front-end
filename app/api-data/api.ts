interface SubscriberInput {
    email: string;
    firstName: string;
    lastName: string;
}

export const fetchHomePage = async () => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/home-page?populate[0]=HomePage_Introduction.media&populate[1]=news_letter.background_image&populate[2]=explore_heading&populate[3]=explore_data.background_image&populate[4]=homePage_faqs&populate[5]=homePage_faqs_data`,
        );
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const fetchHeader = async () => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/header?populate[0]=Header_Menu&populate[1]=main_logo`,
        );
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const subscriberFormData = async (inputValue: SubscriberInput) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/news-letters`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data: inputValue }),
        });
        console.log(response)

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await response.json();
        return data.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};