import { imageUrl} from "../utils/Image";
import React from 'react';

export default function FooterCustomerService() {

    return (
        <div className="flex flex-col items-center justify-center gap-2 p-1 text-center sm:mx-16 sm:items-start sm:gap-4 sm:text-left">
            <p className="font-bold text-gray-800">DZIAŁ OBSŁUGI KLIENTA</p>
            <div className="flex flex-col gap-3">
                <div className="flex">
                    <div className='mr-2 flex items-center'>
                        <img
                            src={imageUrl('icons/ImLocation.png')}
                            className='w-4 max-w-[16px] h-auto'
                            alt='adres'
                        />
                    </div>
                    ul. Pod Pomnikiem 14, 30-898 Kraków
                </div>
                <div className="flex items-center">
                    <div className='mr-2 flex items-center'>
                        <img
                            src={imageUrl('icons/ImLocation.png')}
                            className='w-4 max-w-[16px] h-auto'
                            alt='adres2'
                        />
                    </div>
                    ul. Blokowa 9, 31-752 Kraków
                </div>
                <div className="flex items-center">
                    <div className='mr-2 flex items-center'>
                        <img
                            src={imageUrl('icons/AiFillPhone.png')}
                            className='w-4 max-w-[16px] h-auto'
                            alt='numer telefonu'
                        />
                    </div>
                    12 352 32 23
                </div>
                <div className="flex items-center">
                    <div className='mr-2 flex items-center'>
                        <img
                            src={imageUrl('icons/AiFillPhone.png')}
                            className='w-4 max-w-[16px] h-auto'
                            alt='numer telefonu 2'
                        />
                    </div>
                    500 776 150
                </div>
                <div className="flex items-center">
                    <div className='mr-2 flex items-center'>
                        <img
                            src={imageUrl('icons/AiFillPhone.png')}
                            className='w-4 max-w-[16px] h-auto'
                            alt='numer telefonu 3'
                        />
                    </div>
                    500 776 494
                </div>
                <div className="flex items-center">
                    <div className='mr-2 flex items-center'>
                        <img
                            src={imageUrl('icons/IoMdMail.png')}
                            className='w-4 max-w-[16px] h-auto pt-0.5'
                            alt='email'
                        />
                    </div>
                    preludium.sg@gmail.com
                </div>
                <div className="flex items-center">
                    <div className='mr-2 flex items-center'>
                        <img
                            src={imageUrl('icons/IoMdMail.png')}
                            className='w-4 max-w-[16px] h-auto pt-0.5'
                            alt='email 2'
                        />
                    </div>
                    napojefantic.krakow@gmail.com
                </div>
                <div className="flex items-center">
                    <div className='mr-2 flex items-center'>
                        <img
                            src={imageUrl('icons/IoMdMail.png')}
                            className='w-4 max-w-[16px] h-auto pt-0.5'
                            alt='email 3'
                        />
                    </div>
                    elixirium.am@gmail.com
                </div>
                <div className="flex items-center">
                    <div className='mr-2 flex items-center'>
                        <img
                            src={imageUrl('icons/MdOutlineAccessTimeFilled.png')}
                            className='w-4 max-w-[16px] h-auto pt-0.5'
                            alt='godziny pracy'
                        />
                    </div>
                    Biuro czynne: pn-pt, 7.00-16.00
                </div>
            </div>
        </div>
    );
}
