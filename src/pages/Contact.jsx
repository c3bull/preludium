import ContactWays from "../components/contact/ContactWays";
import {imageUrl} from "../components/utils/Image";
import React from 'react';

const Contact = () => {
    return (
        <div>
            <div className='flex items-center justify-center pt-20 sm:pt-32'>
                <div className='max-w-2xl flex-col gap-6 flex sm:w-2/3 '>
                    <p className='hidden text-center font-medium uppercase'>
                        Kliknij na odpowiednią ikonę, aby przejść do interesującej cię formy
                        kontaktu.
                    </p>

                    <ContactWays
                        title='Email'
                        name='preludium.sg@gmail.com'
                        href='mailto:preludium.sg@gmail.com'
                        name2='napojefantic.krakow@gmail.com'
                        href2='mailto:napojefantic.krakow@gmail.com'
                        name3='elixirium.am@gmail.com'
                        href3='mailto:elixirium.am@gmail.com'
                        icon={<div className='flex items-center'>
                            <img
                                src={imageUrl('icons/MdOutgoingMail.webp')}
                                className=''
                                alt='wyślij email'
                            />
                        </div>}
                        target='_blank'
                    />
                    <ContactWays
                        href='https://m.me/preludiumMessenger'
                        title='Messenger'
                        name='Preludium'
                        icon={<div className='flex items-center'>
                            <img
                                src={imageUrl('icons/RiMessengerLine.webp')}
                                className=''
                                alt='napisz na Messengerze'
                            />
                        </div>}
                        target='_blank'
                    />
                    <ContactWays
                        title='Telefon'
                        name='12 352 32 23'
                        href='tel:123523223'
                        name2='500 776 150'
                        href2='tel:500776150'
                        name3='500 776 494'
                        href3='tel:500776494'
                        icon={<div className='flex items-center'>
                            <img
                                src={imageUrl('icons/AiOutlinePhone.webp')}
                                className=''
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
                    title='lokalizacja'
                />
            </div>
        </div>
    );
};

export default Contact;
