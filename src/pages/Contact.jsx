import ContactIconsSm from "../components/contact/ContactIconsSm";
import ContactWays from "../components/contact/ContactWays";
import {imageUrl} from "../components/utils/Image";
import React from 'react';

const Contact = () => {
    return (
        <div>
            <div className='flex items-center justify-center pt-20 sm:pt-32'>
                <div className='flex flex-col items-center justify-center gap-2 sm:hidden'>
                    <p className='px-2 pb-2 text-center font-medium uppercase'>
                        Kliknij na odpowiednią ikonę, aby przejść do interesującej cię formy
                        kontaktu.
                    </p>
                    <ContactIconsSm
                        title='Email'
                        icon={<div className='flex items-center p-0.5'>
                            <img
                                src={imageUrl('icons/MdOutgoingMail.png')}
                                width='30px'
                                height='30px'
                                alt='wyślij email'
                            />
                        </div>}
                        href='mailto:syklykbis.krakow@gmail.com'
                        target='_blank'
                    />
                    <ContactIconsSm
                        title='Messenger'
                        icon={<div className='flex items-center p-0.5'>
                            <img
                                src={imageUrl('icons/RiMessengerLine.png')}
                                width='30px'
                                height='30px'
                                alt='napisz na Messenegrze'
                            />
                        </div>}
                        href='https://m.me/syklykbis'
                        target='_blank'
                    />
                    <ContactIconsSm
                        title='Telefon'
                        icon={<div className='flex items-center p-0.5'>
                            <img
                                src={imageUrl('icons/AiOutlinePhone.png')}
                                width='30px'
                                height='30px'
                                alt='zadzwoń'
                            />
                        </div>}
                        href='tel:123523223'
                    />
                </div>

                <div className='hidden max-w-2xl flex-col gap-6 sm:flex sm:w-2/3 '>
                    <p className='text-center font-medium uppercase'>
                        Kliknij na odpowiednią ikonę, aby przejść do interesującej cię formy
                        kontaktu.
                    </p>

                    <ContactWays
                        href='mailto:syklykbis.krakow@gmail.com'
                        title='Email'
                        name='syklykbis.krakow@gmail.com'
                        icon={<div className='flex items-center p-0.5'>
                            <img
                                src={imageUrl('icons/MdOutgoingMail.png')}
                                width='30px'
                                height='30px'
                                alt='wyślij email'
                            />
                        </div>}
                        target='_blank'
                    />
                    <ContactWays
                        href='https://m.me/syklykbis'
                        title='Messenger'
                        name='Syk Łyk Bis'
                        icon={<div className='flex items-center p-0.5'>
                            <img
                                src={imageUrl('icons/RiMessengerLine.png')}
                                width='30px'
                                height='30px'
                                alt='napisz na Messengerze'
                            />
                        </div>}
                        target='_blank'
                    />
                    <ContactWays
                        href='tel:123523223'
                        title='Telefon'
                        name='12 352 32 23'
                        name2='500 776 150'
                        icon={<div className='flex items-center p-0.5'>
                            <img
                                src={imageUrl('icons/AiOutlinePhone.png')}
                                width='30px'
                                height='30px'
                                alt='zadzwoń'
                            />
                        </div>}
                    />
                </div>
            </div>
            <div className='flex justify-center py-16'>
                <iframe
                    className='h-96 w-3/4'
                    src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1080.5939794471096!2d19.874785830109207!3d49.89692404645368!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471668989840dea1%3A0xfb13def459554684!2sProducent%20Napoj%C3%B3w%20Fantic%20G%C3%B3rszczak!5e0!3m2!1spl!2spl!4v1648141991780!5m2!1spl!2spl'
                />
            </div>
        </div>
    );
};

export default Contact;
