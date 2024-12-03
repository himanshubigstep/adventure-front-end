'use client'
import React, { useState } from 'react'
import InputFields from '../common-blocks/input-field/InputFields';
import { subscriberFormData } from '@/app/api-data/api';

interface LatestInfo {
    id: number;
    heading: string;
    description: string;
    button: string;
    button_link: string;
}

interface SubscribeFormProps {
    latest_info?: LatestInfo;
}

const SubscriberForm: React.FC<SubscribeFormProps> = ({ latest_info }) => {
    const [inputValue, setInputValue] = useState({
        firstName: '',
        lastName: '',
        email: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [formErrors, setFormErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
    });

    const handleInputChange = (field: 'firstName' | 'lastName' | 'email') => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setInputValue(prevState => ({
            ...prevState,
            [field]: event.target.value
        }));
    };

    const validateForm = () => {
        const errors = { firstName: '', lastName: '', email: '' };
        let isValid = true;

        if (!inputValue.firstName.trim()) {
            errors.firstName = 'firstName is required';
            isValid = false;
        }

        if (!inputValue.lastName.trim()) {
            errors.lastName = 'lastName is required';
            isValid = false;
        }

        if (!inputValue.email.trim()) {
            errors.email = 'Email is required';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(inputValue.email)) {
            errors.email = 'Email is invalid';
            isValid = false;
        }

        setFormErrors(errors);
        return isValid;
    };

    const handelSubscription = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitting(true);
        setSubmitError(null);

        if (!validateForm()) {
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await subscriberFormData(inputValue);
            if (response) {
                console.log('Form submitted successfully:', response);
                setInputValue({ firstName: '', lastName: '', email: '' });
            } else {
                setSubmitError('Failed to submit the form. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting the form:', error);

            if (error instanceof Error) {
                if (error.message === 'This attribute must be unique') {
                    setSubmitError('Email should be unique');
                } else {
                    setSubmitError('An error occurred. Please try again.');
                }
            } else {
                setSubmitError('An unknown error occurred. Please try again.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className='w-full h-full bg-black md:py-16 py-8'>
            <div className='w-full h-full md:max-w-[1240px] max-w-[90%] mx-auto flex flex-col justify-center'>
                <div className="w-full h-full flex flex-col mb-16 space-y-4">
                    <h1 className='font-bold text-3xl text-white text-center'>
                        {latest_info?.heading}
                    </h1>
                    <p className='text-center text-lg text-white'>
                        {latest_info?.description}
                    </p>
                </div>
                <form onSubmit={handelSubscription} className={'w-full mx-auto h-full relative flex md:flex-row flex-col items-center justify-between md:gap-8 pt-8'}>
                    <InputFields
                        type='text'
                        label='First Name'
                        name='firstName'
                        value={inputValue.firstName}
                        onChange={handleInputChange('firstName')}
                        placeholder='Enter Your First Name'
                        className='bg-transparent text-white w-full h-12 px-4 rounded-lg outline-0'
                        error={formErrors.firstName}
                    />
                    <InputFields
                        type='text'
                        label='Last Name'
                        name='lastName'
                        value={inputValue.lastName}
                        onChange={handleInputChange('lastName')}
                        placeholder='Enter Your Last Name'
                        className='bg-transparent text-white w-full h-12 px-4 rounded-lg outline-0'
                        error={formErrors.lastName}
                    />
                    <InputFields
                        type='email'
                        label='Email'
                        name='email'
                        value={inputValue.email}
                        onChange={handleInputChange('email')}
                        placeholder='Enter Your Email'
                        className='bg-transparent text-white w-full h-12 px-4 rounded-lg outline-0'
                        error={formErrors.email}
                    />
                    <button
                        type='submit'
                        className={`'md:w-48 w-full h-12 px-4 rounded-lg outline-0 flex justify-center text-white items-center bg-blue-500 hover:bg-blue-800 mt-4 text-white'}`}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'loading' : latest_info?.button}
                    </button>
                    {submitError && <p className='text-red-500 text-left absolute left-0 bottom-0'>{submitError}</p>}
                </form>
            </div>
        </div>
    );
};

export default SubscriberForm